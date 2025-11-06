// src/config/siteConfig.js
export const heroImage = "/hero.png";
export const heroTitle = "Transform Your Space with PaintCraft MN";
export const heroSubtitle =
  "Expert interior & exterior painting services across Minnesota. Quality craftsmanship. Lasting beauty.";
export const heroButton = { text: "Get a Free Estimate", link: "/contact" };

export const services = [
  {
    title: "Interior Painting",
    description:
      "Refresh your home's interior with flawless finishes and premium paints that bring warmth and style to any room.",
    href: "/interior",
    img: "/interorTile.png",
    ctas: [{label: "Learn more", href: "/interior"}, {label: "Get quote", href: "/contact"}],
  },
  {
    title: "Exterior Painting",
    description:
      "Boost your home's curb appeal and protect it from Minnesota's harsh weather with durable, professional exterior coatings.",
    href: "/exterior",
    img: "/exteriorTile.png",
    ctas: [{label: "Learn more", href: "/exterior"}, {label: "Get quote", href: "/contact"}],
  },
  {
    title: "Our Work",
    description:
      "See real transformations from recent projects across the Twin Cities.",
    href: "/our-work",
    img: "/ourWorkTile.jpg",
    ctas: [{label: "View gallery", href: "/our-work"}],
  },
  {
    title: "About Us",
    description:
      "Family-owned craftsmanship with a clean, professional process from estimate to final walk-through.",
    href: "/about",
    img: "/aboutTile.jpg",
    ctas: [{label: "Meet the team", href: "/about"}],
  },
];

// NEW: header & footer data with dropdown support
export const navLinks = [
  { 
    label: "Interior", 
    href: "/interior",
    dropdown: [
      { label: "Walls & Ceilings", href: "/interior/walls" },
      { label: "Trim & Molding", href: "/interior/trim" },
      { label: "Cabinets", href: "/interior/cabinets" },
      { label: "Staining", href: "/interior/staining" },
      { label: "Popcorn Texture Removal", href: "/interior/popcorn" },
    ]
  },
  { 
    label: "Exterior", 
    href: "/exterior",
    dropdown: [
      { label: "Siding", href: "/exterior/siding" },
      { label: "Doors & Windows", href: "/exterior/doors" },
      { label: "Trim & Molding", href: "/exterior/trim" },
      { label: "Deck & Fence ", href: "/exterior/deck" },
      { label: "Garage Doors", href: "/exterior/garage" },
      { label: "Stucco & Masonry", href: "/exterior/stucco" },
    ]
  },
  { label: "Our Work", href: "/our-work" },
  { label: "About Us", href: "/about" },
];

export const ctaButton = { label: "Get a Free Estimate", href: "/contact" };

export const company = {
  name: "PaintCraft MN",
  email: "info@paintcraftmn.com",
  phone: "(952) 697-9987",
  address: "Twin Cities, MN",
};

export const socials = [
  { label: "Instagram", href: "https://instagram.com/paintcraftmn" },
];