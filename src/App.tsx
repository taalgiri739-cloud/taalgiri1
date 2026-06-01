import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Story from "./components/Story.tsx";
import Process from "./components/Process.tsx";
import Compare from "./components/Compare.tsx";
import AyurvedicRemedies from "./components/AyurvedicRemedies.tsx";
import Products from "./components/Products.tsx";
import Reviews from "./components/Reviews.tsx";
import CustomerCare from "./components/CustomerCare.tsx";
import CheckoutModal from "./components/CheckoutModal.tsx";
import { Product, CartItem, IMAGES } from "./types.ts";
import { Volume2, VolumeX, ShieldCheck, Heart, ArrowUp, Instagram, Facebook } from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sensory audio loop reference (using beautiful organic dawn forest sounds)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Custom Cursor trailing state for modern premium portal experience
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Detect desktop screen dimensions to enable mouse tracking fluidly
    const checkViewport = () => {
      setIsDesktop(window.innerWidth > 960);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 960) {
        setCoords({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);

    // Initialize lazy audio loop
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2458/2458-84.wav"); // Soft ambient birds
    audioRef.current.loop = true;
    audioRef.current.volume = 0.45;

    return () => {
      window.removeEventListener("resize", checkViewport);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Handle Sensory audio toggle
  const handleToggleAudio = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("User interaction required to unlock sensory loops:", err);
      });
      setAudioPlaying(true);
    }
  };

  // Toggle English / Hindi Language
  const handleToggleLang = () => {
    setLang((prev) => (prev === "EN" ? "HI" : "EN"));
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true); // Auto reveal the cart list so customer has instant visual confirmation
  };

  const handleUpdateQty = (prodId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === prodId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (prodId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== prodId));
  };

  const handleInstantBuy = (product: Product) => {
    handleAddToCart(product);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Scroll to Top anchor
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-[#060503] text-white min-h-screen relative font-sans selection:bg-[#C9A84C] selection:text-black antialiased overflow-x-hidden">
      
      {/* Modern Cursor Trailing Bubble for Desktop viewports */}
      {isDesktop && (
        <div
          className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full border border-[#C9A84C]/35 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out flex items-center justify-center"
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`
          }}
        >
          <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
        </div>
      )}

      {/* Luxury Floating Navigation header bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Core View Modules */}
      <main>
        {/* Apple-style landing section */}
        <Hero lang={lang} />
        
        {/* Story details of local Jharkhand climbers */}
        <Story lang={lang} />

        {/* 4 Steps Traditional wood-fire crystallization timeline details */}
        <Process lang={lang} />

        {/* Market Standard strike-through price comparison tables */}
        <Compare lang={lang} />

        {/* Traditional Healing Remedies & Interactive Home Purity Diagnostic Testing Checker */}
        <AyurvedicRemedies lang={lang} />

        {/* 250g, 500g and 1kg Product Store grids */}
        <Products
          lang={lang}
          onAddToCart={handleAddToCart}
          onInstantBuy={handleInstantBuy}
        />

        {/* Dynamic customer ratings validation blocks */}
        <Reviews lang={lang} />

        {/* Complete Customer Care suite including live chat, order track, lab reports */}
        <CustomerCare lang={lang} />
      </main>

      {/* Parallax Panoramic Footer Details */}
      <footer className="bg-[#0E0C08] border-t border-white/[0.03] pt-20 pb-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={IMAGES.brandLogo}
                alt="Taad-Giri logo footer"
                className="w-12 h-12 rounded-full border border-[#C9A84C]/30 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-serif font-black tracking-widest text-[#FAF3E0] uppercase text-sm">
                  TAAD-GIRI
                </span>
                <span className="text-[7px] tracking-[0.4em] text-[#C9A84C] font-mono">
                  TRADITIONAL MISHRI SOURCING
                </span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 font-light leading-relaxed max-w-sm">
              {lang === "EN" ? (
                "India's finest and most authentic unbleached palm candy (Tal Mishri). Handcrafted by local tribal harvesters in pristine Jharkhand forests, tested independently at each batch to ensure absolute zero adulteration."
              ) : (
                "भारत की सबसे उत्तम और प्रामाणिक अपरिष्कृत ताड़ मिश्री। झारखंड के प्राचीन वनों में स्थानीय आदिवासी पर्वतारोहियों द्वारा निर्मित, प्रत्येक बैच की शुद्धता स्वतंत्र लैब द्वारा प्रमाणित है।"
              )}
            </p>

            {/* Social channels */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                className="w-8 h-8 rounded-full border border-gray-800 hover:border-[#C9A84C]/30 flex items-center justify-center text-gray-500 hover:text-[#C9A84C] transition-all"
                title="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/ronak_bhagat_49?igsh=MWt5cXlyM2FlMjl1Yw=="
                className="w-8 h-8 rounded-full border border-gray-800 hover:border-[#C9A84C]/30 flex items-center justify-center text-gray-500 hover:text-[#C9A84C] transition-all"
                title="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Legal parameters */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[9px] tracking-widest uppercase font-mono text-[#C9A84C] font-bold block mb-4">
              {lang === "EN" ? "Governing Codes" : "शासकीय प्रमाणिकता"}
            </span>
            <ul className="space-y-2 text-xs text-gray-500 font-light">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>FSSAI License: 11112347890</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>Pesticides: 0.00% Verified</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>Arsenic & Lead: 0.00% Zero</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>Gluten & Sugar cane: Excluded</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Regional locations mapping */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[9px] tracking-widest uppercase font-mono text-[#C9A84C] font-bold block mb-4">
              {lang === "EN" ? "Regional Centers" : "क्षेत्रीय संग्रह केंद्र"}
            </span>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              {lang === "EN" ? (
                "Harvesting Clusters: Dumka Forest Division, Deoghar Uplands, Jharkhand, India. Sealed and packed in sanitized direct-D2C modern facilities."
              ) : (
                "संग्रह क्षेत्र: दुमका वन प्रभाग, देवघर हिल्स, झारखंड, भारत। स्वच्छ और वातानुकूलित स्वदेशी पैकेजिंग इकाइयों में सील बंद।"
              )}
            </p>
            <div className="p-4 rounded-sm border border-[#C9A84C]/10 bg-black/40 flex items-center gap-2 justify-center text-xs text-[#FAF3E0] font-serif italic">
               <Heart className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
               <span>{lang === "EN" ? "Made with Native Pride in Jharkhand" : "झारखंड के आदिवासियों द्वारा गर्व निर्मित"}</span>
            </div>
          </div>

        </div>

        {/* Global Bottom Ribbon */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-10 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[9px] font-mono tracking-widest text-[#7A6A50] uppercase text-center sm:text-left">
            © 2026 TAAD-GIRI INDIA. ALL RIGHTS RESERVED. FSSAI REGISTERED GOURMET TRADITIONAL CO.
          </p>
          <div className="flex gap-6 text-[10px] text-[#7A6A50] font-mono tracking-widest uppercase">
            <a href="#story" className="hover:text-[#C9A84C] transition-colors">{lang === "EN" ? "Heritage" : "विरासत"}</a>
            <span>·</span>
            <a href="#products" className="hover:text-[#C9A84C] transition-colors">{lang === "EN" ? "Stall Store" : "स्टोर"}</a>
          </div>
        </div>
      </footer>

      {/* Floating Sensory Audio loop widget on right sidebar */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2.5">
        <button
          onClick={handleToggleAudio}
          className={`p-3 rounded-full border backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
            audioPlaying
              ? "bg-[#C9A84C]/95 border-[#C9A84C] text-[#060503] shadow-[0_5px_15px_rgba(201,168,76,0.35)]"
              : "bg-black/75 border-gray-800 hover:border-gray-700 text-gray-400"
          }`}
          title={audioPlaying ? "Mute Sensor Loop" : "Enable Sensory Sound Loop"}
        >
          {audioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Floating Scroll back to top element */}
      {showScrollTop && (
        <button
          onClick={scrollUp}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-black/70 border border-gray-800 hover:border-[#C9A84C]/45 text-gray-400 hover:text-[#C9A84C] shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Universal Sliding Checkout Drawer */}
      <CheckoutModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        lang={lang}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
