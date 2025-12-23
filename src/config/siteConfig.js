// src/config/siteConfig.js
export const heroImage = "/interior-home-tile.png";
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
    img: "/interior-home-tile.png",
    ctas: [{label: "Learn more", href: "/interior"}, {label: "Get quote", href: "/contact"}],
  },
  {
    title: "Exterior Painting",
    description:
      "Boost your home's curb appeal and protect it from Minnesota's harsh weather with durable, professional exterior coatings.",
    href: "/exterior",
    img: "/exterior-hero-minnesota.png",
    ctas: [{label: "Learn more", href: "/exterior"}, {label: "Get quote", href: "/contact"}],
  },
  {
    title: "Transformations",
    description:
      "See real transformations from recent projects across the Twin Cities.",
    href: "/our-work",
    img: "/transformations-before-and-after.png",
    ctas: [{label: "View gallery", href: "/our-work"}],
  },
  {
    title: "Who We Are",
    description:
      "The foundation behind the PaintCraft experience",
    href: "/about",
    img: "/who-we-are.png",
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
      // { label: "Siding", href: "/exterior/siding" },
      { label: "Doors & Windows", href: "/exterior/doors" },
      // { label: "Trim", href: "/exterior/trim" },
      { label: "Deck & Fence ", href: "/exterior/deck" },
      // { label: "Garage Doors", href: "/exterior/garage" },
      { label: "Siding", href: "/exterior/stucco" },
    ]
  },
  { label: "Transformations", href: "/our-work" },
  { label: "Who We Are", href: "/about" },
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
  {label: "Facebook", href: "https://www.facebook.com/people/PaintCraft/61555203220568/"}
];