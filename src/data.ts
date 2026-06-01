import { Product, Review, IMAGES } from "./types.ts";

export const PRODUCTS: Product[] = [
  {
    id: "tg-250",
    name: "Taad-Giri Premium Tal Mishri - 250g Jar",
    hindiName: "ताड़-गिरी प्रीमियम ताल मिश्री - २५० ग्राम",
    weightGrams: 250,
    weightLabel: "250g Hermetic Jar",
    price: 299,
    mrp: 399,
    rating: 4.85,
    ratingCount: 142,
    description: "Handcrafted unrefined Palm Candy crystallised using authentic Palmyra sap. Preserved in an airtight premium white-gold high-density jar. Complete with minerals, trace elements, and low glycemic index.",
    hindiDescription: "ताड़ के रस से पारंपरिक विधि द्वारा बनाई गई १००% शुद्ध और प्राकृतिक मिश्री। सुंदर और वायुरुद्ध प्रीमियम सफेद-सुनहरे जार में। विटामिन और खनिजों से भरपूर।",
    benefits: [
      "100% Pure Palmyra sap source",
      "No chemical bleaching or carbonation",
      "Low Glycemic Index (GI ~35)",
      "Excellent remedy for cough, cold, and throat irritation",
      "Sourced directly from pristine Jharkhand forests"
    ],
    imageName: IMAGES.productJarsLineup, // Lineup image shows beautiful jar collection
    tag: "Popular Choice",
    inStock: true
  },
  {
    id: "tg-500",
    name: "Taad-Giri Premium Tal Mishri - 500g Signature Jar",
    hindiName: "ताड़-गिरी प्रीमियम ताल मिश्री - ५०० ग्राम जार",
    weightGrams: 500,
    weightLabel: "500g Family Jar",
    price: 499,
    mrp: 699,
    rating: 4.92,
    ratingCount: 318,
    description: "Our signature customer favorite. Provides authentic golden-brown palm candy crystals packed with Vitamin B12, Iron, and Zinc. Highly recommended by top Ayurvedic practitioners for everyday health.",
    hindiDescription: "हमारा सबसे लोकप्रिय प्रोडक्ट। ताजे ताड़ रस से तैयार गहरे सुनहरे क्रिस्टल जो विटामिन बी१२, आयरन और जिंक से समृद्ध हैं। दैनिक स्वास्थ्य के लिए आयुर्वेदिक चिकित्सकों की पहली पसंद।",
    benefits: [
      "Double certified purity standards",
      "Rich in Iron, Magnesium, and Potassium",
      "Zero refined sugar or added glucose",
      "Sustained organic energy release without sugar crash",
      "Traceable back to specific harvesting clusters via QR code"
    ],
    imageName: IMAGES.productJarsLineup,
    tag: "Best Value",
    inStock: true
  },
  {
    id: "tg-1000",
    name: "Taad-Giri Premium Tal Mishri - 1kg Eco-Pouch",
    hindiName: "ताड़-गिरी प्रीमियम ताल मिश्री - १ किलोग्राम पौच",
    weightGrams: 1000,
    weightLabel: "1kg Resealable Matte Pouch",
    price: 899,
    mrp: 1299,
    rating: 4.96,
    ratingCount: 524,
    description: "Specially packed in our high-end matte composite stand-up pouch with resealable zip lock. Transparent window lets you admire the hand-broken, sun-dried pure sugar stones. Ideal for complete family culinary use.",
    hindiDescription: "जिप-लॉक और पारदर्शी खिड़की वाले हमारे प्रीमियम मैट पाउच में सुरक्षित। हाथों से तोड़े गए शानदार सुनहरे पत्थरों जैसे क्रिस्टल। पूरे परिवार की रसोई के लिए उत्तम स्वास्थ्य विकल्प।",
    benefits: [
      "Extra eco-friendly resealable zip-lock pouch",
      "Economical bulk pack for gourmet kitchens and households",
      "Assured batch-level laboratory reports",
      "Naturally cooled crystallization for premium flavor profiles",
      "Direct profit share sent back to Jharkhand's tribal climbers"
    ],
    imageName: IMAGES.productPouch, // Specific pouch image
    tag: "Premium Pack",
    inStock: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Dr. Alok Nath Shastry",
    location: "Varanasi, UP",
    rating: 5,
    date: "2026-04-18",
    comment: "As an Ayurvedic practitioner, I had stopped recommending market-bought 'Tal Mishri' because 90% of it is just sulfur-bleached sugar. Taad-Giri is the first brand I've tested that passes all purity criteria. The mineral profile is outstanding! Unbleached, unadulterated, and exceptionally soothing for respiratory ailments.",
    hindiComment: "एक आयुर्वेदाचार्य होने के नाते, मैंने बाजार की 'ताल मिश्री' की सलाह देना बंद कर दिया था क्योंकि वह ब्लीच की हुई चीनी होती है। ताड़-गिरी पहली मिश्री है जो शुद्धता की सभी कसौटियों पर खरी उतरी है।",
    verified: true,
    source: "Amazon",
    avatarText: "AS"
  },
  {
    id: "r2",
    author: "Meenakshi Sundaram",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    date: "2026-05-02",
    comment: "This is exactly what our grandmother used to give us! Beautiful golden-brown irregular crystals, not white translucent squares. It has a gorgeous earthy caramel-like melt-in-mouth finish. Yes, it costs more than normal candy, but the difference in quality and organic harvesting is luxury at its best. Packaging is beautiful too.",
    hindiComment: "यह बिल्कुल वैसा ही स्वाद है जो हमारी दादी हमें बचपन में देती थीं! गहरे सुनहरे क्रिस्टल और सोंधी खुशबू। उत्तम पैकेजिंग और लाजवाब गुणवत्ता।",
    verified: true,
    source: "Flipkart",
    avatarText: "MS"
  },
  {
    id: "r3",
    author: "Rohan Bhagat",
    location: "Ranchi, Jharkhand",
    rating: 5,
    date: "2026-05-11",
    comment: "Proud to see such a high-end luxury brand originating from our state of Jharkhand. Sourced directly from local tribal climbers. The QR code on my jar traced it straight to the Dumka region harvest cluster. Pure organic ghee, clean local operations, FSSAI certified. Absolutely zero chemical smell, pure natural sweetness.",
    hindiComment: "हमारे झारखंड की इस उत्कृष्ट पहल पर गर्व है। हमारे स्थानीय आदिवासियों द्वारा निकाले गए शुद्ध ताड़ रस से तैयार। क्यूआर कोड से पूरी प्रमाणिकता मिलती है।",
    verified: true,
    source: "WhatsApp",
    avatarText: "RB"
  },
  {
    id: "r4",
    author: "Kareena Kapoor Mehta",
    location: "Bandra, Mumbai",
    rating: 5,
    date: "2026-05-24",
    comment: "Using this as a strict replacement for refined cane sugar in my toddlers' diet. It dissolves quickly, tastes incredibly premium, and contains essential minerals. The jars look extremely chic in my high-end pantry. Nike-level obsession with product detailing. Kudos, team!",
    hindiComment: "रिफाइंड चीनी के स्थान पर बच्चों के लिए उपयुक्त। स्वाद में लाजवाब और पोषक तत्वों से भरपूर। सुंदर कांच जैसे जार रसोईघर की शोभा बढ़ाते हैं।",
    verified: true,
    source: "Direct Website",
    avatarText: "KK"
  }
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Dawn Harvesting",
    hindiTitle: "सूर्योदय से पूर्व संग्रह",
    subtitle: "Tapped at 4:00 AM",
    description: "Skilled tribal climbers scale 40-foot Palmyra palms in Jharkhand to tap fresh nectar (Neera) before sunrise, preserving its delicate enzymes from heat degradation.",
    hindiDescription: "झारखंड के कुशल पर्वतारोही तड़के ४ बजे ४० फीट ऊंचे ताड़ के पेड़ों पर चढ़कर मीठा रस (नीरा) इकट्ठा करते हैं, ताकि सूर्य की गर्मी से इसके गुण नष्ट न हों।",
    img: IMAGES.harvesterClimbing
  },
  {
    step: "02",
    title: "Traditional Filtration",
    hindiTitle: "पारंपरिक धुंध छनाई",
    subtitle: "Organic Cloth Screened",
    description: "The fresh sap is filtered using clean high-density organic cotton fabrics on-site to remove any natural residues, keeping the liquid 100% natural and additive-free.",
    hindiDescription: "एकदम ताजा रस महीन खादी सूती कपड़ों से कई बार छाना जाता है। रासायनिक फिल्ट्रेशन से रहित, शत-प्रतिशत प्राकृतिक और शुद्ध।",
    img: IMAGES.harvesterClayPots
  },
  {
    step: "03",
    title: "Slow Fire Boiler",
    hindiTitle: "मंदी आंच पर पकाना",
    subtitle: "48-Hour Wood-Firing",
    description: "Cooked slowly in giant traditional iron cauldrons over firewood. The sap concentration undergoes caramelization, deepening into a beautiful golden-brown thick syrup.",
    hindiDescription: "विशाल लोहे के कड़ाहे में मंदी लकड़ी की आंच पर ४८ घंटों तक उबाला जाता है। रस गाढ़ा होकर गहरे सुनहरे कैरेमल सिरप का रूप ले लेता है।",
    img: IMAGES.boilingSapCauldron
  },
  {
    step: "04",
    title: "Natural Crystallization",
    hindiTitle: "प्राकृतिक क्रिस्टलीकरण",
    subtitle: "Purity Sealed with Traceability",
    description: "Poured into earthen cooling tubs where golden crystals slowly crystallize over 21 days. Hand-sorted, lab-validated for pesticides, and sealed with a trace QR code.",
    hindiDescription: "मिट्टी के कुंडों में २१ दिनों तक ठंडा होने छोड़ा जाता है। हाथों से चुने गए सुनहरे मिठास के क्रिस्टल, जिन पर अंकित लैब रिपोर्ट को क्यूआर से देखा जा सकता है।",
    img: IMAGES.mishriInBowl
  }
];

