import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Cpu,
  Filter,
  Heart,
  Home as HomeIcon,
  Menu,
  Radio,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
  Zap,
} from 'lucide-react';

type Category = 'الكل' | 'الشاشات' | 'المفاتيح' | 'الحساسات' | 'الملحقات';
type Product = {
  id: number;
  name: string;
  category: Exclude<Category, 'الكل'>;
  tag: string;
  image: string;
  kind: 'screen' | 'switch' | 'sensor' | 'accessory';
  specs: string[];
  note: string;
  accent: 'teal' | 'coral' | 'gold' | 'slate';
  colors?: { name: string; hex: string }[];
};

const products: Product[] = [
  { id: 1, name: 'شاشة تحكم مركزية 12.3 بوصة', category: 'الشاشات', tag: 'تحكم مركزي', kind: 'screen', image: '/images/noura-smart-new-screen-5.jpg', specs: ['شاشة لمس', 'بوابة Zigbee مدمجة', 'تعمل مع Tuya و Smart Life', 'تحكم كامل بالمنزل'], note: 'شاشة رئيسية تجمع أجهزة البيت في مكان واحد.', accent: 'teal' },
  { id: 2, name: 'شاشة تحكم مركزية 8 بوصة', category: 'الشاشات', tag: 'شاشة رئيسية', kind: 'screen', image: '/images/noura-smart-new-screen-123.jpg', specs: ['شاشة لمس واسعة', 'تصميم جداري', 'واجهة منزلية ذكية', 'عرض الوقت والمشاهد'], note: 'شاشة واضحة للمداخل والمساحات التي تحتاج حضوراً عملياً.', accent: 'gold' },
  { id: 3, name: 'شاشة تحكم مركزية 10 بوصة', category: 'الشاشات', tag: 'تجربة موسعة', kind: 'screen', image: '/images/noura-smart-new-screen-10.jpg', specs: ['شاشة لمس كبيرة', 'مكبر صوت مدمج', 'تحكم بالمشاهد', 'واجهة منزلية ذكية'], note: 'مركز تحكم واضح للبيوت التي تحتاج مساحة أكبر.', accent: 'slate' },
  { id: 4, name: 'شاشة تحكم مركزية 6 بوصة', category: 'الشاشات', tag: 'تجربة متعددة', kind: 'screen', image: '/images/noura-smart-new-screen-8.jpg', specs: ['لمس وأزرار وصوت', 'بوابة Bluetooth و Zigbee', 'تحكم عبر التطبيق', 'مشاهد مخصصة'], note: 'تحكم مرن يناسب كل غرفة وكل طريقة استخدام.', accent: 'teal' },
  { id: 32, name: 'شاشة تحكم ذكية 4 بوصة', category: 'الشاشات', tag: 'شاشة مدمجة', kind: 'screen', image: '/images/noura-smart-screen-4-inch.jpeg', specs: ['شاشة لمس 4 بوصة', 'واجهة وقت ومشاهد', 'تصميم جداري مدمج', 'تحكم يومي سريع'], note: 'شاشة صغيرة وواضحة للمداخل وغرف النوم والمساحات العملية.', accent: 'coral' },
  { id: 27, name: 'شاشة تحكم مركزية 5 بوصة — TPP05-Z', category: 'الشاشات', tag: 'شاشة إضافية', kind: 'screen', image: '/images/noura-smart-tpp05.png', specs: ['شاشة لمس 5 بوصة', 'بوابة Zigbee مدمجة', 'مساعد صوتي Alexa', 'تعمل مع Tuya و Smart Life'], note: 'شاشة مدمجة للتحكم الكامل بالمنزل، مع تفاعل باللمس والصوت.', accent: 'coral' },
  { id: 28, name: 'شاشة تحكم مركزية 8 بوصة — TPA08-M3A', category: 'الشاشات', tag: 'شاشة إضافية', kind: 'screen', image: '/images/noura-smart-tpa08.png', specs: ['تفاعل باللمس والصوت', 'بوابة Bluetooth و Zigbee', 'تحكم بالأجهزة المنزلية', 'RS485 و USB Type-C'], note: 'شاشة إضافية واسعة تجمع المشاهد والأجهزة في واجهة واحدة.', accent: 'gold' },
  { id: 29, name: 'شاشة تحكم مركزية 10 بوصة — TPA10-M2A', category: 'الشاشات', tag: 'شاشة إضافية', kind: 'screen', image: '/images/noura-smart-tpa10.png', specs: ['تفاعل باللمس والصوت', 'بوابة Bluetooth و Zigbee', 'كاميرا واضحة مدمجة', 'RS485 و USB Type-C'], note: 'شاشة كبيرة للمشاهد والتحكم اليومي مع تجربة عرض أوسع.', accent: 'slate' },
  { id: 5, name: 'سويتش سمارت ريموت', category: 'المفاتيح', tag: 'تحكم لاسلكي', kind: 'accessory', image: '/images/noura-smart-new-screen-6.jpg', specs: ['تحكم عن بعد', 'مشاهد ذكية', 'اتصال لاسلكي', 'تصميم مدمج'], note: 'سويتش ذكي بتحكم ريموت للمشاهد والإضاءة من أي مكان.', accent: 'coral' },
  { id: 33, name: 'سويتش سيناريو — 4 أزرار', category: 'المفاتيح', tag: 'سيناريوهات ذكية', kind: 'switch', image: '/images/noura-smart-scenario-switch.jpeg', specs: ['أربعة أزرار مستقلة', 'شاشة وقت وطقس مدمجة', 'تشغيل المشاهد بلمسة', 'تصميم جداري أسود'], note: 'أربع لمسات تختصر سيناريوهات البيت اليومية في لوحة واحدة.', accent: 'slate' },
  { id: 7, name: 'سويتش لمس ذكي — 4 أزرار', category: 'المفاتيح', tag: 'زجاج أسود', kind: 'switch', image: '/images/noura-smart-dme214.png', specs: ['Zigbee 3.0', 'زجاج مقعر', 'إطار معدني أسود', 'L+N Wire · EU Standard'], note: 'أربع وظائف ذكية في لوحة واحدة بتصميم هادئ.', accent: 'slate', colors: [{ name: 'أسود', hex: '#202020' }, { name: 'ذهبي', hex: '#b48743' }, { name: 'أبيض', hex: '#f4f1ec' }, { name: 'رمادي', hex: '#8d8d8d' }] },
  { id: 8, name: 'سويتش لمس ذكي — 3 أزرار', category: 'المفاتيح', tag: 'زجاج أسود', kind: 'switch', image: '/images/noura-smart-dme213.png', specs: ['Zigbee 3.0', 'زجاج مقعر', 'إطار معدني أسود', 'Tuya و Smart Life'], note: 'ثلاثة مشاهد جاهزة ليومك بلمسة واحدة.', accent: 'teal', colors: [{ name: 'أسود', hex: '#202020' }, { name: 'ذهبي', hex: '#b48743' }, { name: 'أبيض', hex: '#f4f1ec' }, { name: 'رمادي', hex: '#8d8d8d' }] },
  { id: 9, name: 'سويتش لمس ذكي — زرين', category: 'المفاتيح', tag: 'تحكم مزدوج', kind: 'switch', image: '/images/noura-smart-dme213.png', specs: ['Zigbee 3.0', 'زرّان مستقلان', 'تصميم زجاجي', 'Tuya و Smart Life'], note: 'تحكم مزدوج في لوحة واحدة، متوفر بالألوان التي تناسب جدارك.', accent: 'gold', colors: [{ name: 'أسود', hex: '#202020' }, { name: 'ذهبي', hex: '#b48743' }, { name: 'أبيض', hex: '#f4f1ec' }, { name: 'رمادي', hex: '#8d8d8d' }] },
  { id: 10, name: 'سويتش لمس ذكي — زر واحد', category: 'المفاتيح', tag: 'تحكم بسيط', kind: 'switch', image: '/images/noura-smart-dme213.png', specs: ['Zigbee 3.0', 'زر واحد مستقل', 'إطار ناعم', 'Tuya و Smart Life'], note: 'حل هادئ ومباشر للممرات وغرف النوم، بأكثر من لون.', accent: 'slate', colors: [{ name: 'أسود', hex: '#202020' }, { name: 'ذهبي', hex: '#b48743' }, { name: 'أبيض', hex: '#f4f1ec' }, { name: 'رمادي', hex: '#8d8d8d' }] },
  { id: 11, name: 'سويتش دايمر ذكي', category: 'المفاتيح', tag: 'تعتيم الإضاءة', kind: 'switch', image: '/images/noura-smart-dme213.png', specs: ['Zigbee 3.0', 'رفع وخفض شدة الإضاءة', 'زر تشغيل وإيقاف', 'ألوان متعددة'], note: 'اضبط إضاءة المكان على مزاجك، واختر اللون المناسب لمساحتك.', accent: 'coral', colors: [{ name: 'أسود', hex: '#202020' }, { name: 'ذهبي', hex: '#b48743' }, { name: 'أبيض', hex: '#f4f1ec' }, { name: 'رمادي', hex: '#8d8d8d' }] },
  { id: 12, name: 'سويتش ستارة ذكي', category: 'المفاتيح', tag: 'تحكم بالستارة', kind: 'switch', image: '/images/noura-smart-dme291.png', specs: ['Zigbee 3.0', 'زر فتح وإغلاق وإيقاف', 'إطار معدني أسود', 'تحكم عبر التطبيق'], note: 'تحكم ناعم بالضوء والخصوصية من نفس مكانه.', accent: 'slate', colors: [{ name: 'أسود', hex: '#202020' }, { name: 'ذهبي', hex: '#b48743' }, { name: 'أبيض', hex: '#f4f1ec' }, { name: 'رمادي', hex: '#8d8d8d' }] },
  { id: 17, name: 'حساس اهتزاز ذكي', category: 'الحساسات', tag: 'اهتزاز', kind: 'sensor', image: '/images/noura-smart-new-vibration.jpg', specs: ['كشف الاهتزاز', 'تنبيه فوري', 'اتصال لاسلكي', 'تصميم مدمج'], note: 'يراقب الأبواب والخزائن والأجهزة الحساسة للحركة.', accent: 'gold' },
  { id: 19, name: 'حساس حركة للزاوية', category: 'الحساسات', tag: 'زاوية واسعة', kind: 'sensor', image: '/images/noura-smart-new-motion-angle.jpg', specs: ['كشف حركة للزاوية', 'تغطية واسعة', 'تنبيه ذكي', 'تركيب جداري'], note: 'حساس مخصص للزوايا والممرات لمراقبة الحركة من نقطة أوسع.', accent: 'teal' },
  { id: 20, name: 'حساس رطوبة التربة', category: 'الحساسات', tag: 'للنباتات', kind: 'sensor', image: '/images/noura-smart-new-soil.jpg', specs: ['قياس رطوبة التربة', 'مسبار طويل', 'تنبيه للسقي', 'للنباتات الداخلية'], note: 'يساعدك تعرف متى تحتاج النبتة إلى الماء بدون تخمين.', accent: 'slate' },
  { id: 21, name: 'حساس تسريب ماء — دائري', category: 'الحساسات', tag: 'تسريب الماء', kind: 'sensor', image: '/images/noura-smart-new-leak-round.jpg', specs: ['حساس قطرة ماء', 'سطح دائري', 'تنبيه فوري', 'تركيب سهل'], note: 'حساس دائري صغير يوضع قرب مصادر الماء.', accent: 'teal' },
  { id: 22, name: 'حساس تسريب ماء', category: 'الحساسات', tag: 'تسريب الماء', kind: 'sensor', image: '/images/noura-smart-new-leak-long.jpg', specs: ['حساس قطرة ماء', 'تنبيه فوري', 'تصميم مدمج', 'للمطابخ ودورات المياه'], note: 'يرصد بداية التسريب قرب مصادر الماء وينبهك فوراً.', accent: 'gold' },
  { id: 24, name: 'حساس الشروق والغروب', category: 'الحساسات', tag: 'إضاءة طبيعية', kind: 'sensor', image: '/images/noura-smart-new-sunrise.jpg', specs: ['حساس ضوء', 'تفعيل المشاهد تلقائياً', 'تصميم مربع أسود', 'للاستخدام الخارجي'], note: 'يشغل مشاهد البيت مع تغير ضوء النهار.', accent: 'slate' },
  { id: 26, name: 'حساس حنفية الهوز', category: 'الحساسات', tag: 'للخارج', kind: 'sensor', image: '/images/noura-smart-new-faucet.jpg', specs: ['للحنفية الخارجية', 'تحكم بالهوز', 'تنبيه ذكي', 'تصميم أخضر'], note: 'حل ذكي لحنفية الهوز الخارجية والتحكم بالماء.', accent: 'teal' },
  { id: 31, name: 'حساس حركة ذكي', category: 'الحساسات', tag: 'كشف الحركة', kind: 'sensor', image: '/images/noura-smart-motion.png', specs: ['كشف حركة PIR', 'تغطية واسعة', 'تنبيه فوري', 'اتصال Zigbee'], note: 'يرصد الحركة داخل الغرفة ويرسل تنبيهاً فورياً عند الحاجة.', accent: 'gold' },
  { id: 6, name: 'حساس خزان الماء', category: 'الحساسات', tag: 'خزان الماء', kind: 'sensor', image: '/images/noura-smart-new-water-tank.jpg', specs: ['حساس مستوى الماء', 'تنبيه عند تغير المستوى', 'سلك استشعار', 'تصميم مدمج'], note: 'يراقب مستوى الماء في الخزان ويعطيك تنبيهاً قبل المفاجآت.', accent: 'slate' },
  { id: 23, name: 'مقوي إشارة USB', category: 'الملحقات', tag: 'تقوية الإشارة', kind: 'accessory', image: '/images/noura-smart-new-usb.jpg', specs: ['USB', 'توسيع نطاق الشبكة', 'زر اقتران', 'تصميم صغير'], note: 'يقوي تغطية الإشارة للأجهزة البعيدة داخل المنزل.', accent: 'slate' },
  { id: 25, name: 'حساس IR للتحكم', category: 'الملحقات', tag: 'TV والمكيف', kind: 'accessory', image: '/images/noura-smart-new-ir.jpg', specs: ['تحكم IR', 'للتلفزيون والمكيف', 'مشاهد مخصصة', 'تصميم أسود دائري'], note: 'يجمع أجهزة التحكم بالأشعة تحت الحمراء في مشهد واحد.', accent: 'coral' },
  { id: 30, name: 'ثيرموستات ذكي', category: 'الملحقات', tag: 'تحكم بالتكييف', kind: 'accessory', image: '/images/noura-smart-thermostat.png', specs: ['شاشة حرارة رقمية', 'تحكم بالتكييف المركزي', 'توصيل 3 أسلاك', 'تعمل مع Tuya و Smart Life'], note: 'تحكم واضح بدرجة حرارة المنزل مع شاشة لمس أنيقة.', accent: 'coral' },
];

