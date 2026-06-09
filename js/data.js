/*
 * ============================================================
 *  MANIKCHAND PAN MASALA - SINGLE SOURCE OF TRUTH
 * ============================================================
 *  Edit EVERYTHING here. The whole website is built from this
 *  one object. You never need to touch index.html.
 *
 *  - Change text, prices, phone numbers, taglines: edit below.
 *  - Add / remove a product: add / remove an item in `products`.
 *  - Add a gallery photo: drop the file in assets/img/ and add
 *    its path to `gallery`.
 * ============================================================
 */

window.SITE_DATA = {
  /* -------- Settings --------
   * protectImages: deter casual image saving (right-click, drag).
   */
  settings: {
    protectImages: true,
  },

  /* -------- Brand -------- */
  brand: {
    name: "Manikchand",
    tm: "\u2122", // ™
    tagline: "Premium Flavoured Pan Masala",
    parent: "Global Manikchand Corporation of India",
    location: "Surat, Gujarat, India",
    logoText: "M",
  },

  /* -------- Taglines (shown on hero) -------- */
  taglines: {
    primaryHi: "\u0935\u0939\u0940 \u0916\u0941\u0936\u092c\u0942, \u0935\u0939\u0940 \u0938\u094d\u0935\u093e\u0926", // वही खुशबू, वही स्वाद
    secondaryHi: "\u092a\u0938\u0902\u0926 \u090a\u0902\u091a\u0947 \u0932\u094b\u0917\u094b\u0902 \u0915\u0940", // पसंद ऊंचे लोगों की
    english: "The same aroma, the same taste \u2014 the choice of the elite.",
  },

  /* -------- Contact -------- */
  contact: {
    tollFree: "1800 5700 365",
    tollFreeRaw: "18005700365",
    whatsapp: "95585 55809",
    whatsappRaw: "919558555809", // used for wa.me links (with country code)
    email: "manikchandpanmasala@gmail.com",
    address: "310, Shubh Universal, Vesu Main Road, Surat - 395007, Gujarat, India.",
    enquiryNote:
      "For any requirement or enquiry, please send your contact number & complete address to our WhatsApp number.",
  },

  /* -------- Statutory warnings (legal) -------- */
  warnings: {
    panMasalaBadge: "No Tobacco \u00b7 No Nicotine",
    panMasalaHealth: "Chewing of Pan Masala is injurious to health.",
    tobaccoHealth: "Warning: Tobacco is injurious to health.",
    minors: "Not for sale to minors.",
    footer:
      "Statutory Warning: Chewing of Pan Masala is injurious to health. Tobacco products are injurious to health. Not for sale to minors. This website is intended for adults only.",
  },

  /* -------- Navigation -------- */
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Quality", href: "#quality" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],

  /* -------- Hero -------- */
  hero: {
    image: "assets/img/hero-banner.jpg",
    kicker: "Legacy of Trust, Taste & Excellence",
    ctaPrimary: { label: "Explore Products", href: "#products" },
    ctaSecondary: { label: "Enquire on WhatsApp", href: "wa" }, // "wa" => auto-built WhatsApp link
  },

  /* -------- About -------- */
  about: {
    heading: "A Legacy of Authenticity & Excellence",
    lead:
      "Manikchand Pan Masala stands among India's most trusted names \u2014 celebrated for its authentic taste, premium quality, and cultural heritage.",
    paragraphs: [
      "Crafted by Global Manikchand Corporation of India, every pack blends time-tested Indian recipes with modern manufacturing standards, ensuring purity, freshness, and satisfaction in every pinch.",
      "From sourcing the finest ingredients to airtight packaging, every step is guided by a passion for perfection. For us, pan masala is more than a blend \u2014 it is an emotion that connects memories and moments.",
      "Guided by visionary leadership, we continue to redefine industry standards and expand our legacy across India and international markets.",
    ],
    stats: [
      { value: "100%", label: "Compostable & Biodegradable Packaging" },
      { value: "ISO 9001", label: "Quality Standards" },
      { value: "25% Extra", label: "In Every Premium Pack" },
      { value: "Pan-India", label: "Trusted Distribution" },
    ],
  },

  /* -------- Products --------
   * badge:       optional ribbon text (e.g. "Coming Soon", "Export Only")
   * warningType: "panmasala" | "tobacco"  (controls warning shown on card)
   * tags:        small pills under the title
   */
  products: [
    {
      id: "premium-pan-masala",
      name: "Manikchand Premium Pan Masala",
      image: "assets/img/premium-pan-masala.jpg",
      price: "\u20b9 10",
      weight: "2.5g \u00b7 25% Extra",
      desc:
        "Our flagship premium flavoured pan masala. A rich, aromatic blend of betelnuts, catechu, lime, menthol & cardamom.",
      tags: ["Flavoured", "Premium"],
      warningType: "panmasala",
    },
    {
      id: "global-manikchand",
      name: "Global Manikchand Pan Masala",
      image: "assets/img/global-manikchand.jpg",
      price: "\u20b9 5",
      weight: "2.5g",
      desc:
        "The signature royal-blue pack delivering the same trusted Manikchand aroma and taste in a value-friendly sachet.",
      tags: ["Flavoured", "Value Pack"],
      warningType: "panmasala",
    },
    {
      id: "mc-oo",
      name: "MC OO Chewing Tobacco",
      image: "assets/img/mc-oo.jpg",
      price: "",
      weight: "",
      desc:
        "Premium quality chewing tobacco from the trusted house of Manikchand, crafted for the discerning connoisseur.",
      tags: ["Tobacco"],
      warningType: "tobacco",
    },
    {
      id: "gutkha",
      name: "Manikchand Gutkha",
      image: "assets/img/gutkha.jpg",
      price: "",
      weight: "",
      desc:
        "Export-quality gutkha in signature gold packaging. Manufactured to international standards.",
      tags: ["Tobacco", "Export Quality"],
      badge: "Export Only",
      warningType: "tobacco",
    },
    {
      id: "sweet-supari",
      name: "Sweet Supari",
      image: "",
      price: "",
      weight: "",
      desc:
        "A delightful sweet supari blend \u2014 a refreshing mouth freshener with a touch of tradition.",
      tags: ["Mouth Freshener", "No Tobacco"],
      warningType: "panmasala",
    },
    {
      id: "mukhwas",
      name: "Mukhwas",
      image: "",
      price: "",
      weight: "",
      desc:
        "An aromatic after-meal mukhwas blend of seeds and spices \u2014 the perfect refreshing finish.",
      tags: ["Mouth Freshener", "No Tobacco"],
      warningType: "panmasala",
    },
    {
      id: "khaini",
      name: "Manikchand Khaini",
      image: "assets/img/khaini.jpg",
      price: "",
      weight: "",
      desc:
        "Premium quality filter tobacco pouches from the trusted house of Manikchand.",
      tags: ["Tobacco", "Filter Pouches"],
      badge: "Coming Soon",
      warningType: "tobacco",
    },
    {
      id: "lights",
      name: "Manikchand Lights",
      image: "assets/img/lights.jpg",
      price: "",
      weight: "100mm \u00b7 Super Slim",
      desc:
        "Slim cigarettes crafted with refined elegance \u2014 a new addition to the Manikchand family.",
      tags: ["Slim Cigarette"],
      badge: "Coming Soon",
      warningType: "tobacco",
    },
  ],

  /* -------- Quality pillars -------- */
  quality: [
    {
      icon: "leaf",
      title: "Finest Ingredients",
      desc:
        "We handpick every ingredient \u2014 betelnuts, catechu, lime, menthol & cardamom \u2014 for purity, aroma and freshness, meeting strict quality benchmarks.",
    },
    {
      icon: "gear",
      title: "Advanced Production & Packaging",
      desc:
        "ISO-certified facilities combine traditional expertise with modern technology, with airtight, 100% compostable packaging that preserves freshness.",
    },
    {
      icon: "shield",
      title: "Safety & Excellence",
      desc:
        "Every batch undergoes stringent quality tests for safety, hygiene and consumer satisfaction, setting new benchmarks in the industry.",
    },
  ],

  /* -------- Gallery (images) -------- */
  gallery: [
    { src: "assets/img/hero-banner.jpg", alt: "Manikchand Premium Pan Masala" },
    { src: "assets/img/global-pack-city.jpg", alt: "Global Manikchand Pan Masala pack" },
    { src: "assets/img/box-sachet.jpg", alt: "Manikchand box and sachet" },
    { src: "assets/img/boxes-table.jpg", alt: "Manikchand and MC OO retail boxes" },
    { src: "assets/img/jute-bags.jpg", alt: "Branded Manikchand jute bags" },
    { src: "assets/img/label.jpg", alt: "Manikchand Pan Masala label" },
  ],

  /* -------- Videos -------- */
  videos: [
    { src: "assets/video/promo-1.mp4", poster: "assets/img/hero-banner.jpg" },
    { src: "assets/video/promo-2.mp4", poster: "assets/img/global-pack-city.jpg" },
  ],

  /* -------- Bank details (B2B) -------- */
  bank: {
    show: true,
    name: "Bank of Baroda",
    accountName: "GLOBAL MANIKCHAND CORPORATION OF INDIA",
    accountNumber: "26470200000271",
    ifsc: "BARB0SAVSUR",
  },

  /* -------- Footer -------- */
  footer: {
    tagline: "Pasand Unche Logo Ki",
    copyright: "Global Manikchand Corporation of India. All rights reserved.",
  },
};
