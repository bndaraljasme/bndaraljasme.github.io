import { useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ChevronDown, CircleUserRound, Filter, Heart, Home, LayoutGrid, Menu, Search, ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import "./NouraSmartMobile.css";

type Category = "الكل" | "الشاشات" | "المفاتيح" | "الحساسات" | "الملحقات";
type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "الكل">;
  tag: string;
  image: string;
  note: string;
  specs: string[];
  accent: string;
  tint: string;
};

const products: Product[] = [
  { id: 1, name: "شاشة تحكم مركزية 12.3 بوصة", category: "الشاشات", tag: "تحكم مركزي", image: "/__mockup/images/noura-smart-new-screen-5.jpg", note: "شاشة رئيسية تجمع أجهزة البيت في مكان واحد.", specs: ["شاشة لمس", "بوابة Zigbee مدمجة", "تعمل مع Tuya و Smart Life"], accent: "teal", tint: "#c8ddd3" },
  { id: 2, name: "شاشة تحكم مركزية 8 بوصة", category: "الشاشات", tag: "شاشة رئيسية", image: "/__mockup/images/noura-smart-new-screen-123.jpg", note: "شاشة واضحة للمداخل والمساحات التي تحتاج حضوراً عملياً.", specs: ["شاشة لمس واسعة", "تصميم جداري", "عرض الوقت والمشاهد"], accent: "gold", tint: "#ead8b5" },
  { id: 3, name: "شاشة تحكم مركزية 10 بوصة", category: "الشاشات", tag: "تجربة موسعة", image: "/__mockup/images/noura-smart-new-screen-10.jpg", note: "مركز تحكم واضح للبيوت التي تحتاج مساحة أكبر.", specs: ["شاشة لمس كبيرة", "مكبر صوت مدمج", "تحكم بالمشاهد"], accent: "slate", tint: "#d3d9d5" },
  { id: 4, name: "سويتش سيناريو — 4 أزرار", category: "المفاتيح", tag: "سيناريوهات ذكية", image: "/__mockup/images/noura-smart-scenario-switch.jpeg", note: "أربع لمسات تختصر سيناريوهات البيت اليومية في لوحة واحدة.", specs: ["أربعة أزرار مستقلة", "شاشة وقت وطقس مدمجة", "تشغيل المشاهد بلمسة"], accent: "coral", tint: "#ead0c4" },
  { id: 5, name: "حساس خزان الماء", category: "الحساسات", tag: "خزان الماء", image: "/__mockup/images/noura-smart-new-water-tank.jpg", note: "تنبيه واضح قبل أن يتحول تغيّر المستوى إلى مشكلة.", specs: ["حساس مستوى الماء", "تنبيه عند تغير المستوى", "اتصال لاسلكي"], accent: "teal", tint: "#c8ddd3" },
  { id: 6, name: "حساس تسرب الماء الدائري", category: "الحساسات", tag: "أمان البيت", image: "/__mockup/images/noura-smart-new-leak-round.jpg", note: "حماية هادئة للأماكن التي لا تنتبه لها كل يوم.", specs: ["كشف تسرب فوري", "تنبيه عبر التطبيق", "تركيب سهل"], accent: "coral", tint: "#ead0c4" },
  { id: 7, name: "ريموت الأشعة تحت الحمراء", category: "الملحقات", tag: "تحكم شامل", image: "/__mockup/images/noura-smart-new-ir.jpg", note: "اجمع أجهزتك القديمة في مشهد واحد بسيط.", specs: ["يدعم المكيف والتلفاز", "مشاهد مخصصة", "تحكم من التطبيق"], accent: "gold", tint: "#ead8b5" },
  { id: 8, name: "مكرر USB ذكي", category: "الملحقات", tag: "اتصال مستقر", image: "/__mockup/images/noura-smart-new-usb.jpg", note: "حل صغير يحافظ على شبكة أجهزتك قريبة ومستقرة.", specs: ["توسيع نطاق Zigbee", "إعداد سريع", "حجم مدمج"], accent: "slate", tint: "#d3d9d5" },
];