const categoryMeta: Record<Category, { icon: typeof HomeIcon; label: string }> = {
  الكل: { icon: HomeIcon, label: 'كل المنتجات' },
  الشاشات: { icon: Radio, label: 'الشاشات' },
  المفاتيح: { icon: Zap, label: 'المفاتيح' },
  الحساسات: { icon: ShieldCheck, label: 'الحساسات' },
  الملحقات: { icon: Cpu, label: 'الملحقات' },
};

function ProductVisual({ product }: { product: Product }) {
  return (
    <div className="noura-visual">
      <div className="noura-visual-grid" />
      <img className="noura-product-photo" src={product.image} alt={product.name} />
      <span className="noura-visual-code">NOURA / {String(product.id).padStart(2, '0')}</span>
    </div>
  );
}

function ProductCard({
  product,
  saved,
  expanded,
  onOpen,
  onToggleSaved,
  onToggleColors,
}: {
  product: Product;
  saved: boolean;
  expanded: boolean;
  onOpen: (product: Product) => void;
  onToggleSaved: () => void;
  onToggleColors: () => void;
}) {
  const hasColors = Boolean(product.colors);
  const stop = (event: MouseEvent) => event.stopPropagation();
  return (
    <article className={`noura-card tone-${product.accent} ${expanded ? 'is-expanded' : ''}`} onClick={hasColors ? onToggleColors : undefined}>
      <div className="noura-card-art">
        <span className="noura-tag">{product.tag}</span>
        <button className="noura-more" onClick={(event) => { stop(event); onOpen(product); }} aria-label={`عرض تفاصيل ${product.name}`}><ArrowLeft size={16} /></button>
        <button className={`noura-more noura-favorite ${saved ? 'is-saved' : ''}`} onClick={(event) => { stop(event); onToggleSaved(); }} aria-label={saved ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}>
          <Heart size={15} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <ProductVisual product={product} />
      </div>
      <div className="noura-card-body">
        <div className="noura-card-kicker"><span>{product.category}</span><span>•</span><span className="noura-mono">NOURA {String(product.id).padStart(2, '0')}</span></div>
        <h3>{product.name}</h3>
        <p>{product.note}</p>
        <div className="noura-specs">{product.specs.slice(0, 3).map((spec) => <span key={spec}>{spec}</span>)}</div>
        {hasColors && (
          <div className="noura-switch-colors" onClick={stop}>
            <button className="noura-colors-toggle" onClick={onToggleColors}>{expanded ? 'إخفاء الألوان' : 'الألوان المتوفرة'} <ChevronDown size={13} className={expanded ? 'rotate' : ''} /></button>
            {expanded && <div className="noura-color-options">{product.colors?.map((color) => <span className="noura-color-option" key={color.name}><i style={{ backgroundColor: color.hex }} /><b>{color.name}</b></span>)}</div>}
          </div>
        )}
        <div className="noura-card-foot"><span className="noura-spec-label">{hasColors ? 'اختيارات تناسب مساحتك' : 'المواصفات والتفاصيل'}</span><button onClick={(event) => { stop(event); onOpen(product); }} className="noura-detail">عرض التفاصيل <ArrowLeft size={15} /></button></div>
      </div>
    </article>
  );
}

