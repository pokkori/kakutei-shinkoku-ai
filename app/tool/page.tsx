"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { updateStreak } from "@/lib/streak";

const HISTORY_KEY = "kakuteishinkoku_history";

interface HistoryEntry {
  text: string;
  date: string;
}

function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") ?? [];
  } catch {
    return [];
  }
}

function saveHistory(entries: HistoryEntry[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, 5)));
  } catch { /* noop */ }
}

const TABS = [
  { key: "tax", label: "納税額予測" },
  { key: "expenses", label: "経費最適化" },
  { key: "procedure", label: "申告手順" },
  { key: "savings", label: "節税アドバイス" },
  { key: "faq", label: "よくある質問" },
] as const;

type TabKey = typeof TABS[number]["key"];
type Result = Record<TabKey, string>;

export default function ToolPage() {
  const [isPremium, setIsPremium] = useState(false);
  const [remaining, setRemaining] = useState(3);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("tax");
  const [showPaywall, setShowPaywall] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    reportType: "white",
    occupation: "",
    revenue: "",
    totalExpenses: "",
    expenseDetails: "",
    hasSpouse: false,
    hasDependents: false,
    socialInsurance: "",
    lifeInsurance: "",
    furusato: "",
    medical: "",
    other: "",
  });

  useEffect(() => {
    fetch("/api/auth/status")
      .then((r) => r.json())
      .then((d) => {
        setIsPremium(d.premium);
        if (d.remaining !== undefined) setRemaining(d.remaining);
      });
    setHistory(loadHistory());
  }, []);

  function setField(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const [streamingText, setStreamingText] = useState("");

  function extractSection(text: string, key: string): string {
    const regex = new RegExp(`===${key}===([\\s\\S]*?)(?:===\\w+===|DONE:|$)`);
    const match = text.match(regex);
    return match ? match[1].trim() : "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.occupation || !form.revenue) return;
    setLoading(true);
    setIsStreaming(false);
    setResult(null);
    setStreamingText("");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 402 || res.status === 429) {
        setShowPaywall(true);
        setLoading(false);
        return;
      }
      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      setIsStreaming(true);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setStreamingText(accumulated);
        if (accumulated.includes("DONE:")) {
          const doneMatch = accumulated.match(/DONE:(.+)/);
          if (doneMatch) {
            try {
              const meta = JSON.parse(doneMatch[1]);
              if (meta.remaining !== undefined && meta.remaining !== null) setRemaining(meta.remaining);
            } catch { /* noop */ }
          }
          accumulated = accumulated.replace(/\nDONE:.+/, "");
          break;
        }
      }
      const parsed: Result = {
        tax: extractSection(accumulated, "TAX"),
        expenses: extractSection(accumulated, "EXPENSES"),
        procedure: extractSection(accumulated, "PROCEDURE"),
        savings: extractSection(accumulated, "SAVINGS"),
        faq: extractSection(accumulated, "FAQ"),
      };
      setResult(parsed);
      setIsStreaming(false);
      updateStreak("kakutei_ai");
      setStreamingText("");
      // 履歴に保存
      const entry: HistoryEntry = {
        text: `${form.occupation} / 売上${form.revenue}万円` + (form.totalExpenses ? ` / 経費${form.totalExpenses}万円` : ""),
        date: new Date().toLocaleString("ja-JP", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
      };
      const updated = [entry, ...loadHistory()].slice(0, 5);
      saveHistory(updated);
      setHistory(updated);
    } catch {
      setErrorMsg("通信エラーが発生しました。インターネット接続を確認して再試行してください。");
    }
    setLoading(false);
  }

  async function startCheckout() {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setCheckoutLoading(false);
    }
  }

  function renderContent(text: string) {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("### ")) return <h3 key={i} className="text-base font-bold text-green-300 mt-4 mb-1">{line.replace("### ", "")}</h3>;
      if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-bold text-white mt-5 mb-2">{line.replace("## ", "")}</h2>;
      if (line.trim() === "---" || line.trim() === "") return <div key={i} className="h-2" />;
      const html = line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
      return <p key={i} className="text-gray-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
    });
  }

  return (
    <main className="min-h-screen bg-gray-950 pb-20">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-green-400 font-black text-xl">確定申告AI</Link>
        {!isPremium && (
          <button
            onClick={startCheckout}
            aria-label="プレミアムプランにアップグレードする"
            className="bg-green-500 hover:bg-green-400 text-black text-sm font-bold px-4 py-2 rounded-lg transition"
          >
            ¥2,980でアップグレード
          </button>
        )}
        {isPremium && <span className="text-green-400 text-sm font-bold"> プレミアム会員</span>}
      </header>

      {/* Urgency */}
      <div className="bg-red-700 text-white text-center py-2 px-4 text-xs font-bold">
        注意: 確定申告締め切り：2026年3月15日（日）まであと6日
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-8">
        {/* Free remaining */}
        {!isPremium && (
          <div className="bg-yellow-900 border border-yellow-700 rounded-xl p-4 mb-6 text-sm text-yellow-200">
            無料試用回数：残り <strong className="text-yellow-300 text-base">{remaining}</strong> 回
            （プレミアム版にアップグレードすると無制限に使えます）
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-white">確定申告AI診断</h1>
          {history.length > 0 && (
            <button
              type="button"
              onClick={() => setShowHistory((v) => !v)}
              aria-label="過去の相談履歴を表示・非表示"
              aria-expanded={showHistory}
              className="text-xs text-green-400 border border-green-700 px-3 py-1.5 rounded-lg hover:bg-green-900 transition"
            >
              {showHistory ? "履歴を閉じる" : `履歴 ${history.length}件`}
            </button>
          )}
        </div>

        {/* 相談履歴パネル */}
        {showHistory && history.length > 0 && (
          <div className="mb-6 backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg rounded-2xl p-4" aria-label="過去の相談履歴">
            <h2 className="text-sm font-bold text-gray-300 mb-3">過去の相談履歴（最近5件）</h2>
            <ul className="space-y-2">
              {history.map((entry, i) => (
                <li key={i} className="flex items-start justify-between gap-3 text-xs bg-gray-800/60 rounded-lg px-3 py-2">
                  <span className="text-gray-200 truncate flex-1">{entry.text.slice(0, 50)}{entry.text.length > 50 ? "…" : ""}</span>
                  <span className="text-gray-500 shrink-0">{entry.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 申告の種類 */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">申告の種類</label>
            <div className="flex flex-wrap gap-3">
              {[
                { val: "white", label: "白色申告" },
                { val: "blue10", label: "青色申告（10万円控除）" },
                { val: "blue65", label: "青色申告（65万円控除）" },
                { val: "unknown", label: "わからない（AIに診断してほしい）" },
              ].map((o) => (
                <label key={o.val} className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer text-sm transition ${form.reportType === o.val ? "border-green-500 bg-green-900 text-green-300" : "border-gray-700 text-gray-400 hover:border-gray-500"}`}>
                  <input type="radio" name="reportType" value={o.val} checked={form.reportType === o.val} onChange={() => setField("reportType", o.val)} className="sr-only" />
                  {o.label}
                </label>
              ))}
            </div>
          </div>

          {/* 職業 */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">職業・業種 <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={form.occupation}
              onChange={(e) => setField("occupation", e.target.value)}
              placeholder="例: Webデザイナー、エンジニア、ライター、YouTuber"
              aria-label="職業・業種を入力（例: Webデザイナー、エンジニア）"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500"
              required
            />
          </div>

          {/* 年間売上 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">年間売上（収入） <span className="text-red-400">*</span></label>
              <div className="relative">
                <input
                  type="number"
                  value={form.revenue}
                  onChange={(e) => setField("revenue", e.target.value)}
                  placeholder="例: 350"
                  aria-label="年間売上（収入）を万円単位で入力"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500"
                  required
                />
                <span className="absolute right-3 top-3.5 text-gray-500 text-sm">万円</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">年間経費の合計</label>
              <div className="relative">
                <input
                  type="number"
                  value={form.totalExpenses}
                  onChange={(e) => setField("totalExpenses", e.target.value)}
                  placeholder="例: 80"
                  aria-label="年間経費の合計を万円単位で入力"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500"
                />
                <span className="absolute right-3 top-3.5 text-gray-500 text-sm">万円</span>
              </div>
            </div>
          </div>

          {/* 経費内訳 */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">主な経費の内訳</label>
            <textarea
              value={form.expenseDetails}
              onChange={(e) => setField("expenseDetails", e.target.value)}
              placeholder="例: 通信費3万円、書籍代2万円、交通費5万円、PC購入15万円、自宅家賃の30%按分"
              aria-label="主な経費の内訳を入力（通信費・書籍代・交通費など）"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500 h-20 resize-none"
            />
          </div>

          {/* 各種控除 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">社会保険料支払い</label>
              <div className="relative">
                <input type="number" value={form.socialInsurance} onChange={(e) => setField("socialInsurance", e.target.value)} placeholder="例: 20" aria-label="社会保険料支払い額を万円単位で入力" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500" />
                <span className="absolute right-3 top-3.5 text-gray-500 text-sm">万円</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">生命保険料控除</label>
              <div className="relative">
                <input type="number" value={form.lifeInsurance} onChange={(e) => setField("lifeInsurance", e.target.value)} placeholder="例: 4" aria-label="生命保険料控除額を万円単位で入力" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500" />
                <span className="absolute right-3 top-3.5 text-gray-500 text-sm">万円</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">ふるさと納税額</label>
              <div className="relative">
                <input type="number" value={form.furusato} onChange={(e) => setField("furusato", e.target.value)} placeholder="例: 5" aria-label="ふるさと納税額を万円単位で入力" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500" />
                <span className="absolute right-3 top-3.5 text-gray-500 text-sm">万円</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">医療費（年間）</label>
              <div className="relative">
                <input type="number" value={form.medical} onChange={(e) => setField("medical", e.target.value)} placeholder="例: 15" aria-label="年間医療費を万円単位で入力" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500" />
                <span className="absolute right-3 top-3.5 text-gray-500 text-sm">万円</span>
              </div>
            </div>
          </div>

          {/* 家族 */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">家族構成</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" checked={form.hasSpouse} onChange={(e) => setField("hasSpouse", e.target.checked)} aria-label="配偶者あり" className="w-4 h-4 accent-green-500" />
                配偶者あり
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" checked={form.hasDependents} onChange={(e) => setField("hasDependents", e.target.checked)} aria-label="扶養家族あり" className="w-4 h-4 accent-green-500" />
                扶養家族あり
              </label>
            </div>
          </div>

          {/* その他 */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">その他の相談事項・気になること</label>
            <textarea
              value={form.other}
              onChange={(e) => setField("other", e.target.value)}
              placeholder="例: 昨年まで会社員で今年から個人事業主になった / 副業収入が20万を超えた / 海外クライアントからの収入がある"
              aria-label="その他の相談事項・気になることを入力"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500 h-20 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !form.occupation || !form.revenue}
            aria-label="AIで確定申告を分析する"
            className="w-full bg-green-500 hover:bg-green-400 text-black font-black text-lg py-4 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "AI分析中...（30秒ほどお待ちください）" : "AIで確定申告を分析する →"}
          </button>
        </form>

        {errorMsg && (
          <div role="alert" className="mt-4 bg-red-900 border border-red-700 rounded-xl p-4 text-red-200 text-sm">
            {errorMsg}
          </div>
        )}

        {/* Streaming preview */}
        {loading && (
          <div className="mt-8 backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500" />
              <span className="text-green-400 text-sm font-bold">
                {isStreaming ? "AI分析結果を受信中..." : "AIに接続中..."}
              </span>
              {isStreaming && (
                <span className="ml-auto text-gray-500 text-xs">リアルタイム生成中</span>
              )}
            </div>
            {isStreaming && streamingText ? (
              <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">{streamingText.slice(-800)}</div>
            ) : (
              <div className="flex gap-1.5 mt-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="h-2 w-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-10">
            <h2 className="text-xl font-black mb-4 text-white flex items-center gap-2">
              <svg viewBox="0 0 24 24" width="22" height="22" className="text-green-400" aria-hidden="true"><rect x="2" y="12" width="4" height="10" fill="currentColor"/><rect x="9" y="7" width="4" height="15" fill="currentColor"/><rect x="16" y="2" width="4" height="20" fill="currentColor"/></svg>
              AI分析結果
            </h2>
            {/* Tabs */}
            <div className="flex overflow-x-auto gap-2 mb-4 pb-1">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  aria-label={`${tab.label}タブを表示`}
                  aria-pressed={activeTab === tab.key}
                  className={`shrink-0 px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === tab.key ? "bg-green-500 text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg rounded-2xl p-6 min-h-48">
              {renderContent(result[activeTab])}
            </div>
            <div className="flex gap-3 mt-4 flex-wrap">
              <button
                onClick={() => { navigator.clipboard.writeText(result[activeTab]); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                aria-label="このタブの内容をクリップボードにコピー"
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm font-bold py-3 rounded-xl transition"
              >
                {copied ? "コピーしました！" : "このタブをコピー"}
              </button>
              <button
                onClick={() => window.print()}
                aria-label="印刷する"
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm font-bold py-3 rounded-xl transition"
              >
                印刷する
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `${form.occupation}の確定申告をAIで完全分析！売上${form.revenue}万円の節税ポイントがわかりました。税理士費用¥50,000不要 → https://kakutei-shinkoku-ai.vercel.app #確定申告 #フリーランス #節税`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AI分析結果をXでシェアする"
                className="flex-1 bg-black hover:bg-gray-900 text-white text-sm font-bold py-3 rounded-xl transition text-center"
              >
                Xでシェア
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <svg viewBox="0 0 48 48" width="48" height="48" className="text-green-400" aria-hidden="true"><rect x="14" y="22" width="20" height="18" rx="3" fill="currentColor"/><path d="M16 22V16a8 8 0 1 1 16 0v6" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/><circle cx="24" cy="31" r="2.5" fill="white"/></svg>
            </div>
            <h2 className="text-xl font-black mb-3">無料回数を使い切りました</h2>
            <p className="text-gray-400 text-sm mb-6">
              プレミアム版（¥2,980/年）にアップグレードすると、
              確定申告AIを無制限で使用できます。
              税理士費用と比較して<strong className="text-green-400">¥47,000以上お得</strong>。
            </p>
            <button
              onClick={startCheckout}
              disabled={checkoutLoading}
              aria-label="¥2,980でプレミアムプランにアップグレードする"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-black text-lg py-4 rounded-xl transition disabled:opacity-60 mb-3"
            >
              {checkoutLoading ? "処理中..." : "¥2,980でアップグレードする →"}
            </button>
            <button onClick={() => setShowPaywall(false)} aria-label="ペイウォールを閉じる" className="text-gray-500 text-sm hover:text-gray-300 transition">
              閉じる
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
