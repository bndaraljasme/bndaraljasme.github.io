import { useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Cpu, Filter, Home, Menu, Radio, Search, ShieldCheck, SlidersHorizontal, X, Zap } from "lucide-react";
import "./_group.css";

type Category = "الكل" | "الشاشات" | "المفاتيح" | "الحساسات";
type Product = { id:number; name:string; category:Exclude<Category,"الكل">; tag:string; image:string; kind:"screen"|"switch"|"sensor"; specs:string[]; note:string };

const products:Product[] = [
  { id:1, name:"شاشة تحكم مركزية 5 بوصة", category:"الشاشات", tag:"تحكم مركزي", kind:"screen", image:"/__mockup/images/noura-smart-tpp05.png", specs:["شاشة لمس","بوابة Zigbee مدمجة","تعمل مع Tuya و Smart Life","تحكم كامل بالمنزل"], note:"شاشة صغيرة تجمع أجهزة البيت في مكان واحد." },
  { id:2, name:"شاشة تحكم مركزية 8 بوصة", category:"الشاشات", tag:"تجربة متعددة", kind:"screen", image:"/__mockup/images/noura-smart-tpa08.png", specs:["لمس وأزرار وصوت","بوابة Bluetooth و Zigbee","تحكم عبر التطبيق","Alexa مدمج"], note:"تحكم مرن يناسب كل غرفة وكل طريقة استخدام." },
  { id:3, name:"شاشة تحكم مركزية 10 بوصة", category:"الشاشات", tag:"تجربة موسعة", kind:"screen", image:"/__mockup/images/noura-smart-tpa10.png", specs:["شاشة لمس كبيرة","كاميرا مدمجة","مكالمات فيديو","RS485 و USB Type‑C"], note:"مركز تحكم واضح للبيوت التي تحتاج حضوراً أكبر." },
  { id:4, name:"سويتش لمس ذكي — 4 أزرار", category:"المفاتيح", tag:"زجاج أسود", kind:"switch", image:"/__mockup/images/noura-smart-dme214.png", specs:["Zigbee 3.0","زجاج مقعر","إطار معدني أسود","L+N Wire · EU Standard"], note:"لمسة واحدة لإضاءة أكثر هدوءاً وأناقة." },
  { id:5, name:"سويتش لمس ذكي — 3 أزرار", category:"المفاتيح", tag:"زجاج أسود", kind:"switch", image:"/__mockup/images/noura-smart-dme213.png", specs:["Zigbee 3.0","زجاج مقعر","إطار معدني أسود","Tuya و Smart Life"], note:"تصميم بسيط بثلاثة مشاهد جاهزة ليومك." },
  { id:6, name:"سويتش ستارة ذكي", category:"المفاتيح", tag:"تحكم بالستارة", kind:"switch", image:"/__mockup/images/noura-smart-dme291.png", specs:["Zigbee 3.0","زر فتح وإغلاق وإيقاف","إطار معدني أسود","تحكم عبر التطبيق"], note:"تحكم ناعم بالضوء والخصوصية من نفس مكانه." },
  { id:7, name:"حساس حركة ذكي", category:"الحساسات", tag:"استشعار ذكي", kind:"sensor", image:"/__mockup/images/noura-smart-motion.png", specs:["Zigbee","PIR + PC L+N","Tuya و Smart Life","للاستخدام الداخلي"], note:"يرصد الحركة بهدوء ليجعل الإضاءة والاستجابة أذكى." },
];

const categoryMeta:Record<Category,{icon:typeof Home; label:string}> = {
  الكل:{icon:Home,label:"كل المنتجات"}, الشاشات:{icon:Radio,label:"الشاشات"}, المفاتيح:{icon:Zap,label:"المفاتيح"}, الحساسات:{icon:ShieldCheck,label:"الحساسات"}
};

function ProductVisual({product}:{product:Product}) {
  return <div className={`noura-visual noura-${product.kind}`}>
    <div className="noura-visual-grid" />
    <img className="noura-product-photo" src={product.image} alt={product.name} />
    <span className="noura-visual-code">NOURA / {String(product.id).padStart(2,"0")}</span>
  </div>;
}

function ProductCard({product,onOpen}:{product:Product;onOpen:(p:Product)=>void}) {
  return <article className="noura-card noura-rise">
    <div className="noura-card-art"><span className="noura-tag">{product.tag}</span><button className="noura-more" aria-label="عرض التفاصيل" onClick={()=>onOpen(product)}><ArrowLeft size={17}/></button><ProductVisual product={product}/></div>
    <div className="noura-card-body"><div className="noura-card-kicker">{product.category}<span>•</span><span className="noura-mono">NOURA {String(product.id).padStart(2,"0")}</span></div><h3>{product.name}</h3><p>{product.note}</p><div className="noura-specs">{product.specs.slice(0,3).map(s=><span key={s}>{s}</span>)}</div><div className="noura-card-foot"><span className="noura-spec-label">المواصفات والتفاصيل</span><button onClick={()=>onOpen(product)} className="noura-detail">عرض التفاصيل <ArrowLeft size={15}/></button></div></div>
  </article>;
}

