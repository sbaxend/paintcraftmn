// src/config/serviceThemes.ts
export type ServiceKey =
  | "siding" | "trim" | "deck" | "garage" | "stucco" | "doors";

export type ServiceTheme = {
  title: string;
  subtitle: string;
  slug: ServiceKey;

  color: {
    /** Page background (solid Behr-style) */
    surface: string;          // main page color (solid)
    /** Optional soft gradient overlay for hero edges */
    surfaceGradient?: string; // e.g., "linear-gradient(180deg,#0B1A1F00 0%,#00000033 100%)"
    /** UI / accents */
    primary: string;
    primaryDark: string;
    accent: string;
    onSurface: string;        // text color over surface
    onPrimary: string;        // text on buttons
  };

  heroImage: string;
  /** 900x1200-ish portrait shots look great mixed with 3:2 landscapes */
  photos: string[];          // additional images for the offset grid

  process: string[];         // step-by-step bullets
  benefits: string[];        // value bullets (“why it helps your home”)

  texture?: "paper" | "linen" | "noise" | "none";
  swatches?: { name: string; hex: string }[];
  faq?: { q: string; a: string }[];
};

export const serviceThemes: Record<ServiceKey, ServiceTheme> = {
  siding: {
    title: "Siding Refinishing & Painting",
    subtitle: "Durable, weather-ready protection with a clean, modern finish.",
    slug: "siding",
    color: {
      surface: "#516a66",                  // smokey jade-ish solid
      surfaceGradient: "linear-gradient(180deg,#0000 0%,#0003 100%)",
      primary: "#0E7490",
      primaryDark: "#0B5E74",
      accent: "#F59E0B",
      onSurface: "#F7FAFC",
      onPrimary: "#FFFFFF",
    },
    heroImage: "/services/exterior/siding-hero.jpg",
    photos: [
      "/services/exterior/siding-1.jpg",
      "/services/exterior/siding-2.jpg",
      "/services/exterior/siding-3.jpg"
    ],
    process: [
      "Wash & degloss; scrape and sand failing areas",
      "Spot prime bare wood; seal joints with elastomeric caulk",
      "Spray apply premium exterior coating; back-roll for adhesion",
      "Detail trim & fixtures; final walk-through and touch-ups"
    ],
    benefits: [
      "Seals siding against moisture and freeze–thaw cycles",
      "Elevates curb appeal with modern, uniform color",
      "Extends material lifespan; delays costly replacement",
      "Manufacturer-rated products for Minnesota weather"
    ],
    texture: "noise",
    swatches: [
      { name: "Glacier", hex: "#E8EEF1" },
      { name: "Urban Slate", hex: "#324049" },
      { name: "Cedar Brown", hex: "#6B4A3E" },
    ],
    faq: [
      { q: "How long will it last?",
        a: "On properly prepped siding, 7–10 years is typical with our premium systems." },
      { q: "Spray or brush/roll?",
        a: "We spray for uniform coverage and back-roll high-wear areas for maximum bite." }
    ]
  },

  trim: {
    title: "Exterior Trim & Molding",
    subtitle: "Crisp lines. Weather-sealed details.",
    slug: "trim",
    color: {
      surface: "#364148",
      surfaceGradient: "linear-gradient(180deg,#0000 0%,#0004 100%)",
      primary: "#334155",
      primaryDark: "#1F2937",
      accent: "#60A5FA",
      onSurface: "#F8FAFC",
      onPrimary: "#FFFFFF",
    },
    heroImage: "/services/exterior/trim-hero.jpg",
    photos: [
      "/services/exterior/trim-1.jpg",
      "/services/exterior/trim-2.jpg",
      "/services/exterior/trim-3.jpg"
    ],
    process: [
      "Mask windows, stone, and roof edges",
      "Spot repair wood, fill nail holes, prime repairs",
      "Precision cut-in; two finish coats for depth",
      "Hardware reinstalled; sharp line inspection"
    ],
    benefits: [
      "Sharper architectural lines and contrast",
      "Improved weather seal on vulnerable joints",
      "Protects end-grain and stops early rot",
      "Fast clean refresh without full repaint"
    ],
    texture: "paper",
    swatches: [
      { name: "Warm White", hex: "#F4F4F2" },
      { name: "Stone", hex: "#D3D5D8" },
      { name: "Charcoal", hex: "#2B2F33" },
    ],
  },

  deck: {
    title: "Deck & Fence",
    subtitle: "Weatherproof stains that look great all season.",
    slug: "deck",
    color: {
      surface: "#2b2b29",
      primary: "#92400E",
      primaryDark: "#7C2D12",
      accent: "#22C55E",
      onSurface: "#F7FAFC",
      onPrimary: "#FFFFFF",
    },
    heroImage: "/services/exterior/deck-hero.jpg",
    photos: ["/services/exterior/deck-1.jpg","/services/exterior/deck-2.jpg"],
    process: [
      "Wash, brighten, and neutralize wood",
      "Sand traffic zones; replace failed boards",
      "Apply pro-grade penetrating stain",
      "Second pass on tops/rails for even color"
    ],
    benefits: [
      "Repels water and UV for fewer cracks",
      "Restores warm, natural wood tone",
      "Safer surface underfoot",
      "Easy maintenance re-coats"
    ],
  },

  garage: {
    title: "Garage Doors",
    subtitle: "Curb-appeal boost with durable coatings.",
    slug: "garage",
    color: {
      surface: "#151a22",
      primary: "#1D4ED8",
      primaryDark: "#1E40AF",
      accent: "#F59E0B",
      onSurface: "#E5E7EB",
      onPrimary: "#FFFFFF",
    },
    heroImage: "/services/exterior/garage-hero.jpg",
    photos: ["/services/exterior/garage-1.jpg","/services/exterior/garage-2.jpg"],
    process: [
      "Degrease & degloss factory finish",
      "Prime for adhesion where required",
      "Spray finish for smooth, even sheen",
      "Reinstall seals; cure per spec"
    ],
    benefits: [
      "Instant curb-appeal upgrade",
      "Durable finish resists fingerprints & weather",
      "Matches trim/front door for a cohesive look",
      "Cost-effective alternative to replacement"
    ],
  },

  stucco: {
    title: "Stucco & Masonry",
    subtitle: "Breathable, long-lasting mineral finishes.",
    slug: "stucco",
    color: {
      surface: "#222426",
      primary: "#475569",
      primaryDark: "#334155",
      accent: "#84CC16",
      onSurface: "#F3F4F6",
      onPrimary: "#FFFFFF",
    },
    heroImage: "/services/exterior/stucco-hero.jpg",
    photos: ["/services/exterior/stucco-1.jpg"],
    process: [
      "Crack repair & elastomeric caulk at control joints",
      "Alkaline-tolerant primer",
      "High-build, breathable topcoat",
      "Detail work at stone, sills, fixtures"
    ],
    benefits: [
      "Helps prevent moisture intrusion",
      "Hides hairline cracking with high-build systems",
      "Breathable coating reduces blistering",
      "Modernizes tone without losing texture"
    ],
  },

  doors: {
    title: "Doors & Windows",
    subtitle: "Clean lines and precise masking for a sharp look.",
    slug: "doors",
    color: {
      surface: "#0e1112",
      primary: "#0F766E",
      primaryDark: "#115E59",
      accent: "#F97316",
      onSurface: "#F8FAFC",
      onPrimary: "#FFFFFF",
    },
    heroImage: "/services/exterior/doors-hero.jpg",
    photos: ["/services/exterior/doors-1.jpg","/services/exterior/doors-2.jpg"],
    process: [
      "Remove hardware where possible; mask glass",
      "Sand & prime for bite",
      "Spray finish for factory-smooth look",
      "Reassemble; clean glass; final polish"
    ],
    benefits: [
      "Statement color at the entry",
      "Factory-smooth finish increases perceived quality",
      "Better weather seal extends door life",
      "Ties together trim and garage hues"
    ],
  },
};

export const EXTERIOR_SLUGS: ServiceKey[] = ["siding","trim","deck","garage","stucco","doors"];

export function getServiceTheme(slug: string) {
  return serviceThemes[slug as ServiceKey] ?? null;
}
