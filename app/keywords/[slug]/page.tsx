import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrossSell } from "@/components/CrossSell";

const SITE_URL = "https://kakutei-shinkoku-ai.vercel.app";

interface KeywordData {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  heroDescription: string;
  features: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  lastUpdated: string;
}

const KEYWORDS: KeywordData[] = [
  {
    slug: "kakutei-shinkoku-freelance",
    keyword: "確定申告 フリーランス",
    title: "確定申告 フリーランス | AIが30分でサポート",
    description: "フリーランスの確定申告をAIが30分でサポート。経費分類・控除漏れを自動チェック。税理士費用¥5万を¥2,980に。",
    heroDescription: "フリーランスの確定申告をAIが30分でサポート。経費分類・控除漏れを自動チェックし、最大限の節税を実現します。",
    features: [
      { title: "経費の自動分類", description: "フリーランスに多い通信費・交通費・接待交際費など、AIが業種に合わせて経費を自動分類。漏れなく計上できます。" },
      { title: "控除漏れチェック", description: "基礎控除・社会保険料控除・小規模企業共済など、フリーランスが見落としがちな控除をAIが網羅的にチェック。" },
      { title: "青色申告65万円控除対応", description: "複式簿記が必要な青色申告65万円控除もAIがサポート。e-Tax提出で最大限の節税を。" },
    ],
    faqs: [
      { question: "フリーランスの確定申告はいつまでですか？", answer: "毎年3月15日が申告期限です。期限を過ぎると延滞税が発生する場合があります。確定申告AIを使えば30分で申告書類が完成するので、期限直前でも安心です。" },
      { question: "フリーランス1年目でも確定申告は必要ですか？", answer: "1年目でも所得が48万円（基礎控除額）を超える場合は確定申告が必要です。また、48万円以下でも源泉徴収されている場合は還付を受けるために申告した方がお得です。" },
      { question: "税理士に頼むのとAIの違いは何ですか？", answer: "税理士費用は相場で5万円〜15万円ですが、確定申告AIなら¥2,980で同等の精度を実現。24時間いつでも利用でき、待ち時間もありません。" },
    ],
    lastUpdated: "2026-03-31",
  },
  {
    slug: "kakutei-shinkoku-yarikata",
    keyword: "確定申告 やり方",
    title: "確定申告 やり方 | はじめてでもAIが丁寧にガイド",
    description: "はじめての確定申告でも安心。AIが項目ごとに丁寧にガイド。必要書類から提出方法まで30分で完結。",
    heroDescription: "はじめての確定申告でも安心。AIが項目ごとに丁寧にガイドし、必要書類の準備から提出まで30分で完結させます。",
    features: [
      { title: "ステップバイステップガイド", description: "収入の入力→経費の入力→控除の確認→書類作成まで、AIが一つずつ丁寧にナビゲートします。" },
      { title: "必要書類チェックリスト", description: "源泉徴収票・経費の領収書・マイナンバーカードなど、申告に必要な書類をAIがリストアップ。準備漏れを防ぎます。" },
      { title: "提出方法の選択サポート", description: "e-Tax（電子申告）・郵送・税務署窓口、それぞれのメリットをAIが解説。最適な方法を提案します。" },
    ],
    faqs: [
      { question: "確定申告は何から始めればいいですか？", answer: "まず源泉徴収票や経費の領収書など必要書類を揃えましょう。確定申告AIに収入と経費を入力するだけで、自動的に申告書類が作成されます。" },
      { question: "確定申告に必要な書類は何ですか？", answer: "給与所得者は源泉徴収票、フリーランスは収入・経費の記録、医療費控除を受ける場合は医療費の領収書が必要です。マイナンバーも準備しましょう。" },
      { question: "確定申告は自分でできますか？", answer: "はい、確定申告AIを使えば税の知識がなくても自分で完結できます。質問に答えていくだけで申告書類が完成し、30分程度で終わります。" },
    ],
    lastUpdated: "2026-03-31",
  },
  {
    slug: "kakutei-shinkoku-keihi",
    keyword: "確定申告 経費",
    title: "確定申告 経費 | AIが業種別に自動分類・判定",
    description: "何が経費になる？AIが業種別に経費を自動分類・判定。計上漏れを防いで最大限の節税を実現。",
    heroDescription: "何が経費になるか迷っていませんか？AIが業種別に経費を自動分類・判定し、計上漏れを防いで最大限の節税を実現します。",
    features: [
      { title: "業種別の経費判定", description: "IT・デザイン・ライター・飲食など、業種ごとに認められる経費をAIが自動判定。グレーゾーンの経費も根拠付きで解説。" },
      { title: "家事按分の自動計算", description: "自宅兼事務所の家賃・光熱費・通信費など、事業使用割合をAIが算出。適正な按分率で計上できます。" },
      { title: "経費カテゴリの自動分類", description: "領収書の内容から消耗品費・旅費交通費・通信費など適切な勘定科目にAIが自動分類します。" },
    ],
    faqs: [
      { question: "自宅の家賃は経費にできますか？", answer: "自宅を事業にも使っている場合、事業使用割合（家事按分）に基づいて経費にできます。例えば自宅の30%を仕事に使っている場合、家賃の30%を経費として計上可能です。" },
      { question: "スマホ代は経費になりますか？", answer: "事業で使用している割合に応じて経費にできます。プライベートと兼用の場合は、使用時間や通話記録などを基に事業使用割合を算出し、家事按分で計上します。" },
      { question: "経費の領収書は何年保管する必要がありますか？", answer: "白色申告は5年、青色申告は7年の保管義務があります。電子データでの保存も認められていますので、スキャンやアプリでの管理がおすすめです。" },
    ],
    lastUpdated: "2026-03-31",
  },
  {
    slug: "aojiro-shinkoku-ai",
    keyword: "青色申告 AI",
    title: "青色申告 AI | 65万円控除の条件をAIがチェック",
    description: "青色申告のメリット・デメリットをAIが解説。65万円控除の条件もチェック。複式簿記もAIが自動対応。",
    heroDescription: "青色申告のメリット・デメリットをAIが解説。65万円控除の条件チェックから複式簿記の作成まで、AIが完全サポートします。",
    features: [
      { title: "65万円控除の条件チェック", description: "複式簿記・e-Tax提出・期限内申告など、65万円控除を受けるための条件をAIがチェック。漏れなく満たせます。" },
      { title: "青色 vs 白色の比較シミュレーション", description: "あなたの収入・経費で青色と白色それぞれの税額をAIが計算。どちらがお得か一目でわかります。" },
      { title: "赤字の繰越控除サポート", description: "青色申告なら赤字を3年間繰り越せます。AIが過去の赤字も含めた最適な申告プランを提案します。" },
    ],
    faqs: [
      { question: "青色申告と白色申告の違いは何ですか？", answer: "青色申告は最大65万円の特別控除を受けられ、赤字の繰越（3年）や少額減価償却の特例などメリットが大きいです。白色申告は簡易な帳簿で済みますが、控除額は最大10万円です。" },
      { question: "青色申告は今からでも始められますか？", answer: "青色申告をするには、申告する年の3月15日までに「青色申告承認申請書」を税務署に提出する必要があります。新規開業の場合は開業から2ヶ月以内に提出すれば、その年から青色申告が可能です。" },
      { question: "AIで複式簿記はできますか？", answer: "はい、確定申告AIは収入と経費を入力するだけで複式簿記の形式に自動変換します。簿記の知識がなくても65万円控除に必要な帳簿を作成できます。" },
    ],
    lastUpdated: "2026-03-31",
  },
  {
    slug: "kakutei-shinkoku-ikura-kara",
    keyword: "確定申告 いくらから",
    title: "確定申告 いくらから必要？ | AIが即判定",
    description: "副業・フリーランスはいくらから確定申告が必要？AIがあなたの状況を分析して即判定。",
    heroDescription: "副業・フリーランスはいくらから確定申告が必要？あなたの収入状況をAIが分析し、申告の要否を即判定します。",
    features: [
      { title: "収入パターン別の判定", description: "給与所得者の副業・フリーランス・不動産収入など、収入パターンに応じた申告要否をAIが瞬時に判定します。" },
      { title: "還付の可能性チェック", description: "申告不要でも、源泉徴収で税金を多く払っている場合は還付が受けられます。AIが還付の可能性と金額を試算します。" },
      { title: "住民税の申告も考慮", description: "所得税は不要でも住民税の申告が必要なケースがあります。AIが両方の観点から総合的に判定します。" },
    ],
    faqs: [
      { question: "副業で20万円以下なら確定申告は不要ですか？", answer: "給与所得者の場合、副業の所得（収入-経費）が20万円以下なら所得税の確定申告は不要です。ただし、住民税の申告は別途必要な場合があります。また、2箇所以上から給与を受けている場合は金額に関わらず申告が必要です。" },
      { question: "フリーランスはいくらから確定申告が必要ですか？", answer: "フリーランス（個人事業主）の場合、所得が48万円（基礎控除額）を超えると確定申告が必要です。ただし、それ以下でも源泉徴収されている報酬がある場合、申告すれば還付を受けられる可能性があります。" },
      { question: "確定申告しないとどうなりますか？", answer: "申告が必要なのに行わない場合、無申告加算税（最大20%）や延滞税が課される可能性があります。悪質な場合は重加算税（最大40%）が適用されることもあります。" },
    ],
    lastUpdated: "2026-03-31",
  },
  {
    slug: "fukugyou-kakutei-shinkoku",
    keyword: "副業 確定申告",
    title: "副業 確定申告 | 20万円以下でも必要なケースをAI判定",
    description: "副業20万円以下でも申告が必要なケースをAIが判定。会社にバレない方法も解説。",
    heroDescription: "副業20万円以下でも確定申告が必要なケースがあります。AIがあなたの状況を分析し、最適な申告方法を提案します。",
    features: [
      { title: "申告要否の即判定", description: "副業の種類・金額・給与の有無から、確定申告が必要かどうかをAIが即座に判定。住民税申告の要否も同時にチェック。" },
      { title: "副業バレ防止の申告方法", description: "住民税を「自分で納付」に設定する方法など、会社に副業がバレにくい確定申告の方法をAIがアドバイス。" },
      { title: "副業経費の計上サポート", description: "副業で使ったPC・通信費・書籍代など、経費として計上できるものをAIが判定。節税につなげます。" },
    ],
    faqs: [
      { question: "副業で20万円以下なら本当に申告不要ですか？", answer: "所得税については、給与所得者で副業所得が20万円以下なら確定申告は不要です。ただし、住民税は別途申告が必要です。また、医療費控除やふるさと納税の還付を受ける場合は、副業所得も含めて確定申告する必要があります。" },
      { question: "副業の確定申告で会社にバレますか？", answer: "確定申告時に住民税の納付方法を「自分で納付（普通徴収）」にすれば、副業分の住民税が会社の給与から天引きされないため、バレるリスクを軽減できます。" },
      { question: "副業の確定申告で必要な書類は？", answer: "副業先からの支払調書や源泉徴収票、経費の領収書、本業の源泉徴収票が必要です。確定申告AIに入力すれば、必要書類のチェックリストも自動生成されます。" },
    ],
    lastUpdated: "2026-03-31",
  },
  {
    slug: "e-tax-yarikata",
    keyword: "e-Tax やり方",
    title: "e-Tax やり方 | AIが手順を完全ガイド",
    description: "e-Taxの手順をAIが解説。マイナンバーカードの設定から送信まで完全サポート。",
    heroDescription: "e-Taxの手順をAIがステップバイステップで解説。マイナンバーカードの設定から申告書の送信まで完全サポートします。",
    features: [
      { title: "マイナンバーカード設定ガイド", description: "利用者証明用電子証明書のパスワード設定、ICカードリーダーの準備など、e-Taxに必要な事前準備をAIがナビゲート。" },
      { title: "e-Tax申告書の作成サポート", description: "確定申告AIで作成した申告データをe-Taxで提出する手順を画面ごとにAIが解説します。" },
      { title: "スマホでe-Tax対応", description: "マイナポータルアプリを使えばスマホだけでe-Tax提出が可能。AIがスマホでの操作手順もガイドします。" },
    ],
    faqs: [
      { question: "e-Taxを使うメリットは何ですか？", answer: "e-Taxを使うと青色申告特別控除が最大65万円（紙提出だと55万円）になります。また、還付金の振込が早い（約3週間）、24時間提出可能、添付書類の提出省略など、多くのメリットがあります。" },
      { question: "e-Taxに必要なものは何ですか？", answer: "マイナンバーカード（または利用者識別番号）、ICカードリーダー（またはマイナンバーカード対応スマホ）、パソコンまたはスマホが必要です。" },
      { question: "e-Taxは初めてでも使えますか？", answer: "はい、確定申告AIがステップバイステップでガイドしますので、初めてでも問題なく使えます。マイナンバーカードとスマホがあれば、最短30分で申告が完了します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  {
    slug: "iryouhi-koujo",
    keyword: "医療費控除",
    title: "医療費控除 | AIが対象・計算を自動シミュレーション",
    description: "医療費控除の対象・計算方法をAIが自動シミュレーション。セルフメディケーション税制との比較も。",
    heroDescription: "医療費控除の対象となる費用・計算方法をAIが自動シミュレーション。最大限の還付を受けられるようサポートします。",
    features: [
      { title: "対象医療費の自動判定", description: "治療費・薬代・通院交通費など、医療費控除の対象になるかAIが自動判定。対象外の費用との仕分けも自動で行います。" },
      { title: "還付金額のシミュレーション", description: "年間医療費と所得を入力するだけで、還付される金額をAIが即座に計算。家族分もまとめて計算できます。" },
      { title: "セルフメディケーション税制との比較", description: "通常の医療費控除とセルフメディケーション税制、どちらがお得かAIが比較シミュレーション。最適な方を提案します。" },
    ],
    faqs: [
      { question: "医療費控除はいくらから受けられますか？", answer: "年間の医療費が10万円（または総所得金額の5%のいずれか少ない方）を超えた場合に受けられます。家族全員の医療費を合算できるので、一人では10万円に届かなくても家族合計で超えることがあります。" },
      { question: "市販薬も医療費控除の対象ですか？", answer: "治療目的の市販薬は医療費控除の対象です。また、セルフメディケーション税制を選択すれば、スイッチOTC医薬品の購入費が12,000円を超えた分が控除対象になります（最大88,000円）。" },
      { question: "医療費の領収書は提出が必要ですか？", answer: "現在は領収書の提出は不要ですが、「医療費控除の明細書」の作成が必要です。また、領収書は5年間の保管義務があります。確定申告AIなら入力するだけで明細書が自動作成されます。" },
    ],
    lastUpdated: "2026-03-31",
  },
  {
    slug: "furusato-nouzei-shinkoku",
    keyword: "ふるさと納税 確定申告",
    title: "ふるさと納税 確定申告 | AIが最適な方法を判定",
    description: "ワンストップ特例 vs 確定申告。ふるさと納税の控除をAIが最適な方法で判定。",
    heroDescription: "ワンストップ特例と確定申告、どちらが最適？AIがあなたの状況を分析し、ふるさと納税の控除を最大化する方法を判定します。",
    features: [
      { title: "ワンストップ vs 確定申告の比較", description: "寄付先の数・他の控除の有無・申告の要否など、あなたの状況に応じた最適な方法をAIが判定します。" },
      { title: "控除上限額のシミュレーション", description: "年収・家族構成・その他の控除から、ふるさと納税の控除上限額をAIが正確に計算。損をしない寄付額がわかります。" },
      { title: "寄付金受領証明書の管理", description: "確定申告に必要な寄付金受領証明書のチェックリストをAIが自動作成。提出漏れを防ぎます。" },
    ],
    faqs: [
      { question: "ワンストップ特例と確定申告どちらがいいですか？", answer: "寄付先が5自治体以内で、他に確定申告する理由がなければワンストップ特例が簡単です。6自治体以上に寄付した場合や、医療費控除などで確定申告する場合は、ふるさと納税分も確定申告に含めます。" },
      { question: "ワンストップ特例を申請していたが確定申告する場合は？", answer: "確定申告を行うとワンストップ特例は無効になります。確定申告にふるさと納税の寄付金控除を必ず含めてください。含め忘れると控除が受けられなくなります。" },
      { question: "ふるさと納税の確定申告に必要な書類は？", answer: "各自治体から届く「寄付金受領証明書」が必要です。また、マイナポータル連携を使えば証明書の取得・入力が自動化されます。確定申告AIで簡単に申告できます。" },
    ],
    lastUpdated: "2026-03-31",
  },
  {
    slug: "zeirishi-hiyou",
    keyword: "税理士 費用",
    title: "税理士 費用 | AIなら¥5万→¥2,980で同等精度",
    description: "税理士費用¥5万〜をAIで¥2,980に。税理士と同等の精度で確定申告を完全サポート。",
    heroDescription: "税理士に依頼すると5万円〜15万円かかる確定申告を、AIなら¥2,980で完結。精度は税理士と同等レベルです。",
    features: [
      { title: "税理士の1/17の費用", description: "税理士の平均費用5万円に対し、確定申告AIは¥2,980。年間で数万円の節約になります。毎年の確定申告コストを大幅に削減。" },
      { title: "24時間いつでも対応", description: "税理士は予約が必要で繁忙期は数週間待ちも。AIなら24時間365日、いつでもすぐに利用できます。" },
      { title: "何度でも修正・相談OK", description: "税理士への追加相談は別料金が発生しがちですが、AIなら何度でも修正・シミュレーションが可能です。" },
    ],
    faqs: [
      { question: "確定申告の税理士費用の相場はいくらですか？", answer: "個人の確定申告で税理士に依頼する場合、白色申告で3万円〜5万円、青色申告で5万円〜15万円が相場です。記帳代行を含めるとさらに高額になります。確定申告AIなら¥2,980で完結します。" },
      { question: "AIは税理士と同じ精度ですか？", answer: "確定申告AIは最新の税制に基づいて計算を行い、経費分類・控除チェック・申告書作成を税理士と同等の精度で実行します。ただし、特殊な税務相談は税理士にご相談ください。" },
      { question: "AIを使うデメリットはありますか？", answer: "複雑な法人税務や相続税など特殊なケースでは税理士の専門知識が必要です。個人の確定申告（給与所得・事業所得・不動産所得など）であれば、AIで十分対応可能です。" },
    ],
    lastUpdated: "2026-03-31",
  },
];

const KEYWORD_MAP = new Map(KEYWORDS.map((k) => [k.slug, k]));

export function generateStaticParams() {
  return KEYWORDS.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = KEYWORD_MAP.get(slug);
  if (!data) return {};
  return {
    title: data.title,
    description: data.description,
    other: {
      "article:modified_time": data.lastUpdated,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${SITE_URL}/keywords/${data.slug}`,
      siteName: "確定申告AI",
      locale: "ja_JP",
      type: "website",
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "確定申告AI" }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [`${SITE_URL}/og.png`],
    },
    alternates: {
      canonical: `${SITE_URL}/keywords/${data.slug}`,
    },
  };
}

export default async function KeywordPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = KEYWORD_MAP.get(slug);
  if (!data) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": data.lastUpdated,
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-white">
        {/* Hero */}
        <section className="relative px-4 pt-20 pb-16 text-center max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />
          <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-4">
            {data.keyword}
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-400 bg-clip-text text-transparent">
            {data.title.split("|")[0].trim()}
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {data.heroDescription}
          </p>
          <Link
            href="/tool"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-full text-lg shadow-lg shadow-emerald-900/50 transition-all duration-300 hover:scale-105"
          >
            無料で確定申告サポート
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </section>

        {/* Features */}
        <section className="px-4 py-16 max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-emerald-300">
            確定申告AIの特長
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.features.map((f, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-900/40">
                  <span className="text-white font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-16 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-emerald-300">
            よくある質問
          </h2>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 text-white font-semibold hover:text-emerald-300 transition-colors">
                  <span>{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-emerald-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0 ml-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Repeat */}
        <section className="px-4 py-16 text-center">
          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-10">
            <h2 className="text-2xl font-bold mb-4 text-emerald-300">
              今すぐ確定申告を始めよう
            </h2>
            <p className="text-gray-400 mb-8">
              AIが30分であなたの確定申告を完全サポート。税理士費用の1/17で同等の精度を実現。
            </p>
            <Link
              href="/tool"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-full text-lg shadow-lg shadow-emerald-900/50 transition-all duration-300 hover:scale-105"
            >
              無料で確定申告サポート
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </section>

        {/* LastUpdated */}
        <p className="text-center text-xs text-white/40 mt-8">
          最終更新: 2026年3月31日
        </p>

        {/* CrossSell */}
        <section className="px-4 py-16 max-w-5xl mx-auto">
          <CrossSell currentService="確定申告AI" />
        </section>

        {/* Footer link */}
        <div className="text-center pb-12">
          <Link href="/" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">
            確定申告AI トップへ戻る
          </Link>
        </div>
      </div>
    </>
  );
}
