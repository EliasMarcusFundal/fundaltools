import { useState, useEffect } from "react";

/* ══════════════════════════════════════════════════════════
   CONFIGURATION
   ══════════════════════════════════════════════════════════ */

const CHECKOUT = {
  starter: "https://fundalmedia.lemonsqueezy.com/checkout/buy/57f63ef7-92af-4c78-90a9-644fd8bef26e",
  growth: "https://fundalmedia.lemonsqueezy.com/checkout/buy/36296305-309b-47c0-a4bd-34446ce6ba8d",
  scale: "https://fundalmedia.lemonsqueezy.com/checkout/buy/a14e3f78-66cd-4ca1-9187-db8a5eb21d24",
  generator: "https://fundalmedia.lemonsqueezy.com/checkout/buy/a0e4cccc-7c35-417c-a1a6-6b12339b28e1",
  template: (id) => {
    const map = {
      1: "https://fundalmedia.lemonsqueezy.com/checkout/buy/6d3cc82c-bc59-4b5c-ab0c-f993f300d23a",
      2: "https://fundalmedia.lemonsqueezy.com/checkout/buy/9539c6b3-e03f-4230-98e5-96385f5a7281",
      3: "https://fundalmedia.lemonsqueezy.com/checkout/buy/2e670e33-e4c7-425f-bc35-52516792ad9d",
      4: "https://fundalmedia.lemonsqueezy.com/checkout/buy/c5a841b8-7b6a-4d25-bd9d-e565d3ba4d56",
      5: "https://fundalmedia.lemonsqueezy.com/checkout/buy/5f79a1be-3cf0-407d-90ea-51dc99637c36",
      6: "https://fundalmedia.lemonsqueezy.com/checkout/buy/2b0f9cfb-c451-4b59-9e16-61319d42374e",
      7: "https://fundalmedia.lemonsqueezy.com/checkout/buy/382302b7-3703-481f-8b77-0f88a17e81f1",
      8: "https://fundalmedia.lemonsqueezy.com/checkout/buy/1d5822f7-9cca-49c6-ba9a-c737910aa1c8",
    };
    return map[id];
  },
};

const API_URL = "/api/generate";

/* ── DATA ── */
const TEMPLATES = [
  { id: 1, name: "Black Friday VIP Landing Page", cat: "Landing Pages", price: 197, desc: "High-converting countdown + email capture layout optimized for fashion flash sales", fmt: "Shopify Liquid", dl: 342, rating: 4.9, hot: true },
  { id: 2, name: "Product Launch Campaign Kit", cat: "Campaign Kits", price: 247, desc: "Full funnel: teaser → reveal → urgency sequence with matched email flows", fmt: "Meta + Klaviyo", dl: 218, rating: 4.8 },
  { id: 3, name: "Luxury Brand Story Page", cat: "Landing Pages", price: 147, desc: "Editorial scroll layout with lifestyle imagery sections and brand philosophy", fmt: "Shopify Liquid", dl: 189, rating: 4.7 },
  { id: 4, name: "New Collection Drop Sequence", cat: "Email Flows", price: 97, desc: "5-email Klaviyo flow for collection launches with dynamic product blocks", fmt: "Klaviyo", dl: 412, rating: 4.9, hot: true },
  { id: 5, name: "Abandoned Cart Recovery Pro", cat: "Email Flows", price: 127, desc: "3-step recovery with dynamic product blocks and urgency triggers", fmt: "Klaviyo", dl: 567, rating: 5.0, hot: true },
  { id: 6, name: "Streetwear Hype Builder", cat: "Campaign Kits", price: 197, desc: "Scarcity-driven campaign system for limited drops with countdown elements", fmt: "Meta + Email", dl: 156, rating: 4.6 },
  { id: 7, name: "Sustainable Brand Storytelling", cat: "Ad Creatives", price: 97, desc: "12 ad copy variations for eco-conscious positioning across Meta platforms", fmt: "Meta Ads Copy", dl: 234, rating: 4.8 },
  { id: 8, name: "VIP Welcome Flow", cat: "Email Flows", price: 147, desc: "7-email onboarding sequence designed for high-value fashion customers", fmt: "Klaviyo", dl: 389, rating: 4.9 },
];

const LIBRARY_DROPS = [
  { month: "February 2026", count: 4, items: ["15 new ad copy templates", "Seasonal transition framework", "Valentine's gifting angles", "3 UGC script templates"], isNew: true },
  { month: "January 2026", count: 4, items: ["New Year campaign kit", "Winter sale ad frameworks", "12 carousel ad templates", "Email subject line swipes"] },
  { month: "December 2025", count: 4, items: ["Holiday gift guide templates", "Year-end sale sequences", "Loyalty reward campaigns", "5 video ad scripts"] },
];

