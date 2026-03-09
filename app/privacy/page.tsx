import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8 text-gray-300 text-sm leading-relaxed">
        <Link href="/" className="text-green-400 text-sm hover:text-green-300 block">← トップに戻る</Link>
        <h1 className="text-2xl font-bold text-white">プライバシーポリシー</h1>
        {[
          ["収集する情報", "本サービスでは、入力いただいた収入・経費等の税務情報、決済情報（Stripe社が管理）、およびCookieによる利用状況を収集します。"],
          ["情報の利用目的", "収集した情報は、AI分析サービスの提供、サービス改善、および不正利用の防止のためにのみ使用します。"],
          ["第三者への提供", "法令に基づく場合を除き、お客様の個人情報を第三者に提供することはありません。"],
          ["入力内容の取り扱い", "入力いただいた税務情報は、AI分析のためにAnthropicのAPIに送信されます。個人を特定できる形での保存・利用はしません。"],
          ["Cookieの使用", "本サービスでは、無料試用回数の管理およびログイン状態の維持のためにCookieを使用しています。"],
          ["免責事項", "本サービスは情報提供を目的としており、税理士による税務相談の代替ではありません。申告内容の最終確認は必ずご自身または税理士にてお願いします。"],
          ["お問い合わせ", "プライバシーに関するご質問はsupport@kakutei-shinkoku-ai.comまでご連絡ください。"],
        ].map(([title, body]) => (
          <section key={title}>
            <h2 className="text-white font-bold mb-2">{title}</h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