const categoryLabels: Record<Category, string> = { الكل: "الكل", الشاشات: "الشاشات", المفاتيح: "المفاتيح", الحساسات: "الحساسات", الملحقات: "الملحقات" };

function ProductTile({ product, saved, onSave, onOpen }: { product: Product; saved: boolean; onSave: () => void; onOpen: () => void }) {
  return (
    <article className="nsm-product" onClick={onOpen}>
      <div className="nsm-art" style={{ "--art-tint": product.tint } as CSSProperties}>
        <span className="nsm-badge">{product.tag}</span>
        <button className={`nsm-heart ${saved ? "saved" : ""}`} onClick={(event) => { event.stopPropagation(); onSave(); }} aria-label={saved ? "إزالة من المحفوظات" : "حفظ المنتج"}>
          <Heart size={14} fill={saved ? "currentColor" : "none"} />
        </button>
        <img src={product.image} alt={product.name} />
      </div>
      <div className="nsm-product-copy">
        <div className="nsm-product-meta"><span>{product.category}</span><span className="nsm-mono">N / {String(product.id).padStart(2, "0")}</span></div>
        <h3>{product.name}</h3>
        <div className="nsm-product-foot"><span>عرض التفاصيل</span><ArrowLeft size={14} /></div>
      </div>
    </article>
  );
}

function ProductDrawer({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div className="nsm-overlay" onClick={onClose}>
      <section className="nsm-drawer" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={product.name}>
        <div className="nsm-drawer-art" style={{ "--art-tint": product.tint } as CSSProperties}>
          <button className="nsm-close" onClick={onClose} aria-label="إغلاق"><X size={17} /></button>
          <img src={product.image} alt={product.name} />
        </div>
        <div className="nsm-drawer-body">
          <span className="nsm-drawer-kicker">{product.category} · {product.tag}</span>
          <h2>{product.name}</h2>
          <p className="nsm-drawer-note">{product.note}</p>
          <div className="nsm-specs">
            {product.specs.map((spec, index) => <div className="nsm-spec" key={spec}><span>0{index + 1}</span><b>{spec}</b></div>)}
          </div>
          <button className="nsm-drawer-cta" onClick={onClose}><span>حفظت المواصفات؟ تواصل معنا</span><ArrowLeft size={16} /></button>
        </div>
      </section>
    </div>
  );
}

