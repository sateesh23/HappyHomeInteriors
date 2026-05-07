export const BUSINESS_DETAILS = {
  name: "Happy Home Interiors",
  tagline: "Transforming Houses Into Happy Homes",
  location: "Akkayyapalem, Visakhapatnam",
  phone: "+91 91776 99570",
  whatsapp: "919177699570",
  email: "happyhomeinteriors9@gmail.com",
  instagram: "https://www.instagram.com/_happy_home_interiors_/",
  facebook: "https://www.facebook.com/happyhomeinteriors",
  youtube: "https://www.youtube.com/@happyhomeinteriorsvizag",
};

// TypeScript types
export interface Service {
  id: string;
  title: string;
  icon: string;
  short: string;
  description: string;
  features: string[];
  image: string;
  category: string;
  cta?: string;
  headline?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  project_type?: string;
  location?: string;
  client_name?: string;
  image_url: string; // JSON string array of exactly 3 images
  youtube_url?: string;
  is_featured: boolean;
  order_index: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  text: string;
  rating: number;
  image_url: string;
  is_active: boolean;
  created_at: string;
}

// Keep PROCESS for backwards compatibility with Process.tsx
export const PROCESS = [
  { step: 1, title: "Talk to our team" },
  { step: 2, title: "Get design & 3D plan" },
  { step: 3, title: "Choose materials" },
  { step: 4, title: "Execution & handover" },
];

export const HERO_CONTENT = {
  label: "India's Most Trusted Home Interior Brand",
  headline: "Your Dream Home, Designed & Delivered — Without the Stress.",
  subtext:
    "From modular kitchens to full home turnkey projects — we've transformed 5,000+ homes across India with award-winning design, on-time delivery, and zero compromise on quality.",
  trustStrip: [
    { icon: "✅", stat: "5,000+", label: "Spaces Designed", micro: "Every single one delivered with care" },
    { icon: "📅", stat: "12+", label: "Years of Experience", micro: "Thousands of problems solved before yours" },
    { icon: "⭐", stat: "4.9 ★", label: "Average Rating", micro: "Rated by real homeowners, not us" },
  ],
};

export const SERVICES: Service[] = [
  {
    id: "modular-kitchen",
    title: "Modular Kitchen",
    icon: "🍳",
    short: "Kitchens Built for the Way Indians Actually Cook. Powerful storage, smart layouts, and finishes that handle daily cooking.",
    description: "Powerful storage, smart layouts, and finishes that handle daily cooking heat, oil, and spills — without losing style. Whether you love open shelves or full-shutter cabinets, we design it around your habits, not a catalog.",
    features: ["Indian Cooking Specific", "Smart Layouts", "Heat & Oil Resistant", "Custom Habits Based"],
    image: "/images/services/modular-kitchen-vizag-modern-design.png",
    category: "Kitchen",
    cta: "Design My Dream Kitchen →",
    headline: "Kitchens Built for the Way Indians Actually Cook"
  },
  {
    id: "false-ceiling",
    title: "False Ceiling & Floorings",
    icon: "💡",
    short: "Ceilings & Floors That Make Every Room Feel Bigger. Transform a flat room into a luxury space.",
    description: "The right ceiling design can transform a flat room into a luxury space. Paired with the perfect flooring — marble, vinyl, or hardwood-finish — we create interiors that look like a 5-star hotel and feel like your home.",
    features: ["Luxury Ambience", "Hotel-like Feel", "Space Optimization", "Marble & Hardwood Options"],
    image: "/images/services/false-ceiling-flooring-design-hyderabad.png",
    category: "Ceiling",
    cta: "See Ceiling & Floor Designs →",
    headline: "Ceilings & Floors That Make Every Room Feel Bigger"
  },
  {
    id: "bedroom-wardrobes",
    title: "Bedroom & Wardrobes",
    icon: "🛏️",
    short: "Bedrooms Designed for Deep Rest and Smart Storage. Custom wardrobes, headboards, and lighting.",
    description: "Your bedroom should feel like a retreat — not a storage room with a bed. We design custom wardrobes, headboards, and lighting that maximize space and give every bedroom that calm, curated feel you've always wanted.",
    features: ["Retreat Style", "Smart Storage", "Custom Headboards", "Calm & Curated"],
    image: "/images/services/bedroom-wardrobe-design-visakhapatnam.png",
    category: "Bedroom",
    cta: "Plan My Bedroom & Wardrobe →",
    headline: "Bedrooms Designed for Deep Rest and Smart Storage"
  },
  {
    id: "full-home-turnkey",
    title: "Full Home Turnkey",
    icon: "🏡",
    short: "Hand Us the Keys. We'll Hand Back Your Dream Home. Move-in ready home — we manage everything.",
    description: "From bare walls to fully furnished, move-in ready home — we manage everything. Design, materials, execution, supervision, and final delivery. You stay stress-free while we build the home your family deserves.",
    features: ["End-to-End Management", "Full Furnishing", "Stress-Free Process", "Final Delivery Focus"],
    image: "/images/services/full-home-turnkey-interior-vizag.png",
    category: "Full Home",
    cta: "Get My Full Home Quote →",
    headline: "Hand Us the Keys. We'll Hand Back Your Dream Home."
  },
  {
    id: "waterproof-roof",
    title: "Waterproof Roof & Cooling",
    icon: "🌡️",
    short: "No Leaks. No Heat. No More Worrying Every Monsoon. Advanced waterproofing and thermal cooling.",
    description: "Roof leaks and ceiling heat destroy interiors and moods. Our waterproofing and thermal cooling solutions protect your investment for years — so your beautiful home stays beautiful long after the rains.",
    features: ["Monsoon Protection", "Thermal Cooling", "Long-term Durability", "Interior Protection"],
    image: "/images/services/waterproof-roof-cooling-services-andhra-pradesh.png",
    category: "Exterior",
    cta: "Protect My Home Now →",
    headline: "No Leaks. No Heat. No More Worrying Every Monsoon."
  },
  {
    id: "exterior-design",
    title: "Commercial & Residential Construction",
    icon: "🏗️",
    short: "From bare slab to finished structure — commercial and residential builds managed end-to-end, on time, on budget.",
    description: "From independent houses and villa construction to commercial complexes and retail spaces — Happy Home Interiors manages the full build cycle. Site supervision, material procurement, civil execution, and final handover — all under one accountable team across AP and Telangana.",
    features: ["Residential Construction", "Commercial Construction", "Facade & Elevation", "Turnkey Handover"],
    image: "/images/services/commercial-residential-construction-vizag.png",
    category: "Construction",
    cta: "Start My Construction →",
    headline: "Build It Right. Build It Once."
  },
];

