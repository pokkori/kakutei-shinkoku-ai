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
      </div>
    </div>
  );
}
