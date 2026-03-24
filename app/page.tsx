"use client";
import KomojuButton from "@/components/KomojuButton";
import { useState, useEffect } from "react";
import Link from "next/link";
import { loadStreak, updateStreak } from "@/lib/streak";

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
    <main>
      {/* Urgency Banner */}
      {daysLeft > 0 && (
        <div className="bg-red-600 text-white text-center py-3 px-4 text-sm font-bold">
          注意: 2026年3月15日（日）締め切りまであと{daysLeft}日！ まだ間に合います →{" "}
          <button type="button" onClick={startCheckout} aria-label="今すぐ確定申告AIで確定申告を完成させる" className="underline">今すぐAIで完成させる</button>
        </div>
      )}

      {/* Hero */}
      <section className="bg-gray-950 pt-20 pb-16 px-4 text-center" aria-label="メインヒーロー">
        <div className="inline-block bg-green-900 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-6">
          AI確定申告アシスタント
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          フリーランスの確定申告、<br />
          <span className="text-green-400">もう怖くない</span>
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
            className="bg-green-500 hover:bg-green-400 text-black font-black text-lg px-10 py-4 rounded-xl transition disabled:opacity-60"
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
      <section className="bg-gray-900 py-16 px-4">
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
      <section className="bg-gray-950 py-16 px-4">
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
      <section className="bg-gray-900 py-16 px-4">
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
      <section className="bg-gray-950 py-16 px-4">
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
            className="mt-10 bg-green-500 hover:bg-green-400 text-black font-black text-xl px-12 py-5 rounded-xl transition disabled:opacity-60 w-full max-w-md"
          >
            {loading ? "処理中..." : "今すぐ¥2,980で始める →"}
          </button>
          {daysLeft > 0 && (
            <p className="text-gray-500 text-sm mt-3">3月15日締め切りまであと{daysLeft}日。余裕をもって完成させよう</p>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-900 py-16 px-4">
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
      <section className="bg-gray-950 py-16 px-4" aria-label="よくある質問">
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
      <section className="bg-gray-950 py-16 px-4 text-center">
        <div className="bg-white/10 backdrop-blur-md border border-red-500/40 shadow-lg rounded-2xl max-w-2xl mx-auto p-8">
          <div className="text-red-300 font-bold text-lg mb-3">{daysLeft > 0 ? `締め切りまであと${daysLeft}日` : "確定申告はAIでスムーズに"}</div>
          <h2 className="text-2xl font-black mb-4">今年の確定申告、AIで完成させよう</h2>
          <p className="text-gray-300 mb-6">¥2,980で税理士いらず。14日間返金保証付き。</p>
          <button
            type="button"
            onClick={startCheckout}
            disabled={loading}
            aria-label="今すぐ確定申告AIプレミアムを始める"
            className="bg-green-500 hover:bg-green-400 text-black font-black text-lg px-10 py-4 rounded-xl transition disabled:opacity-60"
          >
            {loading ? "処理中..." : "今すぐ始める →"}
          </button>
        </div>
      </section>

      {/* X Share */}
      <section className="bg-gray-900 py-8 px-4 text-center">
        <a
          href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("確定申告AIで今年の確定申告が30分で完成！税理士費用¥50,000不要！AIが経費の最適化・申告書の書き方を完全サポート → https://kakutei-shinkoku-ai.vercel.app #確定申告 #フリーランス #節税")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="確定申告AIをXでシェアする"
          className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Xで共有する
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8 px-4 text-center text-gray-500 text-xs">
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
          <div className="backdrop-blur-sm bg-white/90 border border-white/40 shadow-xl rounded-2xl p-6 max-w-sm w-full text-center">
            <button type="button" onClick={() => setShowPayjp(false)} aria-label="決済モーダルを閉じる" className="absolute top-3 right-3 text-gray-400 text-xl"></button>
            <svg viewBox="0 0 48 48" width="36" height="36" className="text-green-400 mb-3 mx-auto" aria-hidden="true"><rect x="2" y="28" width="8" height="16" fill="currentColor"/><rect x="14" y="18" width="8" height="26" fill="currentColor"/><rect x="26" y="8" width="8" height="36" fill="currentColor"/><rect x="38" y="2" width="8" height="42" fill="currentColor"/></svg>
            <h2 className="text-lg font-bold mb-2">確定申告AIプレミアム</h2>
            <p className="text-sm text-gray-500 mb-4">¥2,980（買い切り）・14日間返金保証</p>
            <KomojuButton planId="standard" planLabel="今すぐ購入して申告を完成させる →"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-black py-3 rounded-xl disabled:opacity-50" />
          </div>
        </div>
      )}
    </main>
  );
}