export const PROJECTS: Project[] = [
  {
    id: "mock-1",
    title: "The Founder's Office — Lucknow",
    project_type: "Office",
    description: "Modern Executive Office",
    image_url: "/images/services/full-home-turnkey-interior-vizag.png",
    is_featured: true,
    order_index: 1,
    created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "mock-2",
    title: "Where the Family Gathers — Indore",
    project_type: "Living Room",
    description: "Luxury Living Room",
    image_url: "/images/services/bedroom-wardrobe-design-visakhapatnam.png",
    is_featured: true,
    order_index: 2,
    created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "mock-3",
    title: "Bedroom That Feels Like a Boutique Hotel",
    project_type: "Bedroom",
    description: "Modern Bedroom",
    image_url: "/images/services/false-ceiling-flooring-design-hyderabad.png",
    is_featured: true,
    order_index: 3,
    created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "mock-4",
    title: "A Kitchen Built for the Indian Cook",
    project_type: "Modular Kitchen",
    description: "Sky Modular Kitchen",
    image_url: "/images/services/modular-kitchen-vizag-modern-design.png",
    is_featured: true,
    order_index: 4,
    created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "mock-5",
    title: "The Farmhouse That Became Their Forever Home",
    project_type: "Exterior",
    description: "Elegant Farm House",
    image_url: "/images/services/commercial-residential-construction-vizag.png",
    is_featured: true,
    order_index: 5,
    created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "mock-6",
    title: "Ceilings That Changed the Entire Room's Mood",
    project_type: "Ceiling",
    description: "Minimal Ceiling Design",
    image_url: "/images/services/waterproof-roof-cooling-services-andhra-pradesh.png",
    is_featured: true,
    order_index: 6,
    created_at: "2024-01-01T00:00:00.000Z"
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "mock-t1",
    client_name: "Mrs. Sunitha Lavanya (Director, ISM Focal Point)",
    text: "He completed the renovation affordably and within the agreed time frame... a rare blend of creativity, expertise, and passion. The attention to detail and quality of work truly set Happy Home Interiors apart.",
    rating: 5,
    image_url: "",
    is_active: true,
    created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "mock-t2",
    client_name: "Sukumar Panigrahi (CEO, Our MoneyLines)",
    text: "Exceptionally high-quality work... your ability to accept challenges and overcome them with efficiency makes you legendary. I have never seen such commitment to client satisfaction in this industry.",
    rating: 5,
    image_url: "",
    is_active: true,
    created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "mock-t3",
    client_name: "B. Sharmilla Rani (Shhaamys Designers)",
    text: "Happy Home Interiors resembles their firm name in every work they do... capable of turning a rock into a masterpiece. Their creative vision and execution are simply unmatched.",
    rating: 5,
    image_url: "",
    is_active: true,
    created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "mock-t4",
    client_name: "Mr. G. Aniel Kumar (Managing Partner)",
    text: "From the very beginning, he has been my strongest advocate... insights and practical advice have been the driving force behind some of my best decisions. Truly a partner you can trust.",
    rating: 5,
    image_url: "",
    is_active: true,
    created_at: "2024-01-01T00:00:00.000Z"
  },
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    icon: "🏆",
    title: "Exceptional Service",
    headline: "We Treat Your Home Like It's Ours",
    description: "Our team shows up on time, communicates clearly, and treats your space with the respect it deserves. No shortcuts. No ghosting. Just professionals who take pride in every nail they hammer.",
  },
  {
    icon: "🤝",
    title: "Personal Attention",
    headline: "One Dedicated Designer. Just For You.",
    description: "You'll never be passed around between strangers. From the first call to the final walkthrough, one dedicated designer owns your project — and knows every detail of your vision.",
  },
  {
    icon: "💰",
    title: "Affordable Price",
    headline: "Premium Interiors. Honest, Transparent Pricing.",
    description: "We believe beautiful homes shouldn't come with financial regret. Our pricing is upfront, our quotes are detailed, and there are zero surprise bills waiting for you at the end.",
  },
  {
    icon: "💡",
    title: "Innovative Design",
    headline: "Designs You Won't Find in Anyone Else's Portfolio",
    description: "We don't recycle templates. Every design starts from scratch — built around your lifestyle, your family, your taste. The result is a home that feels unmistakably yours.",
  },
  {
    icon: "🔍",
    title: "Transparent Communication",
    headline: "You Always Know Exactly What's Happening",
    description: "Weekly updates. Real-time progress photos. No radio silence mid-project. You'll always know what's being done, what's next, and what's already complete — without having to chase anyone.",
  },
  {
    icon: "⚡",
    title: "On-Time Delivery",
    headline: "We Finish on the Date We Promise. Period.",
    description: "Delays cost you money, peace, and trust. We plan every project with buffer timelines and strict milestone tracking — so when we give you a move-in date, you can book your housewarming party.",
  },
];