function ProductModal({ product, onClose, onContact }: { product: Product; onClose: () => void; onContact: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="noura-modal-backdrop" onClick={onClose}>
      <section className="noura-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={product.name}>
        <ProductVisual product={product} />
        <div className="noura-modal-content">
          <button className="noura-modal-close" onClick={onClose} aria-label="إغلاق"><X size={18} /></button>
          <div className="noura-card-kicker"><span>{product.category}</span><span>•</span><span>{product.tag}</span><span className="noura-mono">NOURA {String(product.id).padStart(2, '0')}</span></div>
          <h2>{product.name}</h2>
          <p>{product.note}</p>
          <div className="noura-modal-price">المواصفات التقنية</div>
          <div className="noura-detail-list">{product.specs.map((spec, index) => <div key={spec}><span className="noura-mono">0{index + 1}</span><b>{spec}</b></div>)}</div>
          <div className="noura-modal-note">هذا المنتج جزء من كتالوج نورة سمارت التعريفي. للمزيد من المعلومات، تواصل مع فريقنا.</div>
          <button className="noura-modal-contact" onClick={onContact}>تواصل معنا حول هذا المنتج <ArrowLeft size={16} /></button>
        </div>
      </section>
    </div>
  );
}

function Home() {
  const [category, setCategory] = useState<Category>('الكل');
  const [search, setSearch] = useState('');
  const [sortNewest, setSortNewest] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [expandedSwitch, setExpandedSwitch] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesCategory = category === 'الكل' || product.category === category;
      const matchesSearch = !query || `${product.name} ${product.category} ${product.tag} ${product.specs.join(' ')}`.toLowerCase().includes(query);
      const matchesSaved = !showSavedOnly || saved.includes(product.id);
      return matchesCategory && matchesSearch && matchesSaved;
    });
    return sortNewest ? [...result].reverse() : result;
  }, [category, search, sortNewest, saved, showSavedOnly]);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenu(false); };
  const toggleSaved = (id: number) => setSaved((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]);
  const openContact = () => { setSelected(null); window.setTimeout(() => scrollTo('contact'), 20); };

  return (
    <main className="noura-page" dir="rtl">
      <header className="noura-header">
        <div className="noura-wrap noura-nav">
          <button className="noura-mobile-menu" onClick={() => setMenu((current) => !current)} aria-label={menu ? 'إغلاق القائمة' : 'فتح القائمة'}>{menu ? <X size={18} /> : <Menu size={18} />}</button>
          <a className="noura-logo" href="#top" onClick={() => setMenu(false)}><img src="/images/noura-smart-logo.png" alt="نورة" /><span><b>نورة سمارت</b><small>SMART HOME</small></span></a>
          <nav className={menu ? 'is-open' : ''} aria-label="التنقل الرئيسي">
            <a href="#products" onClick={() => setMenu(false)}>المنتجات</a>
            <a href="#promise" onClick={() => setMenu(false)}>لماذا نورة</a>
            <a href="#contact" onClick={() => setMenu(false)}>الدعم والتواصل</a>
          </nav>
          <div className="noura-nav-actions">
            <label className="noura-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث عن منتج" aria-label="بحث في المنتجات" />{search && <button onClick={() => setSearch('')} aria-label="مسح البحث"><X size={14} /></button>}</label>
            <button className={`noura-icon-btn ${showSavedOnly ? 'active' : ''}`} onClick={() => { setShowSavedOnly((current) => !current); scrollTo('products'); }} aria-label={showSavedOnly ? 'عرض كل المنتجات' : 'عرض المفضلة'}><Heart size={16} fill={showSavedOnly ? 'currentColor' : 'none'} /></button>
          </div>
        </div>
      </header>

      <section id="top" className="noura-wrap noura-hero">
        <div className="noura-hero-copy">
          <div className="noura-eyebrow"><span /> بيتك، بإيقاعك</div>
          <h1>تقنية تفهم<br /><em>هدوء البيت.</em></h1>
          <p>أجهزة ذكية مختارة بعناية، لتجعل تفاصيل يومك أسهل — وتبقى أنت في الصورة.</p>
          <a className="noura-hero-cta" href="#products">استكشف المنتجات <ArrowLeft size={18} /></a>
        </div>
        <div className="noura-hero-orb" aria-hidden="true">
          <div className="noura-orb-inner"><div className="noura-orb-house"><HomeIcon size={43} /></div><span className="orb-label orb-one">اتصال أسهل</span><span className="orb-label orb-two">حياة أهدأ</span><span className="orb-label orb-three">اختيار أذكى</span></div>
          <div className="noura-orbit orbit-a" /><div className="noura-orbit orbit-b" />
        </div>
        <div className="noura-hero-aside"><span className="noura-mono">01 / 03</span><span className="noura-vertical">SMART LIVING / KUWAIT</span></div>
      </section>

      <section className="noura-strip"><div className="noura-wrap noura-strip-inner"><span><ShieldCheck size={18} /> ضمان نورة المحلي</span><span><Radio size={18} /> منتجات متوافقة</span><span><Cpu size={18} /> مواصفات واضحة</span><span><Zap size={18} /> إعداد بلا تعقيد</span></div></section>

      <section id="products" className="noura-wrap noura-products">
        <div className="noura-section-head"><div><div className="noura-eyebrow"><span /> اختيارات للبيت المتصل</div><h2>الأجهزة التي <em>تستحق مكانها.</em></h2></div><p>كل منتج هنا له وظيفة واضحة، ومواصفات نكتبها كما هي.</p></div>
        <div className="noura-filter-row">
          <div className="noura-categories" role="tablist" aria-label="تصنيفات المنتجات">{(Object.keys(categoryMeta) as Category[]).map((item) => { const Icon = categoryMeta[item].icon; const count = item === 'الكل' ? products.length : products.filter((product) => product.category === item).length; return <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} role="tab" aria-selected={category === item}><Icon size={15} />{categoryMeta[item].label}<span className="noura-count">{count}</span></button>; })}</div>
          <button className="noura-filter" onClick={() => setSortNewest((current) => !current)}><SlidersHorizontal size={15} /> {sortNewest ? 'الأحدث أولاً' : 'ترتيب مميز'} <ChevronDown size={14} /></button>
        </div>
        <div className="noura-grid">
          {filtered.length ? filtered.map((product) => <ProductCard key={product.id} product={product} saved={saved.includes(product.id)} expanded={expandedSwitch === product.id} onOpen={setSelected} onToggleSaved={() => toggleSaved(product.id)} onToggleColors={() => setExpandedSwitch((current) => current === product.id ? null : product.id)} />) : <div className="noura-empty"><Filter size={28} /><h3>{showSavedOnly ? 'لم تحفظ أي منتج بعد' : 'لم نجد هذا المنتج'}</h3><p>{showSavedOnly ? 'اضغط القلب على أي جهاز ليظهر هنا.' : 'جرّب كلمة أقصر أو استعرض كل الأقسام.'}</p><button onClick={() => { setSearch(''); setCategory('الكل'); setShowSavedOnly(false); }}>عرض كل المنتجات</button></div>}
        </div>
      </section>

      <section id="promise" className="noura-promise"><div className="noura-wrap noura-promise-grid"><div><div className="noura-eyebrow"><span /> فلسفة نورة</div><h2>البيت الذكي<br /><em>لا يحتاج أن يصرخ.</em></h2></div><div className="noura-promise-copy"><p>نختار التقنية التي تندمج مع يومك، لا التي تطلب منك تغيير طريقتك. أجهزة موثوقة، معلومات صريحة، ولمسة كويتية تعرف معنى البيت.</p><span className="noura-mono">N / 2024 — 1446</span></div><div className="noura-promise-stamp">مصمم<br />للبيت<br /><b>الكويتي</b></div></div></section>

      <section id="contact" className="noura-contact"><div className="noura-wrap noura-contact-inner"><div><div className="noura-eyebrow"><span /> نكون قريبين عندما تحتاجنا</div><h2>عندك سؤال عن جهاز؟</h2><p>فريق نورة سمارت في الكويت جاهز يساعدك في اختيار المواصفات المناسبة.</p></div><div className="noura-contact-numbers"><a href="tel:+96555499000"><PhoneIcon /> +965 55499000</a><a href="tel:+96597631509"><PhoneIcon /> +965 97631509</a><a href="tel:+96558857532"><PhoneIcon /> +965 58857532</a></div></div></section>

      <footer className="noura-footer"><div className="noura-wrap"><div className="noura-footer-top"><a className="noura-logo" href="#top"><img src="/images/noura-smart-logo.png" alt="نورة" /><span><b>نورة سمارت</b><small>SMART HOME</small></span></a><p>تقنية أقرب. بيت أهدأ.</p><a href="#top" className="noura-back">العودة للأعلى <ChevronUp size={17} /></a></div><div className="noura-footer-bottom"><span>© نورة سمارت — الكويت</span><span className="noura-contact-links"><a href="tel:+96555499000">+965 55499000</a><a href="tel:+96597631509">+965 97631509</a><a href="tel:+96558857532">+965 58857532</a></span><span>الكتالوج التعريفي · المواصفات أولاً</span></div></div></footer>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} onContact={openContact} />}
    </main>
  );
}

function PhoneIcon() {
  return <span aria-hidden="true" className="noura-phone-icon">↗</span>;
}

function App() {
  return <Home />;
}

export default App;