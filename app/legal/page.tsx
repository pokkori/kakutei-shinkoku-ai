import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-green-400 text-sm hover:underline mb-8 block">← トップに戻る</Link>
        <h1 className="text-2xl font-black mb-8 text-white">特定商取引法に基づく表記</h1>
        <table className="w-full text-sm text-gray-300 border-collapse">
          <tbody>
            {[
              ["販売業者", "新美諭"],
              ["代表者", "ポッコリラボ"],
              ["所在地", "請求があれば遅滞なく開示します"],
              ["電話番号", "090-6093-5290"],
              ["メールアドレス", "levonadesign@gmail.com（X: @levona_design）"],
              ["販売価格", "¥2,980（税込）"],
              ["支払方法", "クレジットカード / Apple Pay / Google Pay"],
              ["支払時期", "ご注文時にお支払いいただきます"],
              ["サービス提供", "お支払い完了後、即時にプレミアム機能が有効になります"],
              ["返品・返金", "サービスの性質上、原則としてご購入後の返金は承っておりませんが、サービスが正常に動作しない場合は14日以内にお申し出ください"],
              ["免責事項", "本サービスは情報提供を目的としており、税理士による税務相談の代替ではありません。申告内容の最終責任はご利用者様ご本人にあります"],
            ].map(([key, val]) => (
              <tr key={key} className="border-b border-gray-800">
                <td className="py-3 pr-4 font-bold text-gray-400 w-36 align-top">{key}</td>
                <td className="py-3 text-gray-200">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 pt-8 border-t border-gray-800">
          <h2 className="text-lg font-bold text-white mb-4">AIによる生成コンテンツに関する免責</h2>
          <ol className="space-y-3 list-decimal list-inside text-sm text-gray-300 leading-relaxed">
            <li>本サービスが提供するAI生成コンテンツは、あくまでも参考情報・補助情報として提供するものであり、その正確性、完全性、有用性を保証するものではありません。</li>
            <li>生成AIは常に正確または完全であるとは限りません。専門家（医師、弁護士、税理士、社会保険労務士等）の判断が必要な事項については、必ず専門家にご相談ください。</li>
            <li>当社は、AI生成コンテンツの利用により生じた損害について、一切の責任を負いません。</li>
            <li>基盤モデル提供者（Anthropic, Inc.）のサービス停止や仕様変更により、本サービスの機能が変更・停止される場合があります。</li>
          </ol>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-3">お問い合わせはこちら</p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            お問い合わせフォーム
          </Link>
          <p className="text-xs text-gray-400 mt-2">2営業日以内にご返信いたします（土日祝を除く）</p>
        </div>
      </div>
    </div>
  );
}