export const AWARDS = [
  { id: 1, title: "BNI Notable Networker Trophy", badge: "Visakhapatnam", image: "/images/awards/image1.png" },
  { id: 2, title: "Legends 250th Meeting Award", badge: "Legends Chapter", image: "/images/awards/image2.png" },
  { id: 3, title: "Best Modular Kitchen Design", badge: "2025 Winner", image: "/images/awards/image3.png" },
  { id: 4, title: "Outstanding Commercial Space", badge: "Excellence", image: "/images/awards/image4.png" },
  { id: 5, title: "Best Turnkey Execution", badge: "Gold Award", image: "/images/awards/image5.png" },
  { id: 6, title: "Premium Residential Interior", badge: "Vizag Homes", image: "/images/awards/image6.png" },
  { id: 7, title: "Sustainable Materials Advocate", badge: "Innovation", image: "/images/awards/image7.png" },
  { id: 8, title: "Most Reliable Contractor", badge: "Trust Builders", image: "/images/awards/image8.png" },
  { id: 9, title: "BNI Award of Excellence", badge: "Networking", image: "/images/awards/image9.png" },
  { id: 10, title: "Raj Cinemas Project of the Year", badge: "Commercial", image: "/images/awards/image10.png" },
  { id: 11, title: "Raj Cinemas Silver Screen Setup", badge: "Acoustics", image: "/images/awards/image11.png" },
  { id: 12, title: "Raj Cinemas Lobby Experience", badge: "Design", image: "/images/awards/image12.png" },
  { id: 13, title: "Sri Jatin Design Accolade", badge: "Recognition", image: "/images/awards/image13.png" },
];

export const SERVICE_AREAS = [
  { name: "Visakhapatnam", isHQ: true },
  { name: "Vijayawada", isHQ: false },
  { name: "Guntur", isHQ: false },
  { name: "Tirupati", isHQ: false },
  { name: "Hyderabad", isHQ: false },
  { name: "Secunderabad", isHQ: false },
  { name: "Warangal", isHQ: false },
  { name: "Chennai", isHQ: false },
];

// Re-exports for backwards compat
export const TRUST_STRIP = HERO_CONTENT.trustStrip;
export const SERVICES_LIST = SERVICES;
export const WHY_CHOOSE_US = WHY_CHOOSE_US_ITEMS.map((i) => i.description);
