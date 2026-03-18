"use client";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="bg-gray-950 min-h-screen py-12 px-4 text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">利用規約</h1>
        <div className="space-y-6 text-sm leading-relaxed text-gray-300">
          <section>
            <h2 className="text-green-400 font-bold mb-2">第1条（適用）</h2>
            <p>本規約は、ポッコリラボ（以下「当社」）が提供する「確定申告AI」（以下「本サービス」）の利用に関する条件を定めるものです。</p>
          </section>
          <section>
            <h2 className="text-green-400 font-bold mb-2">第2条（免責事項）</h2>
            <p>本サービスは情報提供を目的としており、税理士・公認会計士による専門的な税務アドバイスの代替ではありません。本サービスの利用により生じた損害について、当社の故意または重過失による場合を除き、一切の責任を負いません。</p>
          </section>
          <section>
            <h2 className="text-green-400 font-bold mb-2">第3条（禁止事項）</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>本サービスの不正利用・クラッキング</li>
              <li>法令または公序良俗に違反する行為</li>
              <li>本サービスの運営を妨害する行為</li>
            </ul>
          </section>
          <section>
            <h2 className="text-green-400 font-bold mb-2">第4条（有料サービスと返金）</h2>
            <p>有料プランの購入後14日以内は返金を承ります。返金を希望される場合はX(Twitter) @levona_design へDMにてご連絡ください。</p>
          </section>
          <section>
            <h2 className="text-green-400 font-bold mb-2">第5条（変更）</h2>
            <p>当社は、必要と判断した場合には、本規約を変更することがあります。変更後の規約は本ページに掲載した時点で効力を生じます。</p>
          </section>
          <section>
            <h2 className="text-green-400 font-bold mb-2">第6条（準拠法・管轄裁判所）</h2>
            <p>本規約の解釈にあたっては、日本法を準拠法とします。紛争については名古屋地方裁判所を専属的合意管轄とします。</p>
          </section>
          <p className="text-gray-600 text-xs">制定日：2026年1月1日</p>
        </div>
        <Link href="/" className="mt-8 inline-block text-green-400 underline text-sm">← トップへ</Link>
      </div>
    </main>
  );
}