export function NouraSmartStore() {
  const [category,setCategory] = useState<Category>("الكل");
  const [search,setSearch] = useState("");
  const [selected,setSelected] = useState<Product|null>(null);
  const [menu,setMenu] = useState(false);
  const filtered = useMemo(()=>products.filter(p=>(category==="الكل"||p.category===category)&&p.name.includes(search)),[category,search]);
  return <main dir="rtl" className="noura-store noura-noise min-h-screen">
     <header className="noura-header"><div className="noura-wrap noura-nav"><button className="noura-mobile-menu" onClick={()=>setMenu(!menu)} aria-label="القائمة">{menu?<X/>:<Menu/>}</button><a className="noura-logo" href="#top"><img src="/__mockup/images/noura-smart-logo.png" alt="نورة" /><span><b>نورة سمارت</b><small>SMART HOME</small></span></a><nav className={menu?"is-open":""}>{["المنتجات","لماذا نورة","الدعم"].map((item,i)=><a key={item} href={i===0?"#products":"#promise"} onClick={()=>setMenu(false)}>{item}</a>)}</nav><div className="noura-nav-actions"><label className="noura-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث عن منتج" aria-label="بحث"/></label><button className="noura-icon-btn" aria-label="الملف الشخصي"><span>ن</span></button></div></div></header>
    <section id="top" className="noura-hero noura-wrap"><div className="noura-hero-copy noura-rise"><div className="noura-eyebrow"><span /> بيتك، بإيقاعك</div><h1>تقنية تفهم<br/><em>هدوء البيت.</em></h1><p>أجهزة ذكية مختارة بعناية، لتجعل تفاصيل يومك أسهل — وتبقى أنت في الصورة.</p><a className="noura-hero-cta" href="#products">استكشف المنتجات <ArrowLeft size={18}/></a></div><div className="noura-hero-orb"><div className="noura-orb-inner"><div className="noura-orb-house"><Home size={46}/></div><span className="orb-label orb-one">اتصال أسهل</span><span className="orb-label orb-two">حياة أهدأ</span><span className="orb-label orb-three">اختيار أذكى</span></div><div className="noura-orbit orbit-a"/><div className="noura-orbit orbit-b"/></div><div className="noura-hero-aside"><span className="noura-mono">01 / 03</span><span className="noura-vertical">SMART LIVING / RIYADH</span></div></section>
    <section className="noura-strip"><div className="noura-wrap noura-strip-inner"><span><ShieldCheck size={18}/> ضمان نورة المحلي</span><span><Radio size={18}/> منتجات متوافقة</span><span><Cpu size={18}/> مواصفات واضحة</span><span><Zap size={18}/> إعداد بلا تعقيد</span></div></section>
    <section id="products" className="noura-products noura-wrap"><div className="noura-section-head"><div><div className="noura-eyebrow"><span /> اختيارات للبيت المتصل</div><h2>الأجهزة التي <em>تستحق مكانها.</em></h2></div><p>كل منتج هنا له وظيفة واضحة، ومواصفات نكتبها كما هي.</p></div><div className="noura-filter-row"><div className="noura-categories">{(Object.keys(categoryMeta) as Category[]).map(c=>{const Icon=categoryMeta[c].icon;return <button key={c} className={category===c?"active":""} onClick={()=>setCategory(c)}><Icon size={16}/>{categoryMeta[c].label}<span className="noura-count">{c==="الكل"?products.length:products.filter(p=>p.category===c).length}</span></button>})}</div><button className="noura-filter"><SlidersHorizontal size={16}/> ترتيب: المميز <ChevronDown size={15}/></button></div>{filtered.length?<div className="noura-grid">{filtered.map(p=><ProductCard key={p.id} product={p} onOpen={setSelected}/>)}</div>:<div className="noura-empty"><Filter size={28}/><h3>لم نجد هذا المنتج بعد</h3><p>جرّب كلمة أقصر أو استعرض كل المنتجات.</p><button onClick={()=>{setSearch("");setCategory("الكل")}}>عرض كل المنتجات</button></div>}</section>
    <section id="promise" className="noura-promise"><div className="noura-wrap noura-promise-grid"><div><div className="noura-eyebrow"><span /> فلسفة نورة</div><h2>البيت الذكي<br/><em>لا يحتاج أن يصرخ.</em></h2></div><div className="noura-promise-copy"><p>نختار التقنية التي تندمج مع يومك، لا التي تطلب منك تغيير طريقتك. أجهزة موثوقة، معلومات صريحة، ولمسة سعودية تعرف معنى البيت.</p><span className="noura-mono">N / 2024 — 1446</span></div><div className="noura-promise-stamp">مصمم<br/>للبيت<br/><b>السعودي</b></div></div></section>
     <footer className="noura-footer"><div className="noura-wrap"><div className="noura-footer-top"><a className="noura-logo" href="#top"><img src="/__mockup/images/noura-smart-logo.png" alt="نورة" /><span><b>نورة سمارت</b><small>SMART HOME</small></span></a><p>تقنية أقرب. بيت أهدأ.</p><a href="#top" className="noura-back">العودة للأعلى <ChevronUp size={17}/></a></div><div className="noura-footer-bottom"><span>© نورة سمارت — الرياض، المملكة العربية السعودية</span><span>المتجر التعريفي · المواصفات أولاً</span></div></div></footer>
     {selected&&<div className="noura-modal-backdrop" onClick={()=>setSelected(null)}><section className="noura-modal" onClick={e=>e.stopPropagation()}><button className="noura-modal-close" onClick={()=>setSelected(null)} aria-label="إغلاق"><X/></button><ProductVisual product={selected}/><div className="noura-modal-content"><div className="noura-card-kicker">{selected.category} <span>•</span> <span className="noura-mono">NOURA {String(selected.id).padStart(2,"0")}</span></div><h2>{selected.name}</h2><p>{selected.note}</p><div className="noura-modal-price">المواصفات التقنية</div><div className="noura-detail-list">{selected.specs.map((s,i)=><div key={s}><span className="noura-mono">0{i+1}</span><b>{s}</b></div>)}</div><div className="noura-modal-note">هذا المنتج جزء من كتالوج نورة سمارت التعريفي. للمزيد من المعلومات، تواصل مع فريقنا.</div></div></section></div>}
  </main>;
}