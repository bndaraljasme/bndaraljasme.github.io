import { useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Cpu, Filter, Home, Menu, Radio, Search, ShieldCheck, SlidersHorizontal, X, Zap } from "lucide-react";
import "./_group.css";

type Category = "الكل" | "الشاشات" | "المفاتيح" | "الحساسات";
type Product = { id:number; name:string; category:Exclude<Category,"الكل">; price:string; tag:string; kind:"screen"|"switch"|"sensor"; specs:string[]; note:string };

const products:Product[] = [
  { id:1, name:"شاشة نورة سمارت 55 بوصة 4K", category:"الشاشات", price:"2,199", tag:"الأكثر طلباً", kind:"screen", specs:["55 بوصة","4K UHD","Google TV","Wi‑Fi 6","Dolby Audio"], note:"صورة غنية وتفاصيل واضحة، من أول مشهد." },
  { id:2, name:"شاشة نورة سمارت 65 بوصة 4K", category:"الشاشات", price:"3,099", tag:"جديد", kind:"screen", specs:["65 بوصة","4K UHD","Google TV","HDR10","تحكم صوتي"], note:"مساحة أكبر للسينما المنزلية، بدون تعقيد." },
  { id:3, name:"سويتش إضاءة ذكي ثلاثي", category:"المفاتيح", price:"189", tag:"اختيار نورة", kind:"switch", specs:["Wi‑Fi","3 قنوات","Google Home و Alexa","تحكم عبر التطبيق"], note:"ثلاثة مصادر ضوء. تحكم واحد هادئ." },
  { id:4, name:"سويتش ستارة ذكي", category:"المفاتيح", price:"219", tag:"مريح", kind:"switch", specs:["Wi‑Fi","للستائر والشرائح","جدولة تلقائية","تحكم صوتي"], note:"افتح يومك على الضوء الذي تحبه." },
  { id:5, name:"حساس حركة ذكي", category:"الحساسات", price:"129", tag:"للمساحات الهادئة", kind:"sensor", specs:["Zigbee","زاوية كشف 120°","تنبيه بطارية منخفضة","للاستخدام الداخلي"], note:"يعرف متى تتحرك المساحة، دون أن يلفت الانتباه." },
  { id:6, name:"حساس باب ونافذة ذكي", category:"الحساسات", price:"99", tag:"أساسي", kind:"sensor", specs:["Zigbee","تنبيهات فورية","كشف العبث","تصميم صغير"], note:"طمأنينة إضافية للأبواب والنوافذ المهمة." },
];

const categoryMeta:Record<Category,{icon:typeof Home; label:string}> = {
  الكل:{icon:Home,label:"كل المنتجات"}, الشاشات:{icon:Radio,label:"الشاشات"}, المفاتيح:{icon:Zap,label:"المفاتيح"}, الحساسات:{icon:ShieldCheck,label:"الحساسات"}
};

function ProductVisual({kind}:{kind:Product["kind"]}) {
  return <div className={`noura-visual noura-${kind}`}>
    <div className="noura-visual-grid" />
    {kind === "screen" && <><div className="noura-tv"><div className="noura-tv-screen"><span className="noura-tv-sun" /><span className="noura-tv-line" /><b>4K</b></div><div className="noura-tv-base" /></div><span className="noura-visual-code">HDR / 6</span></>}
    {kind === "switch" && <><div className="noura-switch"><span /><span /><span /></div><div className="noura-switch-ring" /><span className="noura-visual-code">Wi‑Fi</span></>}
    {kind === "sensor" && <><div className="noura-sensor"><div /><span /></div><div className="noura-signal s1" /><div className="noura-signal s2" /><span className="noura-visual-code">ZIGBEE</span></>}
  </div>;
}

function ProductCard({product,onOpen}:{product:Product;onOpen:(p:Product)=>void}) {
  return <article className="noura-card noura-rise">
    <div className="noura-card-art"><span className="noura-tag">{product.tag}</span><button className="noura-more" aria-label="عرض التفاصيل" onClick={()=>onOpen(product)}><ArrowLeft size={17}/></button><ProductVisual kind={product.kind}/></div>
    <div className="noura-card-body"><div className="noura-card-kicker">{product.category}<span>•</span><span className="noura-mono">NOURA {String(product.id).padStart(2,"0")}</span></div><h3>{product.name}</h3><p>{product.note}</p><div className="noura-specs">{product.specs.slice(0,3).map(s=><span key={s}>{s}</span>)}</div><div className="noura-card-foot"><strong><span className="noura-mono">{product.price}</span> <small>ر.س</small></strong><button onClick={()=>onOpen(product)} className="noura-detail">المواصفات كاملة <ArrowLeft size={15}/></button></div></div>
  </article>;
}

