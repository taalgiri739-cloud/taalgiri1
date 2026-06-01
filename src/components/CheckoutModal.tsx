import React, { useState } from "react";
import { Product, CartItem } from "../types.ts";
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, Truck, ArrowRight, Check } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (prodId: string, delta: number) => void;
  onRemoveItem: (prodId: string) => void;
  lang: "EN" | "HI";
  onClearCart: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  lang,
  onClearCart
}: CheckoutModalProps) {
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  // Checkout Form Details state
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("Jharkhand");
  const [buyingChannel, setBuyingChannel] = useState<"whatsapp" | "direct">("whatsapp");

  // Coupon promo code states
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");
  const [couponError, setCouponError] = useState("");

  if (!isOpen) return null;

  // Compute Prices
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const mrpTotal = cartItems.reduce((acc, item) => acc + item.product.mrp * item.quantity, 0);
  const savings = mrpTotal - subtotal;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const code = couponCode.trim().toUpperCase();
    if (code === "PURE10") {
      setCouponDiscount(Math.round(subtotal * 0.10));
      setAppliedCode("PURE10 (10% OFF)");
    } else if (code === "TAAD50") {
      setCouponDiscount(Math.min(subtotal, 50));
      setAppliedCode("TAAD50 (Flat ₹50 OFF)");
    } else {
      setCouponError(lang === "EN" ? "Invalid or inactive promo code." : "अमान्य या पुराना प्रोमो कोड।");
      setCouponDiscount(0);
      setAppliedCode("");
    }
  };

  const deliveryCharges = (subtotal - couponDiscount) > 499 ? 0 : 50; // Free shipping for orders above 499
  const grandTotal = Math.max(0, subtotal - couponDiscount) + deliveryCharges;

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalWeightGrams = cartItems.reduce((acc, item) => acc + item.product.weightGrams * item.quantity, 0);

  // Trigger Local order submission
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!customerName || !phoneNumber || !address) {
      alert(lang === "EN" ? "Please fill in all details to place order." : "कृपया ऑर्डर देने के लिए सभी फ़ील्ड भरें।");
      return;
    }

    setIsOrdering(true);

    try {
      if (buyingChannel === "whatsapp") {
        // Direct WhatsApp Redirect with elegant formatted pre-populated message
        let itemsMsg = cartItems.map(item => `- ${item.product.name} (Qty: ${item.quantity}) - ₹${item.product.price * item.quantity}`).join("%0A");
        let couponMsg = appliedCode ? `*Coupon Applied:* ${appliedCode} (Saved ₹${couponDiscount})%0A` : "";
        let formattedMsg = `*NEW TAAD-GIRI ORDER* %0A%0A` +
          `*Customer Name:* ${customerName}%0A` +
          `*Mobile No:* ${phoneNumber}%0A` +
          `*Address:* ${address}, ${state}%0A%0A` +
          `*Order Breakdown:* %0A${itemsMsg}%0A%0A` +
          couponMsg +
          `*Total Quantity:* ${totalQuantity}%0A` +
          `*Total Weight:* ${totalWeightGrams / 1000} kg%0A` +
          `*Grand Total Order Value:* *₹${grandTotal}*%0A%0A` +
          `Please verify and provide payment details (UPI/COD). Thank you!`;
        
        window.open(`https://wa.me/918002824861?text=${formattedMsg}`, "_blank", "referrerPolicy=no-referrer");
        
        // Mark as local placed
        setOrderId("TG-" + Math.floor(100000 + Math.random() * 900000));
        setOrderPlaced(true);
        onClearCart();
      } else {
        // Direct backend simulation
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems,
            customerDetails: { customerName, phoneNumber, address, state }
          })
        });
        const resData = await response.json();
        
        if (resData.success) {
          setOrderId(resData.orderId);
          setOrderPlaced(true);
          onClearCart();
        }
      }
    } catch (err) {
      console.error("Error order checkout client:", err);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Semi-transparent slide backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity duration-500"
      />

      {/* Slide drawer container (fixed width) */}
      <div className="relative w-full max-w-lg h-full bg-[#0E0C08] text-white flex flex-col justify-between shadow-[-10px_0_40px_rgba(0,0,0,0.9)] border-l border-white/[0.04] z-10 animate-slide-left">
        
        {/* Drawer Header */}
        <div className="p-6 md:p-8 border-b border-white/[0.03] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#C9A84C]" />
            <h3 className="font-serif font-semibold text-lg md:text-xl">
              {lang === "EN" ? "Your Gourmet Cart" : "आपका मिठास थैला"}
            </h3>
            {totalQuantity > 0 && (
              <span className="font-mono text-xs bg-[#C9A84C] text-black px-2 py-0.5 rounded-full font-bold">
                {totalQuantity}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:text-white hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic Inner body layout */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Order Completed Success view */}
          {orderPlaced ? (
            <div className="text-center py-12 px-4 space-y-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500 text-green-400 flex items-center justify-center mb-2 animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-semibold text-white">
                {lang === "EN" ? "Order Sourced Securely!" : "ऑर्डर सफलतापूर्वक भेजा गया!"}
              </h4>
              <p className="text-xs text-gray-400 max-w-sm leading-relaxed mx-auto">
                {buyingChannel === "whatsapp" ? (
                  lang === "EN" ? (
                    `Your order (ID: ${orderId}) has been successfully compiled and pre-filled in your WhatsApp. Please send the message on our direct chat to initiate packing & receipt.`
                  ) : (
                    `ऑर्डर (ID: ${orderId}) तैयार है। आपके WhatsApp पर सन्देश प्रेषित किया गया है, कृपया चैट पर भेजें ताकि पैकेजिंग आरंभ हो सके।`
                  )
                ) : (
                  lang === "EN" ? (
                    `Simulated order generated successfully with ID: ${orderId}. Sourced Jharkhand team will contact you shortly on mobile.`
                  ) : (
                    `सिम्युलेटेड ऑर्डर ID: ${orderId} स्वीकृत हुआ। हमारी टीम जल्द ही आपसे संपर्क करेगी।`
                  )
                )}
              </p>
              <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-sm w-full font-mono text-[10px] text-gray-500 text-center tracking-widest uppercase">
                TAAD-GIRI CERTIFIED ORDER BLOCK CHAIN # {orderId}
              </div>
              <button
                onClick={() => {
                  setOrderPlaced(false);
                  onClose();
                }}
                className="w-full py-4 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-black font-mono font-bold text-xs tracking-widest uppercase rounded-sm hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all cursor-pointer"
              >
                {lang === "EN" ? "Keep Exploring Purity" : "और खरीददारी करें"}
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="text-center py-20 text-gray-600 space-y-4">
              <ShoppingBag className="w-16 h-16 mx-auto stroke-1" />
              <p className="font-serif text-sm italic">
                {lang === "EN" ? "Your cart list is blank." : "आपका थैला खाली है।"}
              </p>
              <button
                onClick={onClose}
                className="text-xs text-[#C9A84C] font-mono tracking-widest uppercase hover:underline"
              >
                {lang === "EN" ? "Browse Premium Stalls" : "मिश्री संग्रह देखें"}
              </button>
            </div>
          ) : (
            /* Cart Items List & Sourcing form */
            <div className="space-y-8">
              
              {/* Product item lineup details */}
              <div className="space-y-4">
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#C9A84C] block uppercase">
                  {lang === "EN" ? "Review Selected Sizes" : "चुनी गई उत्पाद श्रेणियां"}
                </span>

                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between gap-4 p-4 border border-white/[0.02] bg-white/[0.01] hover:bg-white/[0.02] hover:border-[#C9A84C]/15 transition-all duration-300 rounded-sm"
                  >
                    {/* Item Image left */}
                    <img
                      src={item.product.imageName}
                      alt={item.product.name}
                      className="w-14 h-14 object-contain filter drop-shadow-lg"
                      referrerPolicy="no-referrer"
                    />

                    {/* Quantity controls middle */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-white leading-tight">
                          {lang === "EN" ? item.product.name : item.product.hindiName}
                        </h4>
                        <span className="text-[10px] text-gray-500 font-mono tracking-wider mt-1 block">
                          Weight: {item.product.weightLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border border-gray-800 rounded-sm">
                          <button
                            onClick={() => onUpdateQty(item.product.id, -1)}
                            className="p-1 px-2.5 text-gray-500 hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs text-center min-w-6 text-white leading-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.product.id, 1)}
                            className="p-1 px-2.5 text-gray-500 hover:text-white transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="flex items-center gap-1 text-[10px] text-red-500/75 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span className="font-mono font-medium tracking-widest uppercase">
                            Delete
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Price right */}
                    <div className="text-right">
                      <span className="font-serif text-sm font-bold text-[#C9A84C]">
                        ₹{item.product.price * item.quantity}
                      </span>
                      <span className="text-[10px] text-gray-600 line-through font-sans block mt-1">
                        ₹{item.product.mrp * item.quantity}
                      </span>
                    </div>

                  </div>
                ))}
              </div>

              {/* Sourcing Dynamic Delivery Progress Milestone */}
              <div className="p-4 border border-white/[0.03] bg-[#14110C] rounded-sm space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-wider">
                  <span className="text-gray-400">
                    {(subtotal - couponDiscount) > 499 ? (
                      <span className="text-green-400 flex items-center gap-1 font-bold">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        {lang === "EN" ? "FREE DELIVERY UNLOCKED!" : "मुफ़्त डिलीवरी अनलॉक हो गई!"}
                      </span>
                    ) : (
                      <span>
                        {lang === "EN" ? "Add " : "मुफ़्त शिपिंग के लिए "}
                        <span className="text-[#C9A84C] font-bold">₹{499 - (subtotal - couponDiscount)}</span>
                        {lang === "EN" ? " more for FREE Delivery" : " और जोड़ें"}
                      </span>
                    )}
                  </span>
                  <span className="text-gray-500 font-bold">
                    {Math.min(100, Math.round(((subtotal - couponDiscount) / 499) * 100))}%
                  </span>
                </div>
                <div className="w-full h-1 bg-black rounded-full overflow-hidden border border-white/[0.02]">
                  <div 
                    className="h-full bg-gradient-to-r from-[#C9A84C] to-[#FAF3E0] transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, ((subtotal - couponDiscount) / 499) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Sourcing credentials form */}
              <form onSubmit={handleSubmitOrder} className="space-y-4 pt-4 border-t border-white/[0.03]">
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#C9A84C] block uppercase mb-4">
                  {lang === "EN" ? "Secure Delivery Credentials" : "सुरक्षित शिपिंग क्रेडेंशियल"}
                </span>

                {/* Consumer Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                    {lang === "EN" ? "Customer Name" : "आपका नाम"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={lang === "EN" ? "E.g., Dr. Shastry" : "जैसे- डॉ शास्त्री"}
                    className="w-full bg-black/60 border border-gray-800 focus:border-[#C9A84C] text-sm text-white px-4 py-3 outline-none rounded-sm transition-all placeholder:text-gray-700 font-sans"
                  />
                </div>

                {/* Mobile number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                    {lang === "EN" ? "WhatsApp Contact Number" : "व्हाट्सएप मोबाइल नंबर"} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="E.g., +91 98765 43210"
                    className="w-full bg-black/60 border border-gray-800 focus:border-[#C9A84C] text-sm text-white px-4 py-3 outline-none rounded-sm transition-all placeholder:text-gray-700 font-mono"
                  />
                </div>

                {/* State selections */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                    {lang === "EN" ? "Region / State" : "राज्य"} *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-black/60 border border-gray-800 focus:border-[#C9A84C] text-sm text-white px-4 py-3 outline-none rounded-sm transition-all"
                  >
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="TamilNadu">Tamil Nadu</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>

                {/* Full Address details */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                    {lang === "EN" ? "Complete Delivery Address" : "पता"} *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={lang === "EN" ? "Street details, pincode, landmarks..." : "गली, मोहल्ला, लैंडमार्क और पिनकोड..."}
                    className="w-full bg-black/60 border border-gray-800 focus:border-[#C9A84C] text-sm text-white px-4 py-3 outline-none rounded-sm transition-all placeholder:text-gray-700 font-sans resize-none"
                  />
                </div>

                {/* Sourcing routing path toggle */}
                <div className="pt-4 flex flex-col gap-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                    {lang === "EN" ? "Preferred Order Method" : "ऑर्डर विधि चुनें"}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* WhatsApp prefilled toggle */}
                    <button
                      type="button"
                      onClick={() => setBuyingChannel("whatsapp")}
                      className={`p-3 border text-xs font-mono tracking-wider uppercase rounded-sm flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        buyingChannel === "whatsapp"
                          ? "border-green-500 text-green-400 bg-green-500/[0.02]"
                          : "border-gray-800 hover:border-gray-700 text-gray-400"
                      }`}
                    >
                      <span className="font-bold">WhatsApp Direct</span>
                      <span className="text-[8px] opacity-70">Pre-fill chat note</span>
                    </button>

                    {/* Direct Website Confirmation */}
                    <button
                      type="button"
                      onClick={() => setBuyingChannel("direct")}
                      className={`p-3 border text-xs font-mono tracking-wider uppercase rounded-sm flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        buyingChannel === "direct"
                          ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/[0.02]"
                          : "border-gray-800 hover:border-gray-700 text-gray-400"
                      }`}
                    >
                      <span className="font-bold">Offline COD Buy</span>
                      <span className="text-[8px] opacity-70">Direct placement</span>
                    </button>

                  </div>
                </div>

              </form>
            </div>
          )}
        </div>

        {/* Pricing calculations footer */}
        {cartItems.length > 0 && !orderPlaced && (
          <div className="p-6 md:p-8 bg-[#181410] border-t border-white/[0.04] space-y-5">
            
            {/* Interactive Coupon Entry bar */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                {lang === "EN" ? "Have a Promo Coupon?" : "प्रोमो कूपन कोड"}
              </label>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder={lang === "EN" ? "E.g., PURE10 or TAAD50" : "जैसे- PURE10 या TAAD50"}
                  className="flex-grow bg-black/60 border border-gray-800 focus:border-[#C9A84C] text-xs text-white px-3 py-2 outline-none rounded-sm font-mono uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C9A84C] hover:bg-[#FAF3E0] text-black text-[10px] font-mono font-bold tracking-wider rounded-sm uppercase transition-all cursor-pointer whitespace-nowrap"
                >
                  {lang === "EN" ? "Apply" : "लागू करें"}
                </button>
              </form>

              {/* Quick coupons chips */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono">
                <button
                  type="button"
                  onClick={() => {
                    setCouponCode("PURE10");
                    setCouponDiscount(Math.round(subtotal * 0.10));
                    setAppliedCode("PURE10 (10% OFF)");
                    setCouponError("");
                  }}
                  className={`px-2.5 py-1 text-[9px] rounded-sm border transition-all cursor-pointer ${
                    appliedCode.includes("PURE10")
                      ? "bg-[#C9A84C] border-[#C9A84C] text-black font-bold"
                      : "border-gray-800 border-dashed hover:border-[#C9A84C]/50 text-gray-400 hover:text-white"
                  }`}
                >
                  🏷️ PURE10 (10%)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCouponCode("TAAD50");
                    setCouponDiscount(Math.min(subtotal, 50));
                    setAppliedCode("TAAD50 (Flat ₹50 OFF)");
                    setCouponError("");
                  }}
                  className={`px-2.5 py-1 text-[9px] rounded-sm border transition-all cursor-pointer ${
                    appliedCode.includes("TAAD50")
                      ? "bg-[#C9A84C] border-[#C9A84C] text-black font-bold"
                      : "border-gray-800 border-dashed hover:border-[#C9A84C]/50 text-gray-400 hover:text-white"
                  }`}
                >
                  🏷️ TAAD50 (₹50)
                </button>
              </div>
              
              {couponError && (
                <p className="text-[10px] text-red-400 font-mono">{couponError}</p>
              )}
              
              {appliedCode && (
                <div className="flex items-center justify-between p-2.5 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-mono rounded-sm">
                  <span>Code Active: {appliedCode}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCouponDiscount(0);
                      setAppliedCode("");
                      setCouponCode("");
                    }}
                    className="text-red-400 hover:text-red-300 font-bold px-1"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="h-[1px] bg-white/[0.04]" />

            {/* Price lines */}
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs text-gray-400">
                <span>{lang === "EN" ? "Cart Total" : "थैला कुल मूल्य"}</span>
                <span className="font-mono">₹{mrpTotal}</span>
              </div>
              <div className="flex justify-between text-xs text-green-400">
                <span>{lang === "EN" ? "Exclusive Sourced Savings" : "आपकी कुल बचत"}</span>
                <span className="font-mono">-₹{savings}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-xs text-green-400 border-b border-green-500/5 pb-2">
                  <span>{lang === "EN" ? "Applied Coupon Discount" : "प्रोमो कोड डिस्काउंट"}</span>
                  <span className="font-mono">-₹{couponDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-xs text-gray-400 items-center">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-gray-500" />
                  <span>{lang === "EN" ? "Secure Shipping Weight" : "डिलीवरी शुल्क"}</span>
                </span>
                <span className="font-mono text-gray-400 flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 uppercase font-mono">({totalWeightGrams / 1000} kg)</span>
                  <span>{deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}</span>
                </span>
              </div>
              
              <div className="h-[1px] bg-white/[0.04] py-1" />

              <div className="flex justify-between items-baseline">
                <span className="font-serif text-sm font-semibold">{lang === "EN" ? "Grand Final Value:" : "कुल अंतिम मूल्य:"}</span>
                <span className="font-serif text-3xl font-black text-[#C9A84C]">₹{grandTotal}</span>
              </div>
            </div>

            {/* Check out button with indicators */}
            <button
              onClick={handleSubmitOrder}
              disabled={isOrdering}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 text-black font-mono font-bold text-xs tracking-widest uppercase rounded-sm hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{isOrdering ? "Securing Placement..." : buyingChannel === "whatsapp" ? "REDIRECTING TO WHATSAPP" : "COMPLETE OFFLINE PURCHASE"}</span>
              {!isOrdering && <ArrowRight className="w-3.5 h-3.5" />}
            </button>

            {/* Small trust banner footer */}
            <div className="flex items-center gap-2 justify-center text-[10px] text-gray-500">
              <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
              <span>{lang === "EN" ? "Double Lab Certified" : "डबल लैब प्रमाणित"} · Safe Checkout Direct</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
