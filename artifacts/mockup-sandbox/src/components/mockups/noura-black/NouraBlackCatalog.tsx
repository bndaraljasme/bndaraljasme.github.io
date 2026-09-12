import { useMemo, useState } from "react";
import { ArrowLeft, ChevronUp, Menu, Search, X } from "lucide-react";
import "./NouraBlackCatalog.css";

type Category = "الكل" | "الشاشات" | "المفاتيح" | "الحساسات";
type Product = {
  id: number;
  category: Exclude<Category, "الكل">;
  name: string;
  image: string;
  kind: string;
  specs: string[];
};

const products: Product[] = [
  { id: 1, category: "الشاشات", name: "شاشة تحكم مركزية 5 بوصة", image: "/__mockup/images/noura-smart-tpp05.png", kind: "CONTROL / 05", specs: ["شاشة لمس", "بوابة Zigbee مدمجة", "Tuya و Smart Life", "تحكم كامل بالمنزل"] },
  { id: 2, category: "الشاشات", name: "شاشة تحكم مركزية 8 بوصة", image: "/__mockup/images/noura-smart-tpa08.png", kind: "CONTROL / 08", specs: ["لمس وأزرار وصوت", "Bluetooth و Zigbee", "تحكم عبر التطبيق", "Alexa مدمج"] },
  { id: 3, category: "الشاشات", name: "شاشة تحكم مركزية 10 بوصة", image: "/__mockup/images/noura-smart-tpa10.png", kind: "CONTROL / 10", specs: ["شاشة لمس كبيرة", "كاميرا مدمجة", "مكالمات فيديو", "RS485 و USB Type-C"] },
  { id: 4, category: "المفاتيح", name: "سويتش لمس ذكي — 4 أزرار", image: "/__mockup/images/noura-smart-dme214.png", kind: "SWITCH / 04", specs: ["Zigbee 3.0", "زجاج مقعر", "إطار معدني أسود", "L+N Wire · EU Standard"] },
  { id: 5, category: "المفاتيح", name: "سويتش لمس ذكي — 3 أزرار", image: "/__mockup/images/noura-smart-dme213.png", kind: "SWITCH / 03", specs: ["Zigbee 3.0", "زجاج مقعر", "إطار معدني أسود", "Tuya و Smart Life"] },
  { id: 6, category: "المفاتيح", name: "سويتش ستارة ذكي", image: "/__mockup/images/noura-smart-dme291.png", kind: "CURTAIN / 01", specs: ["Zigbee 3.0", "فتح وإغلاق وإيقاف", "إطار معدني أسود", "تحكم عبر التطبيق"] },
  { id: 7, category: "الحساسات", name: "حساس حركة ذكي", image: "/__mockup/images/noura-smart-motion.png", kind: "SENSOR / 01", specs: ["Zigbee", "PIR + PC L+N", "Tuya و Smart Life", "للاستخدام الداخلي"] },
];

function ProductCard({ product, onOpen }: { product: Product; onOpen: (product: Product) => void }) {
  return (
    <article className="nb-card">
      <div className="nb-card-art">
        <span className="nb-index nb-mono">N / {String(product.id).padStart(2, "0")}</span>
        <img src={product.image} alt={product.name} />
        <span className="nb-kind nb-mono">{product.kind}</span>
      </div>
      <div className="nb-card-body">
        <div className="nb-card-meta"><span>{product.category}</span><span className="nb-mono">SPEC ONLY</span></div>
        <h3>{product.name}</h3>
        <div className="nb-specs">{product.specs.map((spec, index) => <div className="nb-spec" key={spec}><span>{String(index + 1).padStart(2, "0")}</span><b>{spec}</b></div>)}</div>
        <div className="nb-card-footer"><small className="nb-mono">NOURA / {String(product.id).padStart(2, "0")}</small><button className="nb-detail" onClick={() => onOpen(product)}>التفاصيل <ArrowLeft size={15} /></button></div>
      </div>
    </article>
  );
}