const PLANS = [
  { name: "Starter", price: 49, desc: "For brands getting started with proven frameworks", features: ["Monthly ad copy templates", "Campaign calendar", "Basic swipe files", "Community access"] },
  { name: "Growth", price: 99, desc: "For brands ready to scale their creative output", features: ["Everything in Starter", "Creative frameworks library", "UGC script templates", "Monthly live workshop", "Priority support"], popular: true },
  { name: "Scale", price: 149, desc: "For brands that want the full agency-grade toolkit", features: ["Everything in Growth", "Custom template requests", "1-on-1 monthly review", "Agency-grade resources", "Early access to new tools"] },
];

const CATS = ["Luxury", "Streetwear", "Sustainable", "Activewear", "Lingerie", "Accessories", "Pet Fashion", "Eyewear"];
const AD_TYPES = ["Single Product Ad", "Collection Launch", "Brand Story", "Retargeting", "Sale / Promotion", "New Arrival"];
const TONES = ["Aspirational & Elevated", "Bold & Confident", "Warm & Inviting", "Edgy & Minimal", "Playful & Fun"];

function generateCopy(cfg) {
  const { brandName: b, product: p, category: c, adType: a, tone: t, url: u } = cfg;
  const site = u || `${b.toLowerCase().replace(/\s/g, "")}.com`;
  const map = {
    "Single Product Ad": [
      { label: "Bestseller Angle", text: `Our bestselling ${p}\n\nFor the woman who values effortless elegance:\n\n→ ${c === "Luxury" ? "Handcrafted with premium materials" : "Designed for everyday confidence"}\n→ A true standout piece\n→ The kind of ${p.toLowerCase()} that turns a simple outfit into a statement\n\nLimited stock available.` },
      { label: "Popular Angle", text: `Our popular ${p}\n\nFor the woman who refuses to blend in:\n\n→ ${c === "Sustainable" ? "Ethically made, beautifully designed" : "Crafted for creative dreamers"}\n→ Pairs with everything in your wardrobe\n→ Once you try it, you'll wonder how you ever dressed without it\n\nLimited stock available.` },
    ],
    "Brand Story": [
      { label: "Philosophy Led", text: `${b} creates ${p.toLowerCase()} for those who see fashion as self-expression. Every piece is designed with intention — to make you feel as powerful as you look.\n\nExplore the collection at ${site}` },
      { label: "Audience Led", text: `${b} crafts ${p.toLowerCase()} for the modern ${c === "Luxury" ? "connoisseur" : "individual"} who values both style and substance. ${c === "Sustainable" ? "Sustainability isn't a compromise — it's the standard." : "Where quality meets confidence."}\n\nExplore ${c.toLowerCase()} essentials at ${site}` },
    ],
    "Collection Launch": [
      { label: "Anticipation", text: `Something new is here.\n\n${b} just dropped a collection that redefines ${c.toLowerCase()} fashion. ${p} — designed for those who set trends, not follow them.\n\n${t === "Bold & Confident" ? "This won't last. Shop now." : "Discover the new collection today."}` },
      { label: "Exclusivity", text: `Introducing the new ${p} collection by ${b}.\n\nEach piece is a reflection of ${c === "Luxury" ? "timeless craftsmanship" : "modern design thinking"}. Made in limited quantities for those who appreciate the difference.\n\nFirst access is live now.` },
    ],
    "Sale / Promotion": [
      { label: "Urgency", text: `${b} — Up to 40% off ${p}\n\nThis is your chance to own pieces you've been eyeing all season. ${c === "Luxury" ? "Premium quality at prices that won't last." : "Style doesn't have to break the bank."}\n\nSale ends Sunday. Don't miss out.` },
      { label: "Value", text: `Your favorite ${p.toLowerCase()} from ${b} — now at the best prices of the season.\n\nSame quality. Same attention to detail. Just a better moment to invest in your wardrobe.\n\nShop the sale before it's gone.` },
    ],
    "Retargeting": [
      { label: "Reminder", text: `Still thinking about it?\n\nThe ${p} from ${b} is still waiting for you. ${c === "Luxury" ? "Some things are worth the investment." : "Great style shouldn't require overthinking."}\n\nComplete your order before it sells out.` },
      { label: "Social Proof", text: `You have great taste.\n\nThe ${p} you were looking at? It's one of ${b}'s most popular pieces this season. Over 500+ happy customers and counting.\n\nDon't let this one get away.` },
    ],
    "New Arrival": [
      { label: "Fresh Drop", text: `Just in: ${p} by ${b}\n\nFresh. ${t === "Edgy & Minimal" ? "Sharp." : "Effortless."} Exactly what your wardrobe's been missing.\n\n${c === "Sustainable" ? "Sustainably crafted for the conscious buyer." : "Designed for those who appreciate the details."}\n\nShop new arrivals now.` },
      { label: "First Run", text: `New from ${b}: ${p}\n\nThe latest addition to a collection built for ${c === "Luxury" ? "discerning taste" : "everyday confidence"}. Simple, intentional design that speaks for itself.\n\nAvailable now — limited first run.` },
    ],
  };
  return map[a] || map["New Arrival"];
}

