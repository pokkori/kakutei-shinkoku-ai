"use client";
import KomojuButton from "@/components/KomojuButton";
import { useState, useEffect } from "react";
import Link from "next/link";
import { loadStreak, updateStreak } from "@/lib/streak";
import { ShareButtons } from "@/components/ShareButtons";
import { AdBanner } from "@/components/AdBanner";

const DEADLINE = new Date("2026-03-15T23:59:59+09:00");
function getDaysLeft() {
  const diff = DEADLINE.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function Home() {
  const [showPayjp, setShowPayjp] = useState(false);
  const [streak, setStreak] = useState(0);
  const loading = false;
  const startCheckout = () => {
    const s = updateStreak("kakutei_ai");
    setStreak(s.count);
    setShowPayjp(true);
  };

  useEffect(() => {
    const s = loadStreak("kakutei_ai");
    setStreak(s.count);
  }, []);

  const daysLeft = getDaysLeft();

  return (
    <main className="min-h-screen relative overflow-hidden text-white" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.10) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(5,150,105,0.08) 0%, transparent 50%), #0B1120' }}>
      {/* Floating particles */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        {[
          { w: 3, h: 3, l: '12%', t: '22%', dur: '7s', op: 0.25 },
          { w: 2, h: 2, l: '78%', t: '55%', dur: '9s', op: 0.2 },
          { w: 4, h: 4, l: '55%', t: '12%', dur: '6s', op: 0.2 },
          { w: 2, h: 2, l: '35%', t: '78%', dur: '8s', op: 0.15 },
          { w: 3, h: 3, l: '88%', t: '38%', dur: '10s', op: 0.2 },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full animate-pulse" style={{ width: p.w, height: p.h, left: p.l, top: p.t, background: `rgba(34, 197, 94, ${p.op})`, animationDuration: p.dur, filter: 'blur(1px)' }} />
        ))}
      </div>

      {/* Urgency Banner */}
      {daysLeft > 0 && (
        <div className="text-white text-center py-3 px-4 text-sm font-bold relative z-10" style={{ background: 'linear-gradient(135deg, #DC2626, #B91C1C)' }}>
          <svg className="w-4 h-4 inline-block mr-1 -mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
          2026年3月15日（日）締め切りまであと{daysLeft}日！ まだ間に合います →{" "}
          <button type="button" onClick={startCheckout} aria-label="今すぐ確定申告AIで確定申告を完成させる" className="underline font-black">今すぐAIで完成させる</button>
        </div>
      )}

      {/* Hero */}
      <section className="pt-20 pb-16 px-4 text-center relative z-10" aria-label="メインヒーロー">
        <div className="inline-block text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(34, 197, 94, 0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
          AI確定申告アシスタント
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-white">
          フリーランスの確定申告、<br />
          <span style={{ background: 'linear-gradient(135deg, #A7F3D0, #FFFFFF, #FDE68A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>もう怖くない</span>
          {streak > 0 && (
            <span
              className="ml-2 text-xs bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full font-bold align-middle"
              aria-label={`${streak}日連続利用中`}
            >
              {streak}日連続
            </span>
          )}
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-4">
          年収・経費を入力するだけで、AIが申告書の書き方・節税ポイント・手順を完全解説。<br />
          <strong className="text-white">税理士費用¥50,000不要。¥2,980で今年の確定申告を完結。</strong>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            type="button"
            onClick={startCheckout}
            disabled={loading}
            aria-label="¥2,980で確定申告AIプレミアムを購入して確定申告を完成させる"
            className="text-white font-black text-lg px-10 py-4 rounded-full transition-all duration-300 ease-out hover:scale-105 active:scale-95 disabled:opacity-60 min-h-[52px]"
            style={{ background: 'linear-gradient(135deg, #10B981, #F59E0B)', boxShadow: '0 0 30px rgba(16,185,129,0.4), 0 0 60px rgba(245,158,11,0.15)' }}
          >
            {loading ? "処理中..." : "¥2,980で確定申告を完成させる →"}
          </button>
          <Link
            href="/tool"
            className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 font-semibold text-lg px-10 py-4 rounded-xl transition text-center"
          >
            まず無料で試す（3回）
          </Link>
        </div>
        <p className="text-gray-500 text-sm mt-4">14日間返金保証 ・ クレジットカード / Apple Pay 対応</p>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-4 relative z-10" style={{ background: 'rgba(15, 15, 26, 0.6)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-100">
            こんな悩みを抱えていませんか？
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "申告書の書き方がわからない", desc: "どの欄に何を書くのか、どの書類が必要なのかさっぱり…" },
              { title: "経費の計上漏れが怖い", desc: "どこまで経費にできるのか判断できず、結果的に税金を多く払いすぎている" },
              { title: "税理士に頼む余裕がない", desc: "税理士への依頼は¥50,000〜¥150,000。フリーランス1年目にはきつすぎる" },
            ].map((item) => (
              <div key={item.title} className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg rounded-2xl p-6">
                <div className="w-10 h-1 bg-red-500 rounded mb-3" />
                <h3 className="font-bold text-lg mb-2 text-red-300">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-green-400 font-bold text-xl mt-10">
            ↓ 確定申告AIがすべて解決します ↓
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">使い方は3ステップ</h2>
          <div className="space-y-6">
            {[
              { step: "01", title: "収入・経費・控除を入力", desc: "年間収入、主な経費（通信費・書籍代・家賃按分など）、扶養家族の有無などを入力。難しい計算は不要。" },
              { step: "02", title: "AIが計算・アドバイスを生成（30秒）", desc: "予想納税額・還付金額、経費の最適化ポイント、青色/白色申告の選択理由、医療費控除・ふるさと納税の効果を分析。" },
              { step: "03", title: "手順どおりに申告書を提出", desc: "e-Tax（電子申告）またはプリントアウトして税務署へ。提出手順も完全ガイド付き。" },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                <div className="text-5xl font-black text-green-500 opacity-50 shrink-0 w-16 text-right">{item.step}</div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 relative z-10" style={{ background: 'rgba(15, 15, 26, 0.6)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">AIが分析・サポートする内容</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "予想納税額・還付金の計算",
              "経費の最適化アドバイス（見落とし経費の指摘）",
              "青色申告・白色申告どちらが得か診断",
              "医療費控除・ふるさと納税の効果計算",
              "e-Tax（電子申告）の手順完全ガイド",
              "申告書の各欄の書き方解説",
              "税務調査リスクが高い申告パターンの注意",
              "来年からの節税対策アドバイス",
            ].map((f) => (
              <div key={f} className="backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg rounded-xl px-5 py-4 text-sm text-gray-200 flex items-center gap-2">
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10">料金</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">税理士に依頼する場合</div>
              <div className="text-4xl font-black text-gray-300 mb-2">¥50,000〜</div>
              <div className="text-gray-500 text-sm">¥150,000かかることも</div>
              <ul className="text-gray-500 text-sm mt-4 space-y-1 text-left">
                <li> 予約〜完成まで2〜4週間</li>
                <li> 書類を持参または郵送</li>
                <li> 追加費用が発生することも</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-md border-2 border-green-500/60 shadow-lg rounded-2xl p-8">
              <div className="text-green-300 text-sm font-bold mb-2">確定申告AIを使う場合</div>
              <div className="text-4xl font-black text-green-400 mb-2">¥2,980</div>
              <div className="text-green-300 text-sm">年間（一回払い）</div>
              <ul className="text-gray-200 text-sm mt-4 space-y-1 text-left">
                <li> 30分〜1時間で完成</li>
                <li> 24時間いつでも利用可</li>
                <li> 14日間返金保証</li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            onClick={startCheckout}
            disabled={loading}
            aria-label="今すぐ¥2,980で確定申告AIプレミアムを始める"
            className="mt-10 text-white font-black text-xl px-12 py-5 rounded-full transition-all duration-300 ease-out hover:scale-105 active:scale-95 disabled:opacity-60 w-full max-w-md min-h-[52px]"
            style={{ background: 'linear-gradient(135deg, #10B981, #F59E0B)', boxShadow: '0 0 30px rgba(16,185,129,0.4), 0 0 60px rgba(245,158,11,0.15)' }}
          >
            {loading ? "処理中..." : "今すぐ¥2,980で始める →"}
          </button>
          {daysLeft > 0 && (
            <p className="text-gray-500 text-sm mt-3">3月15日締め切りまであと{daysLeft}日。余裕をもって完成させよう</p>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 relative z-10" style={{ background: 'rgba(15, 15, 26, 0.6)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">利用者の声</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Kさん（Webデザイナー・フリーランス2年目）", text: "初めての確定申告で何もわからなかったけど、AIに収入と経費を入力したら30分で手順が全部わかりました。税理士に頼まなくてよかった！" },
              { name: "Mさん（エンジニア・副業歴3年）", text: "経費の入力漏れを指摘してもらい、結果的に¥30,000以上節税できました。交通費と書籍代を忘れてたみたい。" },
              { name: "Tさん（イラストレーター・個人事業主）", text: "青色申告に切り替えるべきか悩んでいたのですが、AIが私の状況で¥65万の特別控除が使えると教えてくれました。" },
            ].map((t) => (
              <div key={t.name} className="backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg rounded-2xl p-6">
                <p className="text-gray-200 text-sm mb-4">「{t.text}」</p>
                <p className="text-green-400 text-xs font-bold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 relative z-10" aria-label="よくある質問">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">よくある質問</h2>
          <div className="space-y-4">
            {[
              {
                q: "e-Taxって難しくないですか？",
                a: "マイナンバーカードとスマホがあれば自宅から10分で電子申告が完了します。AIが手順を1ステップずつ解説するので、初めての方でも迷わず進められます。",
              },
              {
                q: "青色申告と白色申告、どちらを選べばいいですか？",
                a: "年間売上が150万円以上のフリーランスには青色申告（65万円特別控除）をおすすめします。事前に開業届と青色申告承認申請書を提出する必要がありますが、確定申告AIが適切な選択を診断します。",
              },
              {
                q: "副業収入が20万円を超えた場合、どうすればいいですか？",
                a: "給与所得者で副業の所得が年間20万円を超えた場合、確定申告が必要です。本業の源泉徴収票と副業の収支を合算して申告します。確定申告AIが副業収入の入力方法と申告書の書き方を案内します。",
              },
              {
                q: "医療費控除はいくら以上から申告できますか？",
                a: "年間の医療費が10万円（総所得金額の5%が10万円を下回る場合はその金額）を超えた部分が医療費控除の対象です。薬局のレシート・歯科・市販薬（セルフメディケーション税制）なども含まれます。",
              },
              {
                q: "ふるさと納税のワンストップ特例と確定申告の違いは？",
                a: "ワンストップ特例は給与所得者専用で、他に確定申告が不要な場合に利用できます。フリーランス・個人事業主は確定申告で寄附金控除として申告します。確定申告AIが最適な申告方法を計算します。",
              },
              {
                q: "インボイス制度（適格請求書）の登録は必要ですか？",
                a: "クライアントが消費税課税事業者の場合、インボイス未登録だと取引を断られるリスクがあります。2023年10月施行の制度で、小規模事業者は「2割特例」（消費税の80%控除）が3年間適用可能です。状況に応じた判断をAIが診断します。",
              },
              {
                q: "家賃の按分はどうやって計算しますか？",
                a: "自宅兼事務所の家賃は「業務に使用する専有面積 ÷ 全居住面積」で按分できます。例えば50m2の住居で10m2を仕事に使う場合は20%を経費計上可能です。確定申告AIが職業に応じた適切な按分率を提案します。",
              },
              {
                q: "iDeCoに加入すると税金はどれだけ減りますか？",
                a: "自営業・フリーランスの場合、iDeCoの掛金上限は月68,000円（年816,000円）で、全額が所得控除になります。例えば課税所得300万円（税率10%＋住民税10%）の方が月5万円加入すると、年間約12万円の節税効果があります。",
              },
              {
                q: "税務調査で問題になりやすい経費は何ですか？",
                a: "プライベートと業務の混在経費（飲食費・旅費・スマホ代）、領収書のない現金支出、家族への給与（青色専従者給与の届出未提出）、実態のない外注費などが税務調査で指摘されやすいです。確定申告AIが申告前にリスクチェックを行います。",
              },
              {
                q: "確定申告の締め切りを過ぎてしまった場合はどうなりますか？",
                a: "締め切り後でも申告可能ですが、無申告加算税（15〜20%）と延滞税が課される場合があります。ただし還付申告（払いすぎた税金を取り戻す申告）は5年以内ならいつでも可能です。期限後でも確定申告AIが申告書作成をサポートします。",
              },
            ].map((item, i) => (
              <details key={i} className="backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg rounded-2xl p-5 group">
                <summary className="font-bold text-sm text-white cursor-pointer list-none flex items-center justify-between gap-3">
                  <span>Q. {item.q}</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" className="shrink-0 text-green-400 transition-transform group-open:rotate-180" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </summary>
                <p className="text-gray-300 text-sm mt-3 leading-relaxed">A. {item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 text-center relative z-10">
        <div className="rounded-2xl max-w-2xl mx-auto p-8" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(239, 68, 68, 0.3)', boxShadow: '0 0 30px rgba(239, 68, 68, 0.1), 0 8px 32px rgba(0,0,0,0.2)' }}>
          <div className="text-red-300 font-bold text-lg mb-3">{daysLeft > 0 ? `締め切りまであと${daysLeft}日` : "確定申告はAIでスムーズに"}</div>
          <h2 className="text-2xl font-black mb-4">今年の確定申告、AIで完成させよう</h2>
          <p className="text-gray-300 mb-6">¥2,980で税理士いらず。14日間返金保証付き。</p>
          <button
            type="button"
            onClick={startCheckout}
            disabled={loading}
            aria-label="今すぐ確定申告AIプレミアムを始める"
            className="text-white font-black text-lg px-10 py-4 rounded-full transition-all duration-300 ease-out hover:scale-105 active:scale-95 disabled:opacity-60 min-h-[44px]"
            style={{ background: 'linear-gradient(135deg, #10B981, #F59E0B)', boxShadow: '0 0 30px rgba(16,185,129,0.4)' }}
          >
            {loading ? "処理中..." : "今すぐ始める →"}
          </button>
        </div>
      </section>

      {/* シェアセクション */}
      <section className="py-8 px-4 text-center relative z-10" style={{ background: 'rgba(15, 15, 26, 0.6)' }}>
        <ShareButtons url="https://kakutei-shinkoku-ai.vercel.app" text="確定申告AIを使ってみた！" hashtags="確定申告AI" />
      </section>

      {/* AI免責バナー */}
      <section className="px-4 pb-8 relative z-10">
        <div className="max-w-2xl mx-auto bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3 text-sm text-yellow-200">
          <p>
            <svg className="w-4 h-4 inline-block mr-1 -mt-0.5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            本サービスはAIによる参考情報であり、税務上の正式な助言ではありません。実際の確定申告は税理士にご相談ください。2026年3月時点の税法に基づいています。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-gray-500 text-xs relative z-10">
        <p>© 2026 確定申告AI</p>
        <p className="mt-2">
          <Link href="/legal" className="hover:text-gray-300 underline">特定商取引法に基づく表記</Link>
          {" ｜ "}
          <Link href="/terms" className="hover:text-gray-300 underline">利用規約</Link>
          {" ｜ "}
          <Link href="/privacy" className="hover:text-gray-300 underline">プライバシーポリシー</Link>
          {" ｜ "}
          <span>本サービスは情報提供を目的としており、税理士による税務相談の代替ではありません</span>
        </p>
      </footer>
      {showPayjp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="rounded-2xl p-6 max-w-sm w-full text-center relative" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <button type="button" onClick={() => setShowPayjp(false)} aria-label="決済モーダルを閉じる" className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <svg viewBox="0 0 48 48" width="36" height="36" className="text-emerald-500 mb-3 mx-auto" aria-hidden="true"><rect x="2" y="28" width="8" height="16" fill="currentColor"/><rect x="14" y="18" width="8" height="26" fill="currentColor"/><rect x="26" y="8" width="8" height="36" fill="currentColor"/><rect x="38" y="2" width="8" height="42" fill="currentColor"/></svg>
            <h2 className="text-lg font-bold mb-2">確定申告AIプレミアム</h2>
            <p className="text-sm text-gray-500 mb-4">¥2,980（買い切り）・14日間返金保証</p>
            <KomojuButton planId="standard" planLabel="今すぐ購入して申告を完成させる →"
              className="w-full text-white font-black py-3 rounded-xl disabled:opacity-50" />
          </div>
        </div>
      )}
      <AdBanner slot="" />
    </main>
  );
}