export function NouraBlackCatalog() {
  const [category, setCategory] = useState<Category>("الكل");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = useMemo(() => products.filter((product) => (category === "الكل" || product.category === category) && product.name.includes(search)), [category, search]);
  return (
    <main dir="rtl" className="noura-black min-h-screen">
      <div className="nb-topline nb-wrap nb-mono"><span>نورة سمارت / الكتالوج الرسمي</span><span>الرياض، المملكة العربية السعودية</span></div>
      <header className="nb-header">
        <div className="nb-wrap nb-nav">
          <a className="nb-logo" href="#top"><img src="/__mockup/images/noura-smart-logo.png" alt="نورة سمارت" /><span><b>نورة سمارت</b><small>SMART HOME / 2024</small></span></a>
          <nav className={`nb-navlinks ${menuOpen ? "open" : ""}`}><a className="active" href="#catalog" onClick={() => setMenuOpen(false)}>المنتجات</a><a href="#manifesto" onClick={() => setMenuOpen(false)}>المعيار</a><a href="#footer" onClick={() => setMenuOpen(false)}>تواصل</a></nav>
          <div className="nb-actions"><label className="nb-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث في الكتالوج" aria-label="ابحث في الكتالوج" /></label><button className="nb-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="فتح القائمة">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div>
        </div>
      </header>
      <section id="top" className="nb-wrap nb-hero">
        <div className="nb-hero-copy"><div className="nb-eyebrow">كتالوج نورة / إصدار أسود</div><h1>أجهزة<br /><em>بلا ضجيج.</em></h1><p>اختيارات ذكية للبيت المعاصر. صور حقيقية، ومواصفات مباشرة، دون إضافات لا تحتاجها.</p><a className="nb-hero-cta" href="#catalog">تصفح المواصفات <ArrowLeft size={17} /></a></div>
        <div className="nb-hero-art"><img className="nb-hero-device" src={products[2].image} alt="شاشة تحكم مركزية 10 بوصة" /><span className="nb-art-label">NOURA / CENTRAL CONTROL / 10</span></div>
      </section>
      <section className="nb-marquee"><div className="nb-wrap nb-marquee-track"><span><i /> مواصفات واضحة</span><span><i /> أجهزة مختارة</span><span><i /> تصميم يعيش طويلاً</span><span className="nb-mono">NO. 01 — 07</span></div></section>
      <section id="catalog" className="nb-wrap nb-catalog">
        <div className="nb-section-head"><div><div className="nb-eyebrow">الأرشيف / 2024</div><h2>المنتجات <em>الأساسية.</em></h2></div><p>كتالوج تقني لا يبيعك أكثر مما تحتاج. كل بطاقة هنا تعرض المواصفات فقط.</p></div>
        <div className="nb-toolbar"><div className="nb-filters">{(["الكل", "الشاشات", "المفاتيح", "الحساسات"] as Category[]).map((item) => <button key={item} className={`nb-filter ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="nb-result nb-mono">{filtered.length} / {products.length} أجهزة</span></div>
        {filtered.length ? <div className="nb-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} onOpen={setSelected} />)}</div> : <div className="nb-empty"><p>لا توجد مطابقة في هذا القسم.</p><button onClick={() => { setSearch(""); setCategory("الكل"); }}>عرض الكتالوج كاملاً</button></div>}
      </section>
      <section id="manifesto" className="nb-manifesto"><div className="nb-wrap nb-manifesto-grid"><div><div className="nb-eyebrow">المعيار / نورة</div><h2>البيت الذكي<br /><em>يبدأ من التفاصيل.</em></h2></div><div className="nb-manifesto-copy"><p>لا نضع التقنية في الواجهة. نضعها في مكانها الصحيح: قريبة، موثوقة، ومفهومة. لهذا نكتب مواصفاتنا كما هي ونختار أجهزة تستحق أن تبقى.</p><div className="nb-manifesto-stats"><div><b>07</b><span>منتجات منتقاة</span></div><div><b>04</b><span>أنظمة اتصال</span></div><div><b>01</b><span>معيار واضح</span></div></div></div></div></section>
      <footer id="footer" className="nb-wrap nb-footer"><div className="nb-footer-top"><a className="nb-logo" href="#top"><img src="/__mockup/images/noura-smart-logo.png" alt="نورة سمارت" /><span><b>نورة سمارت</b><small>SMART HOME</small></span></a><p className="nb-footer-note">تقنية أقرب. بيت أهدأ.</p><a className="nb-backtop" href="#top">العودة للأعلى <ChevronUp size={15} /></a></div><div className="nb-footer-bottom nb-mono"><span>© نورة سمارت — الرياض</span><span>SPECIFICATION CATALOG / 1446</span></div></footer>
      {selected && <div className="nb-modal-backdrop" onClick={() => setSelected(null)}><section className="nb-modal" onClick={(event) => event.stopPropagation()}><button className="nb-close" onClick={() => setSelected(null)} aria-label="إغلاق"><X size={18} /></button><div className="nb-modal-art"><img src={selected.image} alt={selected.name} /></div><div className="nb-modal-content"><span className="nb-mono">{selected.category} / NOURA {String(selected.id).padStart(2, "0")}</span><h2>{selected.name}</h2><p>المواصفات التقنية المعتمدة لهذا المنتج ضمن كتالوج نورة سمارت.</p><div className="nb-modal-specs">{selected.specs.map((spec, index) => <div className="nb-modal-spec" key={spec}><span>0{index + 1}</span><b>{spec}</b></div>)}</div></div></section></div>}
    </main>
  );
}