export function NouraSmartStore() {
  const [category,setCategory] = useState<Category>("الكل");
  const [search,setSearch] = useState("");
  const [selected,setSelected] = useState<Product|null>(null);
  const [menu,setMenu] = useState(false);
  const filtered = useMemo(()=>products.filter(p=>(category==="الكل"||p.category===category)&&p.name.includes(search)),[category,search]);
  return <main dir="rtl" className="noura-store noura-noise min-h-screen">
    <header className="noura-header"><div className="noura-wrap noura-nav"><button className="noura-mobile-menu" onClick={()=>setMenu(!menu)} aria-label="القائمة">{menu?<X/>:<Menu/>}</button><a className="noura-logo" href="#top"><span className="noura-mark"><span /></span><span><b>نورة</b><small>SMART HOME</small></span></a><nav className={menu?"is-open":""}>{["المنتجات","لماذا نورة","الدعم"].map((item,i)=><a key={item} href={i===0?"#products":"#promise"} onClick={()=>setMenu(false)}>{item}</a>)}</nav><div className="noura-nav-actions"><label className="noura-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث عن منتج" aria-label="بحث"/></label><button className="noura-icon-btn" aria-label="الملف الشخصي"><span>ن</span></button></div></div></header>
    <section id="top" className="noura-hero noura-wrap"><div className="noura-hero-copy noura-rise"><div className="noura-eyebrow"><span /> بيتك، بإيقاعك</div><h1>تقنية تفهم<br/><em>هدوء البيت.</em></h1><p>أجهزة ذكية مختارة بعناية، لتجعل تفاصيل يومك أسهل — وتبقى أنت في الصورة.</p><a className="noura-hero-cta" href="#products">استكشف المنتجات <ArrowLeft size={18}/></a></div><div className="noura-hero-orb"><div className="noura-orb-inner"><div className="noura-orb-house"><Home size={46}/></div><span className="orb-label orb-one">اتصال أسهل</span><span className="orb-label orb-two">حياة أهدأ</span><span className="orb-label orb-three">اختيار أذكى</span></div><div className="noura-orbit orbit-a"/><div className="noura-orbit orbit-b"/></div><div className="noura-hero-aside"><span className="noura-mono">01 / 03</span><span className="noura-vertical">SMART LIVING / RIYADH</span></div></section>
    <section className="noura-strip"><div className="noura-wrap noura-strip-inner"><span><ShieldCheck size={18}/> ضمان نورة المحلي</span><span><Radio size={18}/> منتجات متوافقة</span><span><Cpu size={18}/> مواصفات واضحة</span><span><Zap size={18}/> إعداد بلا تعقيد</span></div></section>
    <section id="products" className="noura-products noura-wrap"><div className="noura-section-head"><div><div className="noura-eyebrow"><span /> اختيارات للبيت المتصل</div><h2>الأجهزة التي <em>تستحق مكانها.</em></h2></div><p>كل منتج هنا له وظيفة واضحة، ومواصفات نكتبها كما هي.</p></div><div className="noura-filter-row"><div className="noura-categories">{(Object.keys(categoryMeta) as Category[]).map(c=>{const Icon=categoryMeta[c].icon;return <button key={c} className={category===c?"active":""} onClick={()=>setCategory(c)}><Icon size={16}/>{categoryMeta[c].label}<span className="noura-count">{c==="الكل"?products.length:products.filter(p=>p.category===c).length}</span></button>})}</div><button className="noura-filter"><SlidersHorizontal size={16}/> ترتيب: المميز <ChevronDown size={15}/></button></div>{filtered.length?<div className="noura-grid">{filtered.map(p=><ProductCard key={p.id} product={p} onOpen={setSelected}/>)}</div>:<div className="noura-empty"><Filter size={28}/><h3>لم نجد هذا المنتج بعد</h3><p>جرّب كلمة أقصر أو استعرض كل المنتجات.</p><button onClick={()=>{setSearch("");setCategory("الكل")}}>عرض كل المنتجات</button></div>}</section>
    <section id="promise" className="noura-promise"><div className="noura-wrap noura-promise-grid"><div><div className="noura-eyebrow"><span /> فلسفة نورة</div><h2>البيت الذكي<br/><em>لا يحتاج أن يصرخ.</em></h2></div><div className="noura-promise-copy"><p>نختار التقنية التي تندمج مع يومك، لا التي تطلب منك تغيير طريقتك. أجهزة موثوقة، معلومات صريحة، ولمسة سعودية تعرف معنى البيت.</p><span className="noura-mono">N / 2024 — 1446</span></div><div className="noura-promise-stamp">مصمم<br/>للبيت<br/><b>السعودي</b></div></div></section>
    <footer className="noura-footer"><div className="noura-wrap"><div className="noura-footer-top"><a className="noura-logo" href="#top"><span className="noura-mark"><span /></span><span><b>نورة</b><small>SMART HOME</small></span></a><p>تقنية أقرب. بيت أهدأ.</p><a href="#top" className="noura-back">العودة للأعلى <ChevronUp size={17}/></a></div><div className="noura-footer-bottom"><span>© نورة سمارت — الرياض، المملكة العربية السعودية</span><span>المتجر التعريفي · المواصفات أولاً</span></div></div></footer>
    {selected&&<div className="noura-modal-backdrop" onClick={()=>setSelected(null)}><section className="noura-modal" onClick={e=>e.stopPropagation()}><button className="noura-modal-close" onClick={()=>setSelected(null)} aria-label="إغلاق"><X/></button><ProductVisual kind={selected.kind}/><div className="noura-modal-content"><div className="noura-card-kicker">{selected.category} <span>•</span> <span className="noura-mono">NOURA {String(selected.id).padStart(2,"0")}</span></div><h2>{selected.name}</h2><p>{selected.note}</p><div className="noura-modal-price"><span className="noura-mono">{selected.price}</span> <small>ر.س</small></div><div className="noura-detail-list">{selected.specs.map((s,i)=><div key={s}><span className="noura-mono">0{i+1}</span><b>{s}</b></div>)}</div><div className="noura-modal-note">هذا المنتج جزء من كتالوج نورة سمارت التعريفي. للمزيد من المعلومات، تواصل مع فريقنا.</div></div></section></div>}
  </main>;
}