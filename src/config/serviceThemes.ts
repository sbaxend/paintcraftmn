// src/config/serviceThemes.ts
export type ServiceKey =
  | "trim" | "deck" | "garage" | "stucco" | "doors";

export type SubFeature = {
  id: string;
  label: string;      // e.g. "Windows"
  modalTitle: string; // title in the big bubble
  modalBody: string;  // detailed copy in the bubble
  img?: string;       // optional image for this feature
};

export type ServiceTheme = {
  title: string;
  subtitle: string;
  slug: ServiceKey;

  color: {
    surface: string;
    surfaceGradient?: string;
    primary: string;
    primaryDark: string;
    accent: string;
    onSurface: string;
    onPrimary: string;
  };

  heroImage: string;
  photos: string[];

  process: string[];
  benefits: string[];

  texture?: "paper" | "linen" | "noise" | "none";
  swatches?: { name: string; hex: string }[];
  faq?: { q: string; a: string }[];

  /** Apple-style detail cards for this service */
  subFeatures?: SubFeature[];
};

export const serviceThemes: Record<ServiceKey, ServiceTheme> = {
  trim: {
    title: "Exterior Trim & Molding",
    subtitle: "Crisp lines. Weather-sealed details.",
    slug: "trim",
    color: {
      surface: "#34424A",
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
    subFeatures: [
      {
        id: "trim-detail",
        label: "Detailed Trim Work",

        modalTitle: "Trim: The Finishing Lines of Your Exterior",
        modalBody:
          "We sand and spot-prime worn areas, tighten joints, and use high-build coatings to smooth imperfections. The result is trim that looks crisp from the street and stands up to sun, snow, and storms.",
        img: "/trim_serviceTile.png",
      },
    ],
  },

  deck: {
    title: "Deck & Fence",
    subtitle: "Weatherproof stains that look great all season.",
    slug: "deck",
    color: {
      surface: "#AEBDBB",
      primary: "#92400E",
      primaryDark: "#7C2D12",
      accent: "#22C55E",
      onSurface: "#F7FAFC",
      onPrimary: "#FFFFFF",
    },
    heroImage: "/services/exterior/deck-hero.jpg",
    photos: [
      "/services/exterior/deck-1.jpg",
      "/services/exterior/deck-2.jpg"
    ],
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
    subFeatures: [
  {
    id: "deck-boards",
    label: "Decks",
    modalTitle: "A smooth, restored deck with lasting protection.",
    modalBody: `
We begin sanding the surfaces to remove weathered wood and create a smooth, even base, detailing spindles and railings. The deck is then cleaned and brightened to open the grain and ensure the stain bonds properly. Once prepped, we apply a premium stain for rich color and long-lasting protection.`,
    img: "/minnesota-deck.png",
  },

  {
    id: "fence-staining",
    label: "Fences",
    modalTitle: "A renewed fence, sealed against time and weather",
    modalBody: `
We begin by restoring the wood with a thorough washing. Then comes the sanding to remove buildup, weathering, and raised grain. Right after sanding we use a wood brightener to remove dark spots and enrich the natural color of the wood.  Once the fence is clean, dry, and smooth, we apply a professional-grade stain to enhance the natural character of the wood while providing deep, lasting protection against the elements. The result is a refreshed fence with rich color, even coverage, and long-term durability.`,
    img: "/minneapolis-fence.png",
  },
]

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
    photos: [
      "/services/exterior/garage-1.jpg",
      "/services/exterior/garage-2.jpg"
    ],
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
    // no subFeatures yet – easy to add later
  },

  stucco: {
    title: "Siding",
    subtitle: "Breathable, long-lasting mineral finishes.",
    slug: "stucco",
    color: {
      surface: "#7B7F61",
      primary: "#475569",
      primaryDark: "#334155",
      accent: "#84CC16",
      onSurface: "#F3F4F6",
      onPrimary: "#FFFFFF",
    },
    heroImage: "/services/exterior/stucco-hero.jpg",
    photos: [
      "/services/exterior/stucco-1.jpg"
    ],
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
    subFeatures: [
  {
    id: "siding-full",
    label: "Siding",
    modalTitle: "Renewed siding, protected for years to come",
    modalBody: `
Every lasting finish begins beneath the surface. We carefully wash, sand, and refine the siding, removing what time has worn away and restoring what remains. Once the surface is clean, dry, and properly prepared, we apply professional-grade coatings that bond deeply and stand up to the seasons. The result is a refined exterior, with the purpose to last.`,
    img: "/minnesota-siding.png",
  },

  {
    id: "trim-detail",
    label: "Trim",
    modalTitle: "Contrast that cleans the lines and elevates the home",
    modalBody: `
We clean, scrape, sand, and repair each surface to true the edges and restore crisp profiles. With the groundwork complete, we apply high-performance exterior coatings using controlled, precise technique to maintain sharp lines and even coverage. The result is trim that creates contrast, defines the home, and holds its finish season after season.`,
    img: "/exterior-trim-minnesota.png",
  },
]


  },

  doors: {
    title: "Doors & Windows",
    subtitle: "Clean lines and precise masking for a sharp look.",
    slug: "doors",
    color: {
      surface: "#4F5152",
      primary: "#0F766E",
      primaryDark: "#115E59",
      accent: "#F97316",
      onSurface: "#F8FAFC",
      onPrimary: "#FFFFFF",
    },
    heroImage: "/services/exterior/doors-hero.jpg",
    photos: [
      "/services/exterior/doors-1.jpg",
      "/services/exterior/doors-2.jpg"
    ],
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
    subFeatures: [
  {
    id: "doors",
    label: "Doors",
    modalTitle: "Doors: Bold, Smooth, Long-Lasting",
    modalBody: `
Our exterior door painting process begins by protecting nearby surfaces, then cleaning, sanding, and making necessary repairs to the door for a smooth, even base. We prime any bare or weathered areas and apply two coats of exterior grade paint for a durable, long-lasting finish. Once cured, we reinstall hardware, inspect every detail, and complete any final touch-ups leaving your door refreshed and protected.`,
    img: "/exterior-door.png",
  },

  {
    id: "windows",
    label: "Windows",
    modalTitle: "Windows: Clean lines, Protected, Weather-Ready",
    modalBody: `
Our exterior window painting process begins by protecting surrounding siding and trim, then scraping any loose paint, sanding, and repairing the window surfaces for a smooth, even base. We prime any bare or weathered areas and apply two coats of exterior grade paint for a durable, long-lasting finish. Once cured, we remove masking, inspect every detail, and complete any final touch-ups leaving your windows sharp, refreshed, and protected from the elements.`,
    img: "/exterior-window.png",
  },

  {
    id: "garage",
    label: "Garage",
    modalTitle: "Garage Doors: Beautifully Painted to Blend Seamlessly With Your Home’s Style",
    modalBody: `
We start by pressure washing the garage door to remove dirt, dust, and buildup so the paint can bond properly. Once clean, we sand the surface lightly to ensure better adhesion. From there, we mask surrounding areas, siding, trim, concrete, and any hardware to protect your home from overspray and keep the job site clean. Once prep is complete, we apply two coats of paint for a smooth, factory-level finish. After the final coat dries, we remove all masking, inspect the finish, and make any necessary touch-ups. The result is a clean, consistent, long-lasting garage door finish that elevates your curb appeal.`,
    img: "/garage-door.png", // replace with your real asset
  },
]

  },
};

export const EXTERIOR_SLUGS: ServiceKey[] = [
  "trim","deck","garage","stucco","doors"
];

export function getServiceTheme(slug: string) {
  return serviceThemes[slug as ServiceKey] ?? null;
}
