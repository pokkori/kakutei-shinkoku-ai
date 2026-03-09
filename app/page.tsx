"use client";
import { useState } from "react";
import Link from "next/link";

const DEADLINE = new Date("2026-03-15T23:59:59+09:00");
function getDaysLeft() {
  const diff = DEADLINE.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function Home() {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  const daysLeft = getDaysLeft();

  return (
    <main>
      {/* Urgency Banner */}
      {daysLeft > 0 && (
        <div className="bg-red-600 text-white text-center py-3 px-4 text-sm font-bold">
          ⚠️ 2026年3月15日（日）締め切りまであと{daysLeft}日！ まだ間に合います →{" "}
          <button onClick={startCheckout} className="underline">今すぐAIで完成させる</button>
        </div>
      )}

      {/* Hero */}
      <section className="bg-gray-950 pt-20 pb-16 px-4 text-center">
        <div className="inline-block bg-green-900 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-6">
          🤖 AI確定申告アシスタント
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          フリーランスの確定申告、<br />
          <span className="text-green-400">もう怖くない</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-4">
          年収・経費を入力するだけで、AIが申告書の書き方・節税ポイント・手順を完全解説。<br />
          <strong className="text-white">税理士費用¥50,000不要。¥2,980で今年の確定申告を完結。</strong>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={startCheckout}
            disabled={loading}
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
              { icon: "😰", title: "申告書の書き方がわからない", desc: "どの欄に何を書くのか、どの書類が必要なのかさっぱり…" },
              { icon: "💸", title: "経費の計上漏れが怖い", desc: "どこまで経費にできるのか判断できず、結果的に税金を多く払いすぎている" },
              { icon: "😓", title: "税理士に頼む余裕がない", desc: "税理士への依頼は¥50,000〜¥150,000。フリーランス1年目にはきつすぎる" },
            ].map((item) => (
              <div key={item.title} className="bg-gray-800 rounded-2xl p-6">
                <div className="text-4xl mb-3">{item.icon}</div>
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
              <div key={item.step} className="flex gap-6 items-start">
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
              "📊 予想納税額・還付金の計算",
              "💡 経費の最適化アドバイス（見落とし経費の指摘）",
              "📋 青色申告・白色申告どちらが得か診断",
              "🏥 医療費控除・ふるさと納税の効果計算",
              "📱 e-Tax（電子申告）の手順完全ガイド",
              "📝 申告書の各欄の書き方解説",
              "⚠️ 税務調査リスクが高い申告パターンの注意",
              "🔄 来年からの節税対策アドバイス",
            ].map((f) => (
              <div key={f} className="bg-gray-800 rounded-xl px-5 py-4 text-sm text-gray-200 flex items-center gap-2">
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
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <div className="text-gray-400 text-sm mb-2">税理士に依頼する場合</div>
              <div className="text-4xl font-black text-gray-300 mb-2">¥50,000〜</div>
              <div className="text-gray-500 text-sm">¥150,000かかることも</div>
              <ul className="text-gray-500 text-sm mt-4 space-y-1 text-left">
                <li>✗ 予約〜完成まで2〜4週間</li>
                <li>✗ 書類を持参または郵送</li>
                <li>✗ 追加費用が発生することも</li>
              </ul>
            </div>
            <div className="bg-green-900 rounded-2xl p-8 border-2 border-green-500">
              <div className="text-green-300 text-sm font-bold mb-2">確定申告AIを使う場合</div>
              <div className="text-4xl font-black text-green-400 mb-2">¥2,980</div>
              <div className="text-green-300 text-sm">年間（一回払い）</div>
              <ul className="text-gray-200 text-sm mt-4 space-y-1 text-left">
                <li>✓ 30分〜1時間で完成</li>
                <li>✓ 24時間いつでも利用可</li>
                <li>✓ 14日間返金保証</li>
              </ul>
            </div>
          </div>
          <button
            onClick={startCheckout}
            disabled={loading}
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
              <div key={t.name} className="bg-gray-800 rounded-2xl p-6">
                <p className="text-gray-200 text-sm mb-4">「{t.text}」</p>
                <p className="text-green-400 text-xs font-bold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-950 py-16 px-4 text-center">
        <div className="bg-red-900 border border-red-700 rounded-2xl max-w-2xl mx-auto p-8">
          <div className="text-red-300 font-bold text-lg mb-3">⏰ 締め切りまであと6日</div>
          <h2 className="text-2xl font-black mb-4">今年の確定申告、AIで完成させよう</h2>
          <p className="text-gray-300 mb-6">¥2,980で税理士いらず。14日間返金保証付き。</p>
          <button
            onClick={startCheckout}
            disabled={loading}
            className="bg-green-500 hover:bg-green-400 text-black font-black text-lg px-10 py-4 rounded-xl transition disabled:opacity-60"
          >
            {loading ? "処理中..." : "今すぐ始める →"}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8 px-4 text-center text-gray-500 text-xs">
        <p>© 2026 確定申告AI</p>
        <p className="mt-2">
          <Link href="/legal" className="hover:text-gray-300 underline">特定商取引法に基づく表記</Link>
          {" ｜ "}
          <Link href="/privacy" className="hover:text-gray-300 underline">プライバシーポリシー</Link>
          {" ｜ "}
          <span>本サービスは情報提供を目的としており、税理士による税務相談の代替ではありません</span>
        </p>
      </footer>
    </main>
  );
}
