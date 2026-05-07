export interface SubService {
  title: string;
  icon: string; // Lucide icon name
  description: string;
}

export interface ServiceData {
  id: string;
  serviceNumber: string;
  label: string;
  title: string;
  description: string;
  ctaText: string;
  priceFrom: string;
  image: string;
  imageAlt: string;
  subServices: SubService[];
}

export const SECTIONS_NAV = [
  { id: 'modular-kitchen', label: 'Modular Kitchen', icon: 'UtensilsCrossed' },
  { id: 'false-ceiling', label: 'False Ceiling', icon: 'Layers' },
  { id: 'bedroom-wardrobes', label: 'Bedroom & Wardrobes', icon: 'BedDouble' },
  { id: 'full-home', label: 'Full Home', icon: 'Home' },
  { id: 'waterproof-roof', label: 'Waterproof Roof', icon: 'Shield' },
  { id: 'exterior-design', label: 'Construction', icon: 'Building2' },
];

export const SERVICES_DATA: ServiceData[] = [
  {
    id: 'modular-kitchen',
    serviceNumber: 'SERVICE 01',
    label: 'SERVICE 01',
    title: 'Modular Kitchen',
    description:
      "A modular kitchen is the heart of your home, and we treat it that way. Happy Home Interiors designs fully customized kitchens built around your cooking habits, space dimensions, and aesthetic preferences.\n\nOur designer incorporates your requirements through detailed discussions. Every kitchen is manufactured in our own facility with premium materials and installed on-site with precision.\n\nFrom compact straight kitchens for apartments to large U-shaped island kitchens for villas — we deliver quality that lasts for decades.",
    ctaText: 'Customize My Kitchen',
    priceFrom: '₹1,500/sq.ft',
    image: '/images/services/modular-kitchen-vizag-modern-design.png',
    imageAlt: 'Modular kitchen by Happy Home Interiors',
    subServices: [
      { icon: 'LayoutGrid', title: 'Island Kitchen', description: 'Kitchens designed for those who love dining while cooking. Family feels secure and free in this zone.' },
      { icon: 'CornerDownRight', title: 'L-Shape Kitchen', description: 'L-shaped kitchens are 100% customized to fit your space. Various options available for a clean design hassle-free.' },
      { icon: 'ArrowLeftRight', title: 'Parallel Kitchen', description: 'For parallel kitchens, the concept of having cabinets on both the longer sides maximizes storage and connectivity in the space effectively.' },
      { icon: 'ArrowRight', title: 'Straight Kitchen', description: 'Best of the efforts are made by our team of designers to produce an ideal structure matching modern interior trends.' },
      { icon: 'LayoutTemplate', title: 'U-Shape Kitchen', description: 'An efficient design that provides plenty of work space and allows for simple storage in the kitchen area. Designed to be user-friendly and clutter-free.' },
      { icon: 'UtensilsCrossed', title: 'Island + Dining Kitchen', description: 'Combined kitchen and dining space — perfect for open-plan homes that love entertaining guests with style.' },
    ]
  },
  {
    id: 'false-ceiling',
    serviceNumber: 'SERVICE 02',
    label: 'SERVICE 02',
    title: 'False Ceiling & Floorings',
    description:
      "Transform the look and feel of any room with expertly designed false ceilings. From minimal gypsum boards to elaborate POP designs with cove lighting — we handle the full scope.\n\nOur ceiling work conceals AC ducts, electrical wiring, and plumbing while adding elegance and warmth through ambient LED integration.\n\nWe also provide premium flooring solutions — vitrified tiles, marble, wooden laminate, and anti-skid options for every room type.",
    ctaText: 'Design My Ceiling',
    priceFrom: '₹85/sq.ft',
    image: '/images/services/false-ceiling-flooring-design-hyderabad.png',
    imageAlt: 'False ceiling and flooring by Happy Home Interiors',
    subServices: [
      { icon: 'Square', title: 'Gypsum False Ceiling', description: 'Lightweight, fire-resistant gypsum boards — ideal for all rooms. Clean finish with smooth painting.' },
      { icon: 'Palette', title: 'POP False Ceiling', description: 'Plaster of Paris designs — intricate patterns, curved shapes, and ornate detailing for premium spaces.' },
      { icon: 'Lightbulb', title: 'Cove Lighting Ceiling', description: 'Hidden LED strips in ceiling coves create dramatic ambient lighting — warm or cool tones.' },
      { icon: 'TreePine', title: 'Wooden Grid Ceiling', description: 'Timber batten and wooden grid ceilings for a warm, contemporary aesthetic in living rooms and offices.' },
      { icon: 'Grid3x3', title: 'Vitrified & Marble Flooring', description: 'High-gloss vitrified tiles and Italian marble finishes that reflect light and expand space visually.' },
      { icon: 'Rows3', title: 'Wooden Laminate Flooring', description: 'Premium laminate and engineered wood floors — warm, durable, and easy to maintain in bedrooms and offices.' },
    ]
  },
  {
    id: 'bedroom-wardrobes',
    serviceNumber: 'SERVICE 03',
    label: 'SERVICE 03',
    title: 'Custom-made Bedroom & Wardrobes',
    description:
      "A large portion of anyone's life is spent in their bedroom, so it deserves the best ambience, facilities, and thoughtful design. We create bedrooms that feel like personal sanctuaries.\n\nFrom full wardrobe walls to dressing units, study corners, and headboard panels — every element is custom-built to your exact dimensions and lifestyle.\n\n12 years of bedroom design across 5000+ homes gives us an unmatched understanding of what works in Indian homes.",
    ctaText: 'Build My Dream Bedroom',
    priceFrom: '₹1,200/sq.ft',
    image: '/images/services/bedroom-wardrobe-design-visakhapatnam.png',
    imageAlt: 'Bedroom and wardrobe design by Happy Home Interiors',
    subServices: [
      { icon: 'BedDouble', title: 'Premium Beds & Headboards', description: 'Custom beds with upholstered headboards, storage drawers beneath, and side table integration.' },
      { icon: 'Scan', title: 'Dressing Unit', description: 'A customized dressing unit with mirror, drawers, and open shelves — built to fit your bedroom wall precisely.' },
      { icon: 'PanelRight', title: 'Fitted Wardrobe (Sliding)', description: 'Space-saving sliding door wardrobes with internal organizers — suits narrow bedrooms beautifully.' },
      { icon: 'Package', title: 'Hinged Wardrobe with Loft', description: 'Floor-to-ceiling hinged wardrobes with top loft storage — maximum space utilization.' },
      { icon: 'BookOpen', title: 'Study Unit & Kids Desk', description: 'Integrated study corners and kids\' study desks built into bedroom walls — functional and neat.' },
      { icon: 'Monitor', title: 'TV Unit & Entertainment Wall', description: 'Bedroom TV wall panels with integrated storage, backlighting, and cable management built in.' },
    ]
  },
  {
    id: 'full-home',
    serviceNumber: 'SERVICE 04',
    label: 'SERVICE 04',
    title: 'Full Home Turnkey Interiors',
    description:
      "Our most comprehensive offering — we take over your entire home from bare walls to final handover. One team. One timeline. Zero coordination stress.\n\nThis covers every room: modular kitchen, all bedrooms with wardrobes, living and dining, false ceilings throughout, flooring, painting, electrical work, and all furniture.\n\nTrusted by 5000+ families across AP and Telangana for delivering complete homes on time and within the agreed budget — no hidden surprises.",
    ctaText: 'Get Full Home Quote',
    priceFrom: '₹1,800/sq.ft',
    image: '/images/services/full-home-turnkey-interior-vizag.png',
    imageAlt: 'Full home turnkey interior by Happy Home Interiors',
    subServices: [
      { icon: 'Sofa', title: 'Living Room Design', description: 'TV unit, sofa backdrop wall, false ceiling, and complete furniture curation for your living space.' },
      { icon: 'UtensilsCrossed', title: 'Dining Room Design', description: 'Crockery shelves, dining table + chairs, bar counter, and ambient ceiling for your dining area.' },
      { icon: 'Sun', title: 'Pooja & Study Units', description: 'Dedicated pooja room design and study unit integration — spiritual and functional spaces built with care.' },
      { icon: 'SplitSquareVertical', title: 'Hall Partitions', description: 'Decorative partitions between living and dining — PVC, wood, metal, or glass options available.' },
      { icon: 'PanelTop', title: 'Blinds & Wallpapers', description: 'Premium roller blinds, zebra blinds, and designer wallpapers to complete every room\'s look perfectly.' },
      { icon: 'Paintbrush', title: 'Painting & Wall Textures', description: 'Interior and exterior painting with texture finishes, stencil patterns, and premium emulsion brands.' },
    ]
  },
  {
    id: 'waterproof-roof',
    serviceNumber: 'SERVICE 05',
    label: 'SERVICE 05',
    title: 'Waterproof Roof & Cooling Solutions',
    description:
      "Protect your home from monsoon leaks, seepage, and summer heat with our advanced roof treatment solutions. We use proven waterproofing systems that last for years.\n\nOur thermal cool-roof coatings reduce indoor temperatures by up to 5–8°C — cutting your AC bills significantly while keeping your home comfortable year round.\n\nAvailable for terraces, flat roofs, sloped roofs, and bathroom ceilings across all property types.",
    ctaText: 'Protect My Home',
    priceFrom: '₹45/sq.ft',
    image: '/images/services/waterproof-roof-cooling-services-andhra-pradesh.png',
    imageAlt: 'Waterproof roof and cooling by Happy Home Interiors',
    subServices: [
      { icon: 'CloudRain', title: 'Terrace Waterproofing', description: 'Complete terrace waterproofing with membrane application — prevents leakage into rooms below.' },
      { icon: 'Droplets', title: 'Bathroom & Wet Area Sealing', description: 'Waterproofing for bathrooms, balconies, and utility areas — stops seepage and dampness.' },
      { icon: 'Thermometer', title: 'Thermal Cool Roof Coating', description: 'Reflective cool-roof coatings reduce heat absorption — keeps your top floor 5–8°C cooler.' },
      { icon: 'Blocks', title: 'Parapet & Wall Sealing', description: 'Sealing of parapet walls, window sills, and external joints to prevent water ingress.' },
      { icon: 'Leaf', title: 'Roof Garden Waterproofing', description: 'Heavy-duty waterproofing for terrace gardens and planters — allows greenery without leakage.' },
      { icon: 'SearchCheck', title: 'Post-Monsoon Inspection & Repair', description: 'Comprehensive roof inspection after monsoon season with repair and re-coating services.' },
    ]
  },
  {
    id: 'exterior-design',
    serviceNumber: 'SERVICE 06',
    label: 'SERVICE 06',
    title: 'Commercial & Residential Construction',
    description:
      "Make Your Home the One Everyone Stops to Look At\n\nFirst impressions are permanent. We design bold, elegant exteriors — facades, elevation finishes, and landscaping touches — that give your home a personality the entire neighborhood remembers.\n\nFrom independent houses and villa construction to commercial complexes and apartment buildings — Happy Home Interiors manages the full build cycle. Site supervision, material procurement, civil execution, and final handover — all under one accountable team across Andhra Pradesh and Telangana.",
    ctaText: 'Start My Construction',
    priceFrom: '₹1,600/sq.ft',
    image: '/images/services/commercial-residential-construction-vizag.png',
    imageAlt: 'Commercial and residential construction by Happy Home Interiors',
    subServices: [
      { icon: 'Building2', title: 'Facade & Elevation Design', description: 'Bold, elegant facade designs that give your home a personality the entire neighbourhood remembers.' },
      { icon: 'Paintbrush2', title: 'Elevation Finishes', description: 'Texture paints, stone cladding, and composite panels — premium exterior finishes that protect and beautify.' },
      { icon: 'Home', title: 'Residential Construction', description: 'Independent houses, villas, and apartments built to your plan — quality civil execution from slab to handover.' },
      { icon: 'Building', title: 'Commercial Construction', description: 'Shops, offices, and commercial complexes built with precision — on time, within budget, zero shortcuts.' },
      { icon: 'Lamp', title: 'Facade & Landscape Lighting', description: 'Architectural lighting on walls, pillars, and garden paths — stunning curb appeal after dark.' },
      { icon: 'DoorOpen', title: 'Gate, Compound & Driveway', description: 'Custom main gates, compound wall finishing, and driveway paving for complete exterior appeal.' },
    ]
  }
];