export const COMPARISONS = [
  {
    feature: "Pure Palmyra Sap Origin",
    taadgiri: "100% Guaranteed Native Palmyra",
    cheapBrands: "Artificial sugar syrup + colors",
    regularSugar: "Refined sugar cane extract",
    positive: true
  },
  {
    feature: "Chemical Bleaching (Sulfur)",
    taadgiri: "Absolutely Zero — Pure Natural",
    cheapBrands: "Heavy sulfur bleaching used",
    regularSugar: "Processed with sulfur dioxide",
    positive: true
  },
  {
    feature: "Glycemic Index",
    taadgiri: "Very Low (GI ~35) — Diabetic Aware",
    cheapBrands: "Spikes blood sugar levels (GI ~68)",
    regularSugar: "Very High (GI ~65) causes crash",
    positive: true
  },
  {
    feature: "Laboratory Batch Testing",
    taadgiri: "Certified every batch for zero toxins",
    cheapBrands: "No food safety check or certification",
    regularSugar: "Standard bulk industrial tests",
    positive: true
  },
  {
    feature: "Traceability QR Code",
    taadgiri: "Yes — Scan to see actual grove & test",
    cheapBrands: "Complete mystery of origin",
    regularSugar: "Mass manufactured, untraceable",
    positive: true
  },
  {
    feature: "Natural Mineral Retained",
    taadgiri: "High Iron, Potassium, B-Vitamins",
    cheapBrands: "Stripped completely during heat-boil",
    regularSugar: "Calculated empty calories (Zero)",
    positive: true
  }
];
