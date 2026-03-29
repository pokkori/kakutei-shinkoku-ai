import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://kakutei-shinkoku-ai.vercel.app";
const TITLE = "フリーランス 確定申告 チェックリスト【2025年分完全版】｜確定申告AI";
const DESC =
  "フリーランス・個人事業主向けの確定申告チェックリスト完全版。必要書類20点以上・経費一覧15点以上・申告ステップ・よくあるミスTOP5を網羅。2025年分（令和7年分）申告に対応。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords:
    "フリーランス 確定申告 チェックリスト, 個人事業主 確定申告, 確定申告 必要書類, 確定申告 経費, 青色申告 チェックリスト, 確定申告 流れ, 2025年 確定申告",
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${SITE_URL}/guide`,
    siteName: "確定申告AI",
    locale: "ja_JP",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  alternates: {
    canonical: `${SITE_URL}/guide`,
  },
};

// ─── Data ───────────────────────────────────────────────────────────────────

const REQUIRED_DOCS = [
  {
    category: "収入に関する書類",
    items: [
      "支払調書（クライアントから受け取ったもの・全取引先分）",
      "請求書の控え・入金明細（支払調書がない場合の売上証明）",
      "銀行通帳のコピーまたはネットバンクの取引明細（売上入金確認用）",
      "源泉徴収票（副業で給与収入がある場合）",
      "海外取引の場合：外貨建て請求書と為替レート記録",
    ],
  },
  {
    category: "経費に関する書類",
    items: [
      "領収書・レシート（業務関連の全支出）",
      "クレジットカード明細（業務使用分をマーカーで分類済みのもの）",
      "賃貸借契約書（自宅兼事務所の家賃按分に必要）",
      "通信費の請求書・明細（スマホ・自宅インターネット）",
      "交通系ICカードの利用履歴または交通費精算メモ",
      "業務用PC・機材の購入領収書（減価償却の根拠書類）",
    ],
  },
  {
    category: "控除に関する書類",
    items: [
      "国民健康保険料の領収書または納付済通知書",
      "国民年金の控除証明書（年末に日本年金機構から郵送）",
      "iDeCo（個人型確定拠出年金）の掛金証明書",
      "小規模企業共済の掛金証明書（加入者のみ）",
      "生命保険料控除証明書（各保険会社から10〜11月に送付）",
      "地震保険料控除証明書（加入者のみ）",
      "医療費の領収書・明細書（医療費控除を申請する場合）",
      "ふるさと納税の寄附金受領証明書（全自治体分）",
      "住宅ローン残高証明書（住宅ローン控除がある場合）",
    ],
  },
  {
    category: "青色申告者のみ必要",
    items: [
      "青色申告承認申請書の控え（初年度確認用）",
      "複式簿記による帳簿（総勘定元帳・仕訳帳）",
      "貸借対照表・損益計算書（65万円控除申請に必須）",
      "現金出納帳・売掛帳・買掛帳（記帳義務あり）",
    ],
  },
  {
    category: "本人確認・マイナンバー関連",
    items: [
      "マイナンバーカード（e-Tax利用 / 税務署提出どちらも必要）",
      "マイナンバーカードがない場合：通知カード＋運転免許証などの顔写真付き身分証",
    ],
  },
];

const DEDUCTIBLE_EXPENSES = [
  {
    name: "通信費",
    detail:
      "スマートフォン・自宅インターネット料金の業務使用割合分（目安：業務60〜80%を按分）",
  },
  {
    name: "家賃・光熱費（家事按分）",
    detail:
      "自宅兼事務所の場合、業務に使用する面積比率で按分。例：20㎡/60㎡＝33%が経費",
  },
  {
    name: "PC・周辺機器・スマートフォン",
    detail:
      "10万円未満なら全額一括経費計上可。10万円以上は減価償却（PC：4年、スマホ：2年）",
  },
  {
    name: "ソフトウェア・SaaSサブスクリプション",
    detail:
      "Adobe Creative Cloud、Figma、Notion、GitHub、ChatGPT Plusなど業務利用のサービス",
  },
  {
    name: "書籍・雑誌・セミナー代",
    detail: "業務スキル向上のための書籍・技術書・オンラインセミナー・勉強会参加費",
  },
  {
    name: "交通費",
    detail:
      "クライアント先への往復交通費、打ち合わせのための電車・バス・タクシー代（領収書必須）",
  },
  {
    name: "接待交際費",
    detail:
      "クライアントとの食事・会食費用。参加者名・目的を記録しておくこと。個人事業主は上限なし",
  },
  {
    name: "広告宣伝費",
    detail:
      "Google広告・Meta広告・X（Twitter）広告、名刺印刷代、ポートフォリオサイトの制作費",
  },
  {
    name: "外注費・業務委託費",
    detail:
      "デザイン・開発・ライティングなどを他のフリーランスに依頼した費用。源泉徴収が必要な場合あり",
  },
  {
    name: "消耗品費",
    detail:
      "文房具、プリンターのインク・用紙、名刺ケース、USBメモリなど10万円未満の業務用品",
  },
  {
    name: "水道光熱費（按分）",
    detail: "自宅兼事務所の場合、家賃と同様の按分比率で電気・ガス代を計上可",
  },
  {
    name: "損害保険料",
    detail: "フリーランス向け賠償責任保険（業務中の事故・情報漏洩等に備えるもの）",
  },
  {
    name: "福利厚生費",
    detail:
      "業務効率改善のためのチェア・スタンディングデスク等（家事按分が必要な場合あり）",
  },
  {
    name: "旅費交通費（出張）",
    detail:
      "業務目的の宿泊費・新幹線・飛行機代。観光目的との区別が明確であれば全額経費計上可",
  },
  {
    name: "銀行手数料・決済手数料",
    detail:
      "振込手数料、PayPal・Stripe等の決済サービス手数料、会計ソフトの月額費用",
  },
  {
    name: "税理士・社労士報酬",
    detail:
      "確定申告を税理士に依頼した場合の費用は全額経費計上可（翌年分から）",
  },
];

const STEPS = [
  {
    step: "01",
    title: "帳簿・書類を整理する（1月〜2月上旬）",
    detail:
      "1年分の売上・経費の記録を整理します。クラウド会計ソフト（freee・マネーフォワード等）を使っている場合はデータを確定。紙領収書はスキャンして保存。銀行・クレジットカードの取引をすべてカテゴリ分類します。",
    tips: ["freee・マネーフォワードはAPIで銀行取引を自動取込可能", "レシートはスマホアプリで撮影保存が便利（SmartHR、Shimo等）"],
  },
  {
    step: "02",
    title: "申告の種類を確認する（白色 or 青色）",
    detail:
      "青色申告承認申請書を前年3月15日までに提出していれば青色申告が可能。青色申告（65万円控除）は複式簿記が必要ですが、節税効果は大きい。今年が初めてなら白色申告でもOK。",
    tips: [
      "青色申告（65万円控除）：所得税・住民税・国保料すべてに効く",
      "来年から青色に切り替えたい場合：3月15日までに申請書提出",
    ],
  },
  {
    step: "03",
    title: "収入・経費・控除の金額を集計する",
    detail:
      "売上合計・経費合計を確定させ、各種控除（社会保険料・生命保険・ふるさと納税・医療費等）の金額を書類から転記します。事業所得＝売上－経費で計算します。",
    tips: [
      "医療費控除：年間10万円超（または所得の5%超）が控除対象",
      "ふるさと納税：ワンストップ特例を使った場合は確定申告不要（ただし医療費控除等と併用する場合は申告が必要）",
    ],
  },
  {
    step: "04",
    title: "確定申告書・青色申告決算書を作成する",
    detail:
      "国税庁の「確定申告書等作成コーナー」（e-Tax）を使うのが最も簡単。画面の指示に沿って数字を入力すれば自動計算されます。青色申告者は損益計算書・貸借対照表も作成します。",
    tips: [
      "e-Taxはマイナンバーカード＋ICカードリーダーまたはスマートフォンで署名可能",
      "作成コーナーで途中保存して翌日続きから再開可能",
    ],
  },
  {
    step: "05",
    title: "申告書を提出する（2月16日〜3月15日）",
    detail:
      "e-Taxでオンライン提出（24時間対応・還付が早い）か、印刷して税務署へ持参または郵送します。e-Taxは提出後すぐに受付番号が発行され、還付まで約3〜4週間です。",
    tips: [
      "e-Tax推奨：還付金の振込が窓口提出より約2〜3週間早い",
      "郵送の場合は消印有効（3月15日消印まで受付）",
    ],
  },
  {
    step: "06",
    title: "納税または還付を確認する",
    detail:
      "所得税に加えて、住民税（翌年6月〜）と国民健康保険料（翌年4月〜）も変動します。納税が必要な場合は3月15日までに納付。口座振替（振替納税）にすれば4月中旬まで猶予が取れます。",
    tips: [
      "振替納税の申込：e-Tax上または所轄税務署へ。3月15日までに手続き",
      "予定納税がある人（前年所得税が15万円以上）は7月・11月に分割前払いあり",
    ],
  },
];

const COMMON_MISTAKES = [
  {
    rank: "01",
    title: "経費の計上漏れ",
    detail:
      "「これは経費になるのか？」と迷って申告しないケースが最も多いミスです。通信費・書籍代・セミナー費・自宅家賃按分など、業務関連性が説明できるものはすべて計上しましょう。年間で数万〜数十万円の損をしている人が多い。",
    fix: "本ページの「経費一覧」を参考に、1年分の支出を見直す",
  },
  {
    rank: "02",
    title: "ふるさと納税のワンストップ特例と確定申告の混同",
    detail:
      "ふるさと納税でワンストップ特例を申請した後に確定申告をすると、ワンストップ特例は無効になります。確定申告をする場合は必ず寄附金控除として申告書に記載が必要です。",
    fix: "確定申告する人は寄附金受領証明書を全自治体分用意して申告書に記載",
  },
  {
    rank: "03",
    title: "青色申告特別控除（65万円）の要件を満たさない",
    detail:
      "e-Taxで申告せず、かつ複式簿記・貸借対照表の添付をしないと、65万円控除が10万円控除に減額されます。会計ソフトでの複式簿記入力とe-Tax提出がセットで必要です。",
    fix: "freee・マネーフォワードなどのクラウド会計ソフトで複式簿記管理し、e-Taxで電子申告する",
  },
  {
    rank: "04",
    title: "医療費控除の対象外・対象の誤認",
    detail:
      "美容目的の歯列矯正・健康診断（病気が見つかっていない場合）・市販のサプリメントは原則対象外です。一方、インフルエンザ予防接種・通院交通費・眼鏡（視力矯正目的）は対象になります。",
    fix: "国税庁の「医療費控除の対象となる医療費の範囲」を確認してから申告",
  },
  {
    rank: "05",
    title: "副業所得20万円以下の申告不要ルールの誤解",
    detail:
      "「副業が20万円以下なら申告不要」なのは所得税の話。住民税の申告は必要です。また、本業がフリーランス（事業所得）の場合はこのルール自体が適用されず、全収入を合算して申告が必要です。",
    fix: "フリーランスは原則すべての収入を事業所得として合算申告。副業の20万ルールは給与所得者向け",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-green-400 font-black text-xl">
          確定申告AI
        </Link>
        <Link
          href="/tool"
          aria-label="確定申告AIツールで収入・経費をAI分析する"
          className="bg-green-500 hover:bg-green-400 text-black text-sm font-bold px-4 py-2 rounded-lg transition"
        >
          AIで分析する →
        </Link>
      </header>

      {/* Hero */}
      <section className="bg-gray-950 pt-16 pb-12 px-4 text-center border-b border-gray-800">
        <div className="inline-block bg-green-900 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-5">
          2025年分（令和7年分）対応 ・ 申告期限：2026年3月15日
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-5 leading-tight max-w-3xl mx-auto">
          フリーランス・個人事業主の<br />
          <span className="text-green-400">確定申告チェックリスト</span><br />
          完全版（2025年分）
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          必要書類20点以上・経費一覧16項目・申告6ステップ・よくあるミスTOP5を網羅。
          このページ1ページで準備から提出まで完全に把握できます。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tool"
            className="bg-green-500 hover:bg-green-400 text-black font-black text-lg px-10 py-4 rounded-xl transition text-center"
          >
            AIで自動分析する（無料3回）→
          </Link>
          <Link
            href="/"
            className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 font-semibold text-lg px-10 py-4 rounded-xl transition text-center"
          >
            料金・詳細を見る
          </Link>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">目次</h2>
          <ol className="space-y-2 text-sm text-green-400">
            <li><a href="#docs" className="hover:text-green-300 transition">1. 申告に必要な書類チェックリスト（20点以上）</a></li>
            <li><a href="#expenses" className="hover:text-green-300 transition">2. 経費として計上できるもの一覧（16項目）</a></li>
            <li><a href="#steps" className="hover:text-green-300 transition">3. 申告の流れ（ステップバイステップ）</a></li>
            <li><a href="#mistakes" className="hover:text-green-300 transition">4. よくあるミスTOP5</a></li>
            <li><a href="#cta" className="hover:text-green-300 transition">5. AIで自動分析・節税ポイントを診断する</a></li>
          </ol>
        </div>
      </section>

      {/* Section 1: Required Docs */}
      <section id="docs" className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-black mb-2 text-white">
          1. 申告に必要な書類チェックリスト
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          申告前に以下の書類がすべて揃っているか確認してください。□は未収集、OKは収集済みのイメージで使用してください。
        </p>

        <div className="space-y-8">
          {REQUIRED_DOCS.map((group) => (
            <div key={group.category}>
              <h3 className="text-base font-bold text-green-400 mb-3 border-l-4 border-green-500 pl-3">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 bg-gray-900 rounded-xl px-4 py-3 text-sm text-gray-200"
                  >
                    <span className="text-gray-500 shrink-0 mt-0.5 text-base">□</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-yellow-900 border border-yellow-700 rounded-2xl p-5 text-sm text-yellow-200">
          <strong className="text-yellow-300">保存期間の注意：</strong>
          申告書・帳簿・領収書類は、原則7年間（一部5年間）の保存義務があります。電子保存（スキャン保存）も要件を満たせば認められます。
        </div>
      </section>

      {/* Section 2: Expenses */}
      <section id="expenses" className="bg-gray-900 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black mb-2 text-white">
            2. 経費として計上できるもの一覧
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            「業務との関連性」が説明できれば経費として認められます。迷いやすい項目を中心にまとめました。
          </p>

          <div className="space-y-4">
            {DEDUCTIBLE_EXPENSES.map((exp) => (
              <div
                key={exp.name}
                className="bg-gray-800 rounded-xl px-5 py-4"
              >
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-bold text-sm shrink-0 mt-0.5">OK</span>
                  <div>
                    <div className="font-bold text-white text-sm mb-1">{exp.name}</div>
                    <div className="text-gray-400 text-xs leading-relaxed">{exp.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-2xl p-5 text-sm text-gray-300">
            <strong className="text-white">按分（あんぶん）とは？</strong>
            <p className="mt-2 text-gray-400 leading-relaxed">
              自宅兼事務所の家賃・光熱費・通信費など、業務と生活の両方に使うものは「業務に使う割合」で按分して経費計上します。
              例えば自宅の25%を仕事スペースとして使っているなら、家賃の25%が経費です。
              割合の根拠（間取り図・使用時間の記録など）を残しておくと税務調査に対応しやすくなります。
            </p>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="bg-green-900 border-y border-green-700 py-10 px-4 text-center">
        <p className="text-green-200 text-sm font-bold mb-3">
          経費の計上漏れ・申告書の書き方はAIが自動診断
        </p>
        <h3 className="text-xl font-black text-white mb-5">
          収入・経費を入力するだけで、節税ポイントをAIが指摘
        </h3>
        <Link
          href="/tool"
          className="inline-block bg-green-400 hover:bg-green-300 text-black font-black text-lg px-10 py-4 rounded-xl transition"
        >
          AIで自動分析する（無料3回）→
        </Link>
      </section>

      {/* Section 3: Steps */}
      <section id="steps" className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black mb-2 text-white">
          3. 確定申告の流れ（ステップバイステップ）
        </h2>
        <p className="text-gray-400 text-sm mb-10">
          初めて申告するフリーランス・個人事業主向けに、準備から納税まで6ステップで解説します。
        </p>

        <div className="space-y-8">
          {STEPS.map((s) => (
            <div key={s.step} className="flex gap-5 items-start">
              <div className="text-5xl font-black text-green-500 opacity-40 shrink-0 w-16 text-right leading-none pt-1">
                {s.step}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{s.detail}</p>
                {s.tips.length > 0 && (
                  <ul className="space-y-1">
                    {s.tips.map((tip) => (
                      <li key={tip} className="text-xs text-green-300 flex items-start gap-2">
                        <span className="shrink-0 mt-0.5 text-green-300 font-bold">*</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl p-6 text-sm text-gray-300">
          <h4 className="font-bold text-white mb-3">申告方法の比較</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 pr-4 text-gray-400 font-bold">方法</th>
                  <th className="text-left py-2 pr-4 text-gray-400 font-bold">手間</th>
                  <th className="text-left py-2 pr-4 text-gray-400 font-bold">還付まで</th>
                  <th className="text-left py-2 text-gray-400 font-bold">特典</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-4 text-green-400 font-bold">e-Tax（推奨）</td>
                  <td className="py-2 pr-4 text-gray-300">低い</td>
                  <td className="py-2 pr-4 text-gray-300">約3〜4週間</td>
                  <td className="py-2 text-gray-300">青色65万円控除の要件を満たす</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-4 text-gray-300">税務署へ持参</td>
                  <td className="py-2 pr-4 text-gray-300">中程度</td>
                  <td className="py-2 pr-4 text-gray-300">約4〜8週間</td>
                  <td className="py-2 text-gray-300">その場で確認できる</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-gray-300">郵送</td>
                  <td className="py-2 pr-4 text-gray-300">中程度</td>
                  <td className="py-2 pr-4 text-gray-300">約6〜10週間</td>
                  <td className="py-2 text-gray-300">消印有効</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Common Mistakes */}
      <section id="mistakes" className="bg-gray-900 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black mb-2 text-white">
            4. フリーランスがやりがちなミスTOP5
          </h2>
          <p className="text-gray-400 text-sm mb-10">
            毎年多くのフリーランスが損をしているミスを紹介します。事前に把握して対策を。
          </p>

          <div className="space-y-6">
            {COMMON_MISTAKES.map((m) => (
              <div
                key={m.rank}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-black text-red-500 opacity-60 shrink-0 leading-none">
                    {m.rank}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-2">{m.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{m.detail}</p>
                    <div className="bg-green-900 border border-green-700 rounded-xl px-4 py-3 text-xs text-green-200">
                      <strong className="text-green-300">対策：</strong> {m.fix}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black mb-8 text-white">よくある質問</h2>
        <div className="space-y-4">
          {[
            {
              q: "フリーランス1年目でも確定申告は必要ですか？",
              a: "はい。フリーランス（個人事業主）として事業所得が発生した場合、所得が48万円（基礎控除額）を超えれば確定申告が必要です。赤字の場合も青色申告であれば損失の繰越控除が受けられるため、申告することをお勧めします。",
            },
            {
              q: "副業収入が20万円以下なら申告不要と聞きましたが？",
              a: "その規定は「給与所得者の副業」に限った話です。本業がフリーランス（事業所得）の場合はすべての収入を合算して申告する義務があります。また、住民税の申告は収入額に関わらず必要です。",
            },
            {
              q: "会計ソフトなしで確定申告できますか？",
              a: "白色申告であれば、国税庁の「確定申告書等作成コーナー」を使えば会計ソフトなしでも申告書を作れます。ただし青色申告（65万円控除）は複式簿記の帳簿が必要なため、freeeやマネーフォワードなどのクラウド会計ソフトを使う方が現実的です。",
            },
            {
              q: "申告期限（3月15日）に間に合わなかった場合は？",
              a: "期限後申告になり、「無申告加算税（15〜20%）」と「延滞税（年約8〜14%）」が課される可能性があります。気づいた時点でできるだけ早く申告してください。自主的に期限後申告した場合は加算税が軽減されるケースがあります。",
            },
            {
              q: "青色申告に切り替えるにはどうすればいいですか？",
              a: "「青色申告承認申請書」を所轄の税務署に提出します。2026年分から青色申告したい場合は、2026年3月15日までに申請が必要です。開業した年は開業日から2ヶ月以内に提出すれば当年から適用されます。",
            },
          ].map((faq) => (
            <div
              key={faq.q}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <h3 className="font-bold text-white text-sm mb-3">Q. {faq.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">A. {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="bg-gray-900 border-t border-gray-800 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block bg-green-900 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-6">
            AIで自動診断・節税アドバイス
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">
            チェックリストを確認したら<br />
            AIで確定申告を完成させよう
          </h2>
          <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-xl mx-auto">
            年収・経費を入力するだけで、AIが「予想納税額」「経費の計上漏れ」「青色/白色の選択」「e-Taxの手順」を30秒で分析。
            税理士費用¥50,000不要。¥2,980で今年の確定申告を完結させましょう。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/tool"
              className="bg-green-500 hover:bg-green-400 text-black font-black text-lg px-10 py-4 rounded-xl transition text-center"
            >
              AIで自動分析する（無料3回）→
            </Link>
            <Link
              href="/"
              className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 font-semibold text-lg px-10 py-4 rounded-xl transition text-center"
            >
              料金・詳細を見る
            </Link>
          </div>

          <p className="text-gray-500 text-xs">
            14日間返金保証 ・ クレジットカード / Apple Pay 対応 ・ 本サービスは情報提供を目的としており、税理士による税務相談の代替ではありません
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8 px-4 text-center text-gray-500 text-xs">
        <p>© 2026 確定申告AI</p>
        <p className="mt-2">
          <Link href="/legal" className="hover:text-gray-300 underline">
            特定商取引法に基づく表記
          </Link>
          {" ｜ "}
          <Link href="/" className="hover:text-gray-300 underline">
            トップページ
          </Link>
          {" ｜ "}
          <Link href="/tool" className="hover:text-gray-300 underline">
            AI診断ツール
          </Link>
        </p>
      </footer>
    </main>
  );
}