/* ── ICONS (inline SVGs) ── */
const Icon = ({ children, size = 18, ...props }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>{children}</svg>;
const CartIcon = () => <Icon><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></Icon>;
const ArrowRight = ({ s = 14 }) => <Icon size={s}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></Icon>;
const SparkIcon = () => <Icon size={16}><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" fill="none"/></Icon>;
const CopyIcon = () => <Icon size={14}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></Icon>;
const CheckSmall = () => <Icon size={15} stroke="#1a1a18"><polyline points="20 6 9 17 4 12"/></Icon>;
const MenuIcon = () => <Icon size={22}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Icon>;
const XIcon = () => <Icon size={22}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>;
const StarFill = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="#D4A020" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const DlIcon = () => <Icon size={13} stroke="#999"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>;

export default function FundalTools() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobNav, setMobNav] = useState(false);
  const [filter, setFilter] = useState("All");
  const [cfg, setCfg] = useState({ brandName: "", product: "", category: "Luxury", adType: "Single Product Ad", tone: "Aspirational & Elevated", url: "" });
  const [copies, setCopies] = useState([]);
  const [copied, setCopied] = useState(null);
  const [loading, setLoading] = useState(false);
  const [freeGens, setFreeGens] = useState(3);
  const [vis, setVis] = useState(false);

  useEffect(() => { setVis(false); requestAnimationFrame(() => requestAnimationFrame(() => setVis(true))); window.scrollTo(0, 0); }, [page]);

  const go = p => { setPage(p); setMobNav(false); setShowCart(false); };
  const addCart = t => { if (!cart.find(c => c.id === t.id)) setCart([...cart, t]); };
  const rmCart = id => setCart(cart.filter(c => c.id !== id));
  const total = cart.reduce((s, c) => s + c.price, 0);
  const doGen = async () => {
    if (!cfg.brandName || !cfg.product || freeGens <= 0) return;
    setLoading(true); setCopies([]);
    
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cfg),
      });
      if (resp.ok) {
        const data = await resp.json();
        setCopies(data.copies);
      } else {
        setCopies(generateCopy(cfg));
      }
    } catch {
      setCopies(generateCopy(cfg));
    }
    
    setLoading(false);
    setFreeGens(f => f - 1);
  };
  const doCopy = (text, i) => { navigator.clipboard.writeText(text); setCopied(i); setTimeout(() => setCopied(null), 2000); };

  const allCats = ["All", ...new Set(TEMPLATES.map(t => t.cat))];
  const filtered = filter === "All" ? TEMPLATES : TEMPLATES.filter(t => t.cat === filter);
  const navItems = [
    { id: "home", l: "Home" },
    { id: "library", l: "Creative Library" },
    { id: "templates", l: "Templates" },
    { id: "generator", l: "AI Copy Generator" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "var(--sans)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700;800&display=swap');

        :root {
          --bg: #FAFAF7;
          --bg-card: #FFFFFF;
          --bg-warm: #F5F4F0;
          --bg-dark: #1A1A18;
          --text: #1A1A18;
          --text-secondary: #6B6860;
          --text-muted: #9E9A90;
          --gold: #B8860B;
          --gold-light: #D4A020;
          --gold-bg: #B8860B0A;
          --border: #E8E6E0;
          --border-light: #F0EEE8;
          --sans: 'Manrope', system-ui, sans-serif;
          --serif: 'Instrument Serif', Georgia, serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #B8860B20; }

        .fi { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fi.on { opacity: 1; transform: translateY(0); }
        .d1{transition-delay:.07s}.d2{transition-delay:.14s}.d3{transition-delay:.21s}.d4{transition-delay:.28s}.d5{transition-delay:.35s}

        .topbar {
          position: sticky; top: 0; z-index: 50;
          background: #FAFAF7EE; backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .topbar-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 36px; height: 68px;
        }
        .nav-links { display: flex; gap: 32px; align-items: center; }
        .nl {
          background: none; border: none; cursor: pointer;
          font-family: var(--sans); font-size: 12.5px; font-weight: 500;
          color: var(--text-secondary); transition: color 0.25s; padding: 0;
          letter-spacing: 0.01em;
        }
        .nl:hover { color: var(--text); }
        .nl.active { color: var(--text); font-weight: 700; }

        .logo-btn {
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 12px;
        }
        .logo-mark {
          width: 30px; height: 30px; background: var(--bg-dark);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--sans); font-size: 12px; font-weight: 800; color: #fff;
          border-radius: 6px;
        }
        .logo-label { font-family: var(--sans); font-size: 14px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }

        .cart-btn {
          background: none; border: none; cursor: pointer;
          color: var(--text-secondary); position: relative; padding: 4px;
          transition: color 0.25s;
        }
        .cart-btn:hover { color: var(--text); }
        .cart-dot {
          position: absolute; top: -2px; right: -6px;
          background: var(--gold); color: #fff;
          font-size: 9px; font-weight: 800;
          width: 17px; height: 17px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--sans);
        }

        .ham { display: none; background: none; border: none; color: var(--text-secondary); cursor: pointer; }

        .btn-dark {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--bg-dark); color: #fff;
          border: none; padding: 14px 30px;
          font-family: var(--sans); font-size: 13px; font-weight: 600;
          border-radius: 8px; cursor: pointer;
          transition: all 0.3s ease; letter-spacing: 0.01em;
        }
        .btn-dark:hover { background: #2d2d2a; box-shadow: 0 4px 20px rgba(0,0,0,0.12); transform: translateY(-1px); }
        .btn-dark:disabled { opacity: 0.3; cursor: not-allowed; transform: none; box-shadow: none; }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--text);
          border: 1.5px solid var(--border); padding: 13px 28px;
          font-family: var(--sans); font-size: 13px; font-weight: 500;
          border-radius: 8px; cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-outline:hover { border-color: var(--text-secondary); background: var(--bg-warm); }

        .btn-gold {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #B8860B, #D4A020);
          color: #fff; border: none; padding: 14px 30px;
          font-family: var(--sans); font-size: 13px; font-weight: 600;
          border-radius: 8px; cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-gold:hover { box-shadow: 0 4px 24px #B8860B30; transform: translateY(-1px); }

        .tcard {
          background: var(--bg-card); border: 1px solid var(--border-light);
          border-radius: 12px; padding: 28px;
          transition: all 0.35s ease;
        }
        .tcard:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.06); border-color: var(--border); transform: translateY(-3px); }

        .ipt {
          background: var(--bg-card); border: 1.5px solid var(--border);
          color: var(--text); padding: 13px 16px;
          font-family: var(--sans); font-size: 14px;
          width: 100%; outline: none; transition: border-color 0.25s;
          border-radius: 8px;
        }
        .ipt:focus { border-color: var(--gold); box-shadow: 0 0 0 3px #B8860B10; }
        .ipt::placeholder { color: #C5C0B6; }
        select.ipt {
          appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath d='M5 7L1 3h8z' fill='%239E9A90'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
        }
        select.ipt option { background: #fff; }

        .ftag {
          background: var(--bg-card); border: 1.5px solid var(--border);
          color: var(--text-secondary); padding: 8px 18px;
          font-family: var(--sans); font-size: 12px; font-weight: 500;
          border-radius: 100px; cursor: pointer; transition: all 0.25s;
          white-space: nowrap;
        }
        .ftag:hover { border-color: var(--text-secondary); color: var(--text); }
        .ftag.on { background: var(--bg-dark); color: #fff; border-color: var(--bg-dark); }

        .shim { background: linear-gradient(90deg, #F0EEE8 25%, #E8E6E0 50%, #F0EEE8 75%); background-size: 200% 100%; animation: shim 1.5s infinite; border-radius: 6px; }
        @keyframes shim { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        .pop-pill {
          background: var(--bg-dark); color: #fff;
          font-family: var(--sans); font-size: 10px; font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 100px;
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
        }

        .hot-badge {
          background: #B8860B12; color: var(--gold);
          font-family: var(--sans); font-size: 10px; font-weight: 700;
          padding: 3px 10px; border-radius: 100px; text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .mob-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: #FAFAF7F5; backdrop-filter: blur(32px);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px;
        }
        .mob-overlay .nl { font-size: 18px; }

        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .ham { display: block !important; }
          .topbar-inner { padding: 0 20px; }
          .sec-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }
        @media (max-width: 600px) {
          .hero-title { font-size: 38px !important; }
        }
      `}</style>

      {/* ══ NAV ══ */}
      <nav className="topbar">
        <div className="topbar-inner">
          <button className="logo-btn" onClick={() => go("home")}>
            <div className="logo-mark">F</div>
            <span className="logo-label">Fundal Tools</span>
          </button>
          <div className="nav-links">
            {navItems.map(n => (
              <button key={n.id} className={`nl ${page === n.id ? "active" : ""}`} onClick={() => go(n.id)}>{n.l}</button>
            ))}
            <div style={{ width: 1, height: 18, background: "var(--border)", margin: "0 4px" }} />
            <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
              <CartIcon />
              {cart.length > 0 && <span className="cart-dot">{cart.length}</span>}
            </button>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <button className="cart-btn ham" onClick={() => setShowCart(!showCart)} style={{ display: "none" }}>
              <CartIcon />
              {cart.length > 0 && <span className="cart-dot">{cart.length}</span>}
            </button>
            <button className="ham" onClick={() => setMobNav(true)}><MenuIcon /></button>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV */}
      {mobNav && (
        <div className="mob-overlay">
          <button onClick={() => setMobNav(false)} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}><XIcon /></button>
          {navItems.map(n => <button key={n.id} className={`nl ${page === n.id ? "active" : ""}`} onClick={() => go(n.id)}>{n.l}</button>)}
        </div>
      )}

      {/* CART DRAWER */}
      {showCart && (
        <>
          <div onClick={() => setShowCart(false)} style={{ position: "fixed", inset: 0, background: "#0003", zIndex: 55 }} />
          <div style={{ position: "fixed", top: 0, right: 0, width: "min(440px, 94vw)", bottom: 0, background: "#fff", zIndex: 60, padding: 32, overflowY: "auto", boxShadow: "-20px 0 60px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Cart ({cart.length})</span>
              <button onClick={() => setShowCart(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}><XIcon /></button>
            </div>
            {cart.length === 0 ? <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Your cart is empty</p> : (
              <>
                {cart.map(item => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--border-light)" }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{item.name}</p>
                      <p style={{ fontSize: 14, color: "var(--gold)", fontWeight: 600 }}>€{item.price}</p>
                    </div>
                    <button onClick={() => rmCart(item.id)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 12, fontWeight: 500, fontFamily: "var(--sans)" }}>Remove</button>
                  </div>
                ))}
                <div style={{ marginTop: 28, paddingTop: 28, borderTop: "2px solid var(--bg-dark)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-secondary)" }}>Total</span>
                    <span style={{ fontSize: 28, fontWeight: 700 }}>€{total}</span>
                  </div>
                  <button className="btn-dark" style={{ width: "100%", justifyContent: "center", padding: "16px 30px" }}
                    onClick={() => {
                      if (cart.length > 0) window.open(CHECKOUT.template(cart[0].id), "_blank");
                    }}>Checkout</button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* ══ MAIN ══ */}
      <main style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* ════ HOME ════ */}
        {page === "home" && (
          <div className="sec-pad" style={{ padding: "0 36px" }}>
            <section style={{ paddingTop: "clamp(64px, 12vh, 130px)", paddingBottom: "clamp(64px, 10vh, 110px)" }}>
              <div className={`fi ${vis ? "on" : ""}`} style={{ display: "inline-block", background: "var(--gold-bg)", border: "1px solid #B8860B18", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)" }}>By Fundal Media — 10+ years scaling fashion brands</span>
              </div>

              <h1 className={`fi d1 ${vis ? "on" : ""} hero-title`} style={{ fontFamily: "var(--serif)", fontSize: "clamp(44px, 6.5vw, 76px)", fontWeight: 400, lineHeight: 1.08, marginBottom: 24, maxWidth: 820, letterSpacing: "-0.02em" }}>
                Scale your fashion brand with proven ad systems
              </h1>

              <p className={`fi d2 ${vis ? "on" : ""}`} style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: 560, marginBottom: 40 }}>
                Ad copy templates, conversion-optimized landing pages, and an AI copy generator — built from real campaigns across 30+ markets.
              </p>

              <div className={`fi d3 ${vis ? "on" : ""}`} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn-dark" onClick={() => go("library")}>Browse Creative Library <ArrowRight /></button>
                <button className="btn-outline" onClick={() => go("generator")}>Try AI Copy Generator</button>
              </div>

              {/* STATS */}
              <div className={`fi d4 ${vis ? "on" : ""}`} style={{ display: "flex", gap: 0, marginTop: "clamp(64px, 9vh, 100px)", background: "var(--bg-dark)", borderRadius: 14, overflow: "hidden" }}>
                {[
                  { v: "€2.1M+", l: "Monthly Ad Spend" },
                  { v: "5.2x", l: "Average ROAS" },
                  { v: "100+", l: "Fashion Brands" },
                  { v: "30+", l: "Markets" },
                ].map((s, i) => (
                  <div key={i} style={{ flex: 1, padding: "clamp(20px, 3vw, 36px)", borderLeft: i > 0 ? "1px solid #2d2d2a" : "none", textAlign: "center", minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3vw, 36px)", color: "#fff", fontWeight: 400 }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "#888580", marginTop: 4, fontWeight: 500 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3 PRODUCTS */}
            <section style={{ paddingBottom: "clamp(64px, 10vh, 110px)" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)", letterSpacing: "0.06em", textTransform: "uppercase" }}>What's Inside</span>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 400, marginTop: 8, letterSpacing: "-0.02em" }}>Three tools, one platform</h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                {[
                  { n: "01", t: "Creative Library", s: "From €49/mo", d: "Monthly ad copy templates, campaign frameworks, UGC scripts, and swipe files. New resources every month.", p: "library", emoji: "📋" },
                  { n: "02", t: "Template Shop", s: "€97 – €297", d: "High-converting landing pages, email flows, and campaign kits. Shopify & Klaviyo compatible.", p: "templates", emoji: "🎨" },
                  { n: "03", t: "AI Copy Generator", s: "Free to try", d: "Generate fashion-specific ad copy using proven frameworks from €2.1M+ in managed ad spend.", p: "generator", emoji: "⚡" },
                ].map((c, i) => (
                  <div key={i} className="tcard" onClick={() => go(c.p)} style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 32, marginBottom: 16 }}>{c.emoji}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em" }}>{c.t}</h3>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--gold)", marginBottom: 12 }}>{c.s}</span>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, flex: 1 }}>{c.d}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 20, fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                      Explore <ArrowRight s={13} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TRUST / CTA */}
            <section style={{ paddingBottom: "clamp(80px, 12vh, 130px)", textAlign: "center" }}>
              <div style={{ background: "var(--bg-warm)", borderRadius: 16, padding: "clamp(40px, 6vw, 72px) clamp(24px, 4vw, 64px)" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Why Fundal Tools</span>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, marginTop: 8, marginBottom: 16, letterSpacing: "-0.02em" }}>
                  Built by the agency behind<br /><em>€150M+ in client revenue</em>
                </h2>
                <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 32px" }}>
                  These aren't generic marketing templates. Every framework, template, and copy structure comes from real campaigns that generated real revenue for real fashion brands.
                </p>
                <button className="btn-dark" onClick={() => go("library")}>Get Started <ArrowRight /></button>
              </div>
            </section>
          </div>
        )}

        {/* ════ CREATIVE LIBRARY ════ */}
        {page === "library" && (
          <div className="sec-pad" style={{ padding: "48px 36px 100px" }}>
            <div className={`fi ${vis ? "on" : ""}`} style={{ display: "inline-block", background: "var(--gold-bg)", border: "1px solid #B8860B18", borderRadius: 100, padding: "6px 16px", marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)" }}>Self-Serve Creative Library</span>
            </div>
            <h2 className={`fi d1 ${vis ? "on" : ""}`} style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 400, marginBottom: 12, letterSpacing: "-0.02em" }}>
              Templates & frameworks,<br /><em>delivered monthly</em>
            </h2>
            <p className={`fi d2 ${vis ? "on" : ""}`} style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: 580, marginBottom: 48 }}>
              The same ad copy systems and creative frameworks used to scale 25+ fashion brands — packaged for you to deploy instantly.
            </p>

            {/* DROPS */}
            <div className={`fi d3 ${vis ? "on" : ""}`} style={{ marginBottom: 64 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", marginBottom: 20 }}>Recent Drops</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                {LIBRARY_DROPS.map((m, i) => (
                  <div key={i} className="tcard" style={{ position: "relative" }}>
                    {m.isNew && <span className="hot-badge" style={{ position: "absolute", top: 16, right: 16 }}>New</span>}
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)" }}>{m.month}</span>
                    <ul style={{ listStyle: "none", marginTop: 14 }}>
                      {m.items.map((it, j) => (
                        <li key={j} style={{ fontSize: 14, color: "var(--text-secondary)", padding: "9px 0", borderBottom: j < m.items.length - 1 ? "1px solid var(--border-light)" : "none", display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ color: "var(--gold)", fontSize: 6, flexShrink: 0 }}>●</span> {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICING */}
            <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", marginBottom: 20 }}>Choose Your Plan</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {PLANS.map((pl, i) => (
                <div key={i} className="tcard" style={{ position: "relative", border: pl.popular ? "2px solid var(--bg-dark)" : undefined, paddingTop: pl.popular ? 36 : 28 }}>
                  {pl.popular && <div className="pop-pill">Most Popular</div>}
                  <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{pl.name}</h4>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>{pl.desc}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 24 }}>
                    <span style={{ fontFamily: "var(--serif)", fontSize: 44, fontWeight: 400, letterSpacing: "-0.03em" }}>€{pl.price}</span>
                    <span style={{ fontSize: 14, color: "var(--text-muted)" }}>/month</span>
                  </div>
                  <ul style={{ listStyle: "none", marginBottom: 28 }}>
                    {pl.features.map((f, j) => (
                      <li key={j} style={{ fontSize: 14, color: "var(--text-secondary)", padding: "8px 0", display: "flex", gap: 10, alignItems: "center" }}>
                        <CheckSmall /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={pl.popular ? "btn-dark" : "btn-outline"} style={{ width: "100%", justifyContent: "center" }}
                    onClick={() => window.open(CHECKOUT[pl.name.toLowerCase()], "_blank")}>Start Free Trial</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ TEMPLATES ════ */}
        {page === "templates" && (
          <div className="sec-pad" style={{ padding: "48px 36px 100px" }}>
            <div className={`fi ${vis ? "on" : ""}`} style={{ display: "inline-block", background: "var(--gold-bg)", border: "1px solid #B8860B18", borderRadius: 100, padding: "6px 16px", marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)" }}>Template Shop</span>
            </div>
            <h2 className={`fi d1 ${vis ? "on" : ""}`} style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 400, marginBottom: 12, letterSpacing: "-0.02em" }}>
              Conversion-tested <em>templates</em>
            </h2>
            <p className={`fi d2 ${vis ? "on" : ""}`} style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: 580, marginBottom: 36 }}>
              Landing pages, email flows, and campaign kits built from real results across 25+ fashion brands.
            </p>

            <div className={`fi d3 ${vis ? "on" : ""}`} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
              {allCats.map(c => <button key={c} className={`ftag ${filter === c ? "on" : ""}`} onClick={() => setFilter(c)}>{c}</button>)}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {filtered.map((t, i) => (
                <div key={t.id} className={`tcard fi ${vis ? "on" : ""}`} style={{ transitionDelay: `${i * 0.05}s`, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{t.cat}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {t.hot && <span className="hot-badge">Popular</span>}
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><StarFill /><span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>{t.rating}</span></span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{t.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 14, flex: 1 }}>{t.desc}</p>
                  <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-muted)", background: "var(--bg-warm)", padding: "4px 12px", borderRadius: 100 }}>{t.fmt}</span>
                    <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-muted)", background: "var(--bg-warm)", padding: "4px 12px", borderRadius: 100, display: "flex", alignItems: "center", gap: 4 }}><DlIcon /> {t.dl}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-light)", paddingTop: 18 }}>
                    <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>€{t.price}</span>
                    <button className="btn-dark" style={{ padding: "10px 22px", fontSize: 12, borderRadius: 7 }} onClick={() => addCart(t)}>
                      {cart.find(c => c.id === t.id) ? "Added ✓" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ AI GENERATOR ════ */}
        {page === "generator" && (
          <div className="sec-pad" style={{ padding: "48px 36px 100px" }}>
            <div className={`fi ${vis ? "on" : ""}`} style={{ display: "inline-block", background: "var(--gold-bg)", border: "1px solid #B8860B18", borderRadius: 100, padding: "6px 16px", marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)" }}>AI Ad Copy Generator</span>
            </div>
            <h2 className={`fi d1 ${vis ? "on" : ""}`} style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 400, marginBottom: 12, letterSpacing: "-0.02em" }}>
              Fashion ad copy <em>in seconds</em>
            </h2>
            <p className={`fi d2 ${vis ? "on" : ""}`} style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: 580, marginBottom: 48 }}>
              Powered by the same frameworks behind €2.1M+ in monthly ad spend. Enter your brand details and get conversion-focused copy instantly.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: 40 }}>
              {/* FORM */}
              <div className={`fi d3 ${vis ? "on" : ""}`}>
                <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)", borderRadius: 14, padding: "clamp(24px, 4vw, 36px)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>Configure</span>
                    {freeGens > 0 ? (
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)" }}>
                        {freeGens} free generation{freeGens !== 1 ? "s" : ""} left
                      </span>
                    ) : (
                      <button className="btn-gold" style={{ padding: "8px 16px", fontSize: 11, borderRadius: 6 }}
                        onClick={() => window.open(CHECKOUT.generator, "_blank")}>
                        Upgrade for Unlimited
                      </button>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Brand Name *</label>
                      <input className="ipt" placeholder="e.g. Noirgaze" value={cfg.brandName} onChange={e => setCfg({ ...cfg, brandName: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Product / Collection *</label>
                      <input className="ipt" placeholder="e.g. Midnight Aviator Sunglasses" value={cfg.product} onChange={e => setCfg({ ...cfg, product: e.target.value })} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Category</label>
                        <select className="ipt" value={cfg.category} onChange={e => setCfg({ ...cfg, category: e.target.value })}>{CATS.map(c => <option key={c}>{c}</option>)}</select>
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Ad Type</label>
                        <select className="ipt" value={cfg.adType} onChange={e => setCfg({ ...cfg, adType: e.target.value })}>{AD_TYPES.map(t => <option key={t}>{t}</option>)}</select>
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Tone</label>
                      <select className="ipt" value={cfg.tone} onChange={e => setCfg({ ...cfg, tone: e.target.value })}>{TONES.map(t => <option key={t}>{t}</option>)}</select>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Website URL <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></label>
                      <input className="ipt" placeholder="e.g. noirgaze.com" value={cfg.url} onChange={e => setCfg({ ...cfg, url: e.target.value })} />
                    </div>
                    {freeGens > 0 ? (
                      <button className="btn-dark" style={{ width: "100%", justifyContent: "center", marginTop: 4, padding: "15px 30px" }}
                        disabled={!cfg.brandName || !cfg.product || loading}
                        onClick={doGen}>
                        <SparkIcon />
                        {loading ? "Generating..." : "Generate Ad Copy"}
                      </button>
                    ) : (
                      <button className="btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 4, padding: "15px 30px" }}
                        onClick={() => window.open(CHECKOUT.generator, "_blank")}>
                        Unlock Unlimited Generations — €29/mo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* RESULTS */}
              <div className={`fi d4 ${vis ? "on" : ""}`}>
                {loading ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[1, 2].map(n => (
                      <div key={n} style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)", borderRadius: 14, padding: 32 }}>
                        <div className="shim" style={{ height: 14, width: "50%", marginBottom: 18 }} />
                        <div className="shim" style={{ height: 11, width: "100%", marginBottom: 8 }} />
                        <div className="shim" style={{ height: 11, width: "85%", marginBottom: 8 }} />
                        <div className="shim" style={{ height: 11, width: "70%" }} />
                      </div>
                    ))}
                  </div>
                ) : copies.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)" }}>Generated Copy</span>
                    {copies.map((cp, idx) => (
                      <div key={idx} style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)", borderRadius: 14, padding: "clamp(24px, 3vw, 32px)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)" }}>{cp.label}</span>
                          <button onClick={() => doCopy(cp.text, idx)} style={{
                            background: copied === idx ? "#B8860B10" : "var(--bg-warm)",
                            border: "1px solid " + (copied === idx ? "#B8860B40" : "var(--border)"),
                            color: copied === idx ? "var(--gold)" : "var(--text-secondary)",
                            padding: "6px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer",
                            borderRadius: 6, display: "flex", alignItems: "center", gap: 5,
                            fontFamily: "var(--sans)", transition: "all 0.25s",
                          }}>
                            <CopyIcon /> {copied === idx ? "Copied!" : "Copy"}
                          </button>
                        </div>
                        <pre style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--text)", lineHeight: 1.8, whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                          {cp.text}
                        </pre>
                      </div>
                    ))}

                    {/* UPSELL */}
                    <div style={{ background: "var(--bg-dark)", borderRadius: 14, padding: 28 }}>
                      <p style={{ fontFamily: "var(--serif)", fontSize: 20, color: "#fff", marginBottom: 8, fontStyle: "italic" }}>Want copy that converts at 5.2x ROAS?</p>
                      <p style={{ fontSize: 14, color: "#9e9890", lineHeight: 1.65, marginBottom: 20 }}>
                        These templates give you the structure. Our agency gives you the performance. Let's talk about scaling your brand with managed paid ads.
                      </p>
                      <button className="btn-gold" style={{ fontSize: 12 }}
                        onClick={() => window.open("https://www.fundalmedia.dk/#book", "_blank")}>
                        Book a Strategy Call <ArrowRight />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ border: "2px dashed var(--border)", borderRadius: 14, padding: 52, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div style={{ width: 56, height: 56, borderRadius: 12, background: "var(--bg-warm)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "var(--text-muted)" }}>
                      <SparkIcon />
                    </div>
                    <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>
                      Fill in your brand details and hit generate<br />to see custom ad copy here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "36px 36px", marginTop: 20 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="logo-mark" style={{ width: 22, height: 22, fontSize: 9, borderRadius: 4 }}>F</div>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>© 2026 Fundal Media. All rights reserved.</span>
          </div>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Noerregade 14c, 3300 Frederiksvaerk, Denmark</span>
        </div>
      </footer>
    </div>
  );
}
