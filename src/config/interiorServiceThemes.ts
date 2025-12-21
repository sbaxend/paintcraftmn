// src/config/interiorServiceThemes.ts

export type InteriorServiceKey =
  | "walls"
  | "trim"
  | "cabinets"
  | "staining"
  | "popcorn";

// -------------------
// Types
// -------------------

export type Swatch = {
  name: string;
  hex: string;
};

// NEW: alternating section block
export type ServiceProcessBlock = {
  id: string;
  label: string;
  title: string;
  img?: string;
  modalTitle?: string;
  modalBody?: string;
};

export type InteriorServiceTheme = {
  title: string;
  subtitle: string;
  slug: InteriorServiceKey;
  color: {
    surface: string;
    surfaceGradient: string;
    primary: string;
    primaryDark: string;
    accent: string;
    onSurface: string;
    onPrimary: string;
  };
 
  photos: string[];
  process: string[];
  benefits: string[];
  swatches?: Swatch[];
  faq?: { q: string; a: string }[];

  // NEW FOR ALTERNATING ROWS
  alternating?: ServiceProcessBlock[];
};

// -------------------
// THEMES
// -------------------

export const interiorServiceThemes: Record<
  InteriorServiceKey,
  InteriorServiceTheme
> = {
  // ---------------------------------------------------
  // WALLS & CEILINGS
  // ---------------------------------------------------
  walls: {
    title: "Walls & Ceilings",
    subtitle: "Smooth, even finishes that brighten every room.",
    slug: "walls",
    color: {
      surface: "#CBC3B8",
      surfaceGradient:
        "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 55%)",
      primary: "#C48356",
      primaryDark: "#9C6238",
      accent: "#F5D1B1",
      onSurface: "#F9FAFB",
      onPrimary: "#ffffff",
    },
    
    photos: ["/walls-and-ceiling-service.jpeg"],
    process: [
      "Protect floors and furniture with plastic and drop cloths.",
      "Repair nail holes, cracks, and minor wall imperfections.",
      "Apply premium primers and topcoats for a smooth, even finish.",
    ],
    benefits: [
      "Hides previous scuffs, marks, and small imperfections.",
      "Brightens dark or dated spaces with modern colors.",
      "Durable, washable finishes ideal for busy households.",
    ],
    swatches: [
      { name: "Soft White", hex: "#F4EFEA" },
      { name: "Greige", hex: "#D4C7BC" },
      { name: "Accent", hex: "#C48356" },
    ],
    faq: [
      {
        q: "How long does a typical interior repaint take?",
        a: "Most standard projects take 1–3 days depending on the number of rooms, colors, and repairs needed.",
      },
    ],
    alternating: [
  {
    id: "walls-prep",
    label: "Walls",
    title: "Proper wall preparation is the key to flawless results",
    img: "/walls_serviceTile.png",
    modalTitle: "Our Professional Wall Painting Process",
    modalBody: `
We begin by taping and protecting all trim, then patching holes and imperfections for a smooth surface.Next, we apply two even coats of paint, delivering a clean, consistent finish every time.
`,
  },
  {
    id: "walls-finish",
    label: "Ceilings",
    title: "Bright, clean ceilings that make the whole room feel new",
    img: "/ceiling-painting-finish.png",
    modalTitle: "Our Ceiling Painting Process",
     modalBody: `
We start by masking all floors, walls, and furniture for full protection. Then we spray the ceiling for a smooth, even finish. Once the paint dries, we remove all masking and clean the area, leaving everything neat and refreshed.
`,

  },
],

  },

  // ---------------------------------------------------
  // TRIM & MOLDING
  // ---------------------------------------------------
  trim: {
    title: "Trim & Molding",
    subtitle: "Crisp lines and clean details that frame every room.",
    slug: "trim",
    color: {
      surface: "#596D69",
      surfaceGradient:
        "radial-gradient(circle at top, rgba(148,163,184,0.18), transparent 60%)",
      primary: "#596D69",
      primaryDark: "#9C6238",
      accent: "#E5E7EB",
      onSurface: "#F9FAFB",
      onPrimary: "#ffffff",
    },
    
    photos: ["/trim_serviceTile.png"],
    process: [
      "Sand rough areas and de-gloss old finishes as needed.",
      "Caulk gaps at baseboards, casings, and crown molding.",
      "Apply durable trim enamels for a hard, factory-like finish.",
    ],
    benefits: [
      "Sharp, straight cut lines where wall meets trim.",
      "Hides years of wear on baseboards and casings.",
      "Uses durable coatings designed for doors, trim, and millwork.",
    ],
    swatches: [
      { name: "Classic White", hex: "#F9FAFB" },
      { name: "Warm White", hex: "#E5E7EB" },
      { name: "Accent", hex: "#C48356" },
    ],
    faq: [
      {
        q: "Can you paint over stained wood trim?",
        a: "Yes. We clean, sand, and prime stained wood so paint adheres and resists chipping.",
      },
    ],
   alternating: [
  {
    id: "trim-molding",
    label: "Trim & Molding",
    title: "Perfectly prepped, sharp, clean lines",
    img: "/trim_serviceTile.png",
    modalTitle: "How We Prep & Finish Trim and Molding",
    modalBody: `
Our process starts with full protection of walls, floors, and surrounding surfaces to prepare for a clean spray application. We sand everything smooth, vacuum and wipe all trim, fill nail holes, and caulk gaps. Any bare or stained areas are primed for proper adhesion, and then we apply multiple thin coats using professional spray equipment for a smooth, factory-level finish. Once dry, we remove masking carefully, inspect every detail, and make final touch-ups to deliver crisp, clean trim that elevates the entire room.
    `,
  },

  {
    id: "doors",
    label: "Doors",
    title: "Smooth, durable door finishes",
    img: "/interior-door-painting-minnesota.jpeg",
    modalTitle: "Our Door Painting Process",
    modalBody: `
We begin by fully protecting nearby walls, floors, hardware, and surrounding surfaces to ensure a clean and controlled spray environment. The door is sanded smooth, cleaned thoroughly, and any dents, holes, or seams are repaired for a uniform surface. Bare wood or stained areas receive a quality primer to guarantee strong adhesion and an even finish. Using professional spray equipment, we apply light, consistent coats to achieve a smooth, factory-grade result. After curing, we remove all masking, perform a detailed inspection, and complete any final touch-ups, leaving the door looking sharp, durable, and elevated.`,
  },

  {
    id: "windows",
    label: "Windows",
    title: "Clean lines and weather-tight protection",
    img: "/interior-window-minnesota-painting.webp",
    modalTitle: "Our Window Painting Process",
    modalBody: `
We repair trim edges, refresh caulk, prime problem areas, and apply clean, crisp coats with spotless masking for sharp, pro-level window frames.
    `,
  },
]


  },

  // ---------------------------------------------------
  // CABINETS
  // ---------------------------------------------------
  cabinets: {
    title: "Cabinets",
    subtitle: "Give your kitchen or bath a showroom-worthy upgrade.",
    slug: "cabinets",
    color: {
      surface: "#344D58",
      surfaceGradient:
        "radial-gradient(circle at top, rgba(148,163,184,0.25), transparent 65%)",
      primary: "#C48356",
      primaryDark: "#9C6238",
      accent: "#E2E8F0",
      onSurface: "#F1F5F9",
      onPrimary: "#ffffff",
    },
    
    photos: ["/cabinet_serviceTile.png"],
    process: [
      "Remove doors, drawers, and hardware; label for reinstallation.",
      "Clean, sand, and prime surfaces for maximum adhesion.",
      "Apply pro-grade cabinet coatings by spray or brush for a smooth, durable finish.",
    ],
    benefits: [
      "Transforms your kitchen without full replacement.",
      "Hard, furniture-grade finishes built for daily use.",
      "Custom colors to match your counters, backsplash, and style.",
    ],
    swatches: [
      { name: "Soft White", hex: "#F8FAFC" },
      { name: "Warm Gray", hex: "#CBD5E1" },
      { name: "Accent", hex: "#C48356" },
    ],
    faq: [
      {
        q: "How durable is a painted cabinet finish?",
        a: "We use pro-grade cabinet enamels designed to resist scratching, chipping, and everyday wear.",
      },
    ],
    alternating: [
  {
    id: "cab-basic",
    label: "Brush & Roll",
    title: "An affordable refresh with a clean, updated look",
    img: "/brush-and-roll-package.jpg",
    modalTitle: "Brush & Roll Package",
    modalBody: `
We start by protecting all floors and surrounding surfaces, then remove hardware and clean and sand each area for proper adhesion. Stained cabinets are primed, and we use a fine finish brush and roller to apply thin, even coats for a smooth, durable result. After everything dries, we reinstall hardware, inspect the finish, and complete any touch-ups, delivering refreshed cabinets at a budget-friendly price. most budget-friendly package. Cabinets are prepped, lightly sanded, and finished using a professional brush-and-roll method for a clean, refreshed look.
    `,
  },

  {
    id: "cab-standard",
    label: "Standard",
    title: "Smooth, durable finish at a great value",
    img: "/cabinet_serviceTile.png",
    modalTitle: "Standard Cabinet Painting Package",
    modalBody: `
We start by protecting all surfaces, removing hardware, and thoroughly cleaning and sanding every piece for proper adhesion. Stained cabinets are primed with a high-quality bonding primer, then we use professional airless spray equipment to apply smooth, consistent coats for a smooth, durable finish. Once everything dries, we reinstall hardware, inspect every detail, and complete any final touch-ups, delivering cabinets that look modern, refined, and built to last.`,
  },

  {
    id: "cab-premium",
    label: "Premium",
    title: "Factory-grade finish with full professional prep",
    img: "/premium-cabinet-package-minnesota.jpeg",
    modalTitle: "Premium Cabinet Refinishing Package",
    modalBody: `
OWe begin by fully protecting the workspace and removing all doors, drawers, and hardware. Each surface is cleaned, sanded, and detailed with precision to ensure a flawless foundation. We apply a specialized 2K primer and finish, an advanced, industrial-grade system sourced from overseas for unmatched durability, adhesion, and longevity. Using professional HVLP spray equipment, we lay down ultra-smooth, controlled coats that deliver a true factory-grade finish. After curing, we reinstall all components, complete a detailed quality inspection, and finalize any touch-ups, providing cabinets with maximum durability, superior scratch resistance, and a premium finish built to last for years.ur top-tier option. Includes advanced prep, full surface restoration, and a sprayed enamel system for a flawless, furniture-quality finish.
    `,
  },
]

  },

  // ---------------------------------------------------
  // STAINING
  // ---------------------------------------------------
  staining: {
    title: "Staining",
    subtitle: "Rich, natural wood tones that show off the grain.",
    slug: "staining",
    color: {
      surface: "#5A4840",
      surfaceGradient:
        "radial-gradient(circle at top, rgba(55,65,81,0.25), transparent 65%)",
      primary: "#8B5A2B",
      primaryDark: "#6B4420",
      accent: "#D1B89C",
      onSurface: "#F9FAFB",
      onPrimary: "#ffffff",
    },
    
    photos: ["/minnesota-staining-services."],
    process: [
      "Sand and prep wood surfaces to a smooth, even profile.",
      "Apply stain evenly to bring out natural grain and tone.",
      "Seal with clear coats for protection and long-term beauty.",
    ],
    benefits: [
      "Brings out the natural character of wood surfaces.",
      "Adds protection from moisture and daily use.",
      "Custom stain blends for the exact tone you want.",
    ],
    swatches: [
      { name: "Warm Oak", hex: "#C3894E" },
      { name: "Walnut", hex: "#6B4420" },
      { name: "Natural", hex: "#F5E9DC" },
    ],
    faq: [
      {
        q: "Can you match an existing stain color?",
        a: "Yes. We can get very close to most existing colors with custom stain blends and test samples.",
      },
    ],
    alternating: [
      {
        id: "stain-prep",
        label: "Prep & Sanding",
        title: "We prepare the wood for a flawless stain",
        img: "/prep-and-sanding.png",
        modalTitle: "Stain Prep Process",
        modalBody:
          "Our staining prep begins with full protection of surrounding floors, walls, and furniture to create a clean, controlled workspace. We remove hardware, clean all surfaces thoroughly, and sand the wood to open the grain and ensure even absorption of the stain. Any dents, holes, or imperfections are filled and leveled, then sanded again for a smooth, consistent surface. We finish by removing all dust with a detailed vacuum and tack-cloth wipe down, leaving the wood perfectly prepped for a rich, uniform, professional stain application.",
      },
      {
        id: "stain-finish",
        label: "Stain Application",
        title: "Stunning, natural wood tones",
        img: "/minnesota-staining-services.jpeg",
        modalTitle: "Our Staining Technique",
        modalBody:
          "Once the wood is fully prepped, we begin by applying the stain evenly using a controlled brush-and-wipe or rag application method. The stain is worked into the grain for rich, consistent color, then carefully wiped to remove excess and prevent blotching. We allow proper drying time between coats. After staining, we apply a protective clear coat to lock in the finish, enhance durability, and give the wood a smooth, refined appearance built to last.",
      },
    ],
  },

  // ---------------------------------------------------
  // POPCORN REMOVAL
  // ---------------------------------------------------
  popcorn: {
    title: "Popcorn Texture Removal",
    subtitle: "Modern, smooth ceilings that open up your space.",
    slug: "popcorn",
    color: {
      surface: "#74858F",
      surfaceGradient:
        "radial-gradient(circle at top, rgba(148,163,184,0.2), transparent 60%)",
      primary: "#C48356",
      primaryDark: "#9C6238",
      accent: "#E5E7EB",
      onSurface: "#F9FAFB",
      onPrimary: "#ffffff",
    },
    photos: ["/popcorn_serviceTile.png"],
    process: [
      "Protect floors and furniture from dust and debris.",
      "Soften and remove existing popcorn texture where feasible.",
      "Repair drywall, refinish to a smooth or light texture, and repaint.",
    ],
    benefits: [
      "Instantly updates the look of older homes.",
      "Helps light travel more evenly across ceilings.",
      "Preps ceilings for fresh, modern paint colors.",
    ],
    swatches: [
      { name: "Ceiling White", hex: "#F9FAFB" },
      { name: "Soft Warm White", hex: "#E5E7EB" },
      { name: "Accent", hex: "#C48356" },
    ],
    faq: [
      {
        q: "Is popcorn removal messy?",
        a: "We protect your floors and furnishings, use dust control techniques, and perform a thorough cleanup when the work is done.",
      },
    ],
    alternating: [
  {
    id: "pop-prep",
    label: "Protection",
    title: "We fully protect your home from dust",
    img: "/prepping-for-popcorn-removal.jpeg",
    modalTitle: "Popcorn Removal Prep Steps",
    modalBody: `
Our prep process for popcorn ceiling removal starts with fully protecting the home, covering floors, walls, furniture, and vents to contain dust and debris. We seal off adjacent rooms with plastic barriers and control airflow to keep dust from traveling. All fixtures are removed or masked, and the workspace is set up for safe, efficient removal. We use a professional dust extractor with a HEPA filter attached to our sanding equipment, allowing us to remove the texture cleanly while significantly reducing airborne dust. This creates a controlled, cleaner environment.`,
  },

  {
    id: "pop-knockdown",
    label: "Knock Down Finish",
    title: "A fresh, modern textured ceiling",
    img: "/knock-down-finish-minnesota.jpg",
    modalTitle: "Knock Down Ceiling Texture",
    modalBody: `
For a knockdown ceiling finish, we begin by priming the surface to reveal any imperfections and ensure proper adhesion. Depending on the ceiling’s condition, we complete any necessary touch-up repairs and sanding to create a consistent base. Once the surface is ready, we spray an even layer of thinned joint compound using professional texture equipment, allow it to set to the ideal tack time, and gently “knock down” the peaks with a wide knife for a smooth, modern texture. After the finish dries, we perform a detailed inspection, complete any final touch-ups, and apply two coats of ceiling paint to lock in the look. The result is a clean, upgraded knockdown texture that elevates the entire room.`,
  },

  {
    id: "pop-flat",
    label: "Flat Ceiling Finish",
    title: "Crisp, smooth, clean ceilings",
    img: "/flat-finish-ceiling.png",
    modalTitle: "Flat Smooth Ceiling Finish",
    modalBody: `
For a flat ceiling finish, we begin by priming the surface to reveal any imperfections and ensure proper adhesion. Based on the ceiling’s condition, we perform any necessary skim-coating and sanding to achieve a smooth, even surface. Once the surface is ready, we apply two coats of ceiling paint to create a clean, uniform flat finish. The result is a sleek, modern look with consistent color and a refined appearance throughout.`,
  },
]

  },
};

// -------------------
// STATIC PATHS + EXPORT
// -------------------

export const INTERIOR_SLUGS: InteriorServiceKey[] = [
  "walls",
  "trim",
  "cabinets",
  "staining",
  "popcorn",
];

export function getInteriorServiceTheme(
  slug: string
): InteriorServiceTheme | undefined {
  return interiorServiceThemes[slug as InteriorServiceKey];
}