export function NouraSmartMobile() {
  const [category, setCategory] = useState<Category>("الكل");
  const [search, setSearch] = useState("");
  const [sortNewest, setSortNewest] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesCategory = category === "الكل" || product.category === category;
      const matchesSearch = !query || `${product.name} ${product.category} ${product.tag}`.toLowerCase().includes(query);
      const matchesSaved = !showSavedOnly || saved.includes(product.id);
      return matchesCategory && matchesSearch && matchesSaved;
    });
    return sortNewest ? [...list].reverse() : list;
  }, [category, search, sortNewest, saved, showSavedOnly]);

  const toggleSaved = (id: number) => setSaved((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="nsm-page" dir="rtl">
      <div className="nsm-shell">
        <header className="nsm-topbar">
          <a className="nsm-brand" href="#catalog" aria-label="نورة سمارت">
            <img src="/__mockup/images/noura-smart-logo.png" alt="" />
            <span><strong>نورة سمارت</strong><small>SMART HOME</small></span>
          </a>
          <div className="nsm-top-actions">
            <button className="nsm-icon-button" onClick={() => scrollTo("catalog")} aria-label="فتح الكتالوج"><Menu size={17} /></button>
            <button className="nsm-icon-button" onClick={() => { setShowSavedOnly((current) => !current); scrollTo("catalog"); }} aria-label="المحفوظات"><Heart size={16} fill={showSavedOnly ? "currentColor" : "none"} /></button>
          </div>
        </header>

        <div className="nsm-search">
          <Search size={16} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث عن جهاز أو وظيفة..." aria-label="البحث في المنتجات" />
          {search && <button onClick={() => setSearch("")} aria-label="مسح البحث"><X size={14} /></button>}
        </div>

        <section className="nsm-hero">
          <div className="nsm-kicker"><i /> دليل البيت المتصل</div>
          <h1>اختيار أذكى،<br /><em>يوم أهدأ.</em></h1>
          <p>كتالوج نورة بين يديك. تصفح سريع، مواصفات واضحة، وأجهزة تعرف مكانها في البيت.</p>
          <div className="nsm-hero-note"><ShieldCheck size={17} /><span>نرشّح لك ما يستحق المساحة — بلا زحمة خيارات.</span></div>
        </section>

        <section className="nsm-filter-wrap" aria-label="تصفية المنتجات">
          <div className="nsm-filter-head"><strong>تصفح الكتالوج</strong><span className="nsm-count">{filtered.length} منتجات</span></div>
          <div className="nsm-chips">
            {(Object.keys(categoryLabels) as Category[]).map((item) => {
              const count = item === "الكل" ? products.length : products.filter((product) => product.category === item).length;
              return <button key={item} className={`nsm-filter-chip ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{categoryLabels[item]} <b>{count}</b></button>;
            })}
          </div>
        </section>

        <section id="catalog" className="nsm-catalog">
          <div className="nsm-catalog-bar">
            <span className="nsm-result-label">{search ? `نتائج البحث عن «${search}»` : "كل الأجهزة، في لمحة"}</span>
            <button className="nsm-sort" onClick={() => setSortNewest((current) => !current)}><SlidersHorizontal size={14} /> {sortNewest ? "الأحدث أولاً" : "ترتيب مميز"} <ChevronDown size={13} /></button>
          </div>
          <div className="nsm-grid">
            {filtered.length ? filtered.map((product) => <ProductTile key={product.id} product={product} saved={saved.includes(product.id)} onSave={() => toggleSaved(product.id)} onOpen={() => setSelected(product)} />) : (
              <div className="nsm-empty"><Filter size={24} /><h3>{showSavedOnly ? "لم تحفظ أي منتج بعد" : "لم نجد هذا المنتج"}</h3><p>{showSavedOnly ? "اضغط القلب على أي جهاز ليظهر هنا." : "جرّب كلمة أقصر أو استعرض كل الأقسام."}</p><button onClick={() => { setSearch(""); setCategory("الكل"); setShowSavedOnly(false); }}>عرض كل المنتجات</button></div>
            )}
          </div>
        </section>

        <nav className="nsm-bottom-nav" aria-label="التنقل الرئيسي">
          <button className="nsm-bottom-item active" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><Home size={18} /><span>الرئيسية</span></button>
          <button className="nsm-bottom-item" onClick={() => scrollTo("catalog")}><LayoutGrid size={18} /><span>الأقسام</span></button>
          <button className="nsm-bottom-center" onClick={() => document.querySelector<HTMLInputElement>(".nsm-search input")?.focus()} aria-label="بحث"><Search size={18} /></button>
          <button className={`nsm-bottom-item ${showSavedOnly ? "active" : ""}`} onClick={() => { setShowSavedOnly((current) => !current); scrollTo("catalog"); }}><Heart size={18} fill={showSavedOnly ? "currentColor" : "none"} /><span>المحفوظة</span></button>
          <button className="nsm-bottom-item" onClick={() => scrollTo("catalog")}><CircleUserRound size={18} /><span>نورة</span></button>
        </nav>

        {selected && <ProductDrawer product={selected} onClose={() => setSelected(null)} />}
      </div>
    </main>
  );
}

export default NouraSmartMobile;