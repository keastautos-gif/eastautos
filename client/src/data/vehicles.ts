/* ============================================================
   EASTAUTOS — Vehicle Data
   Centralized vehicle information for rental fleet
   Images are placeholders — replace with real photos later
   ============================================================ */

export interface VehicleSpec {
  label: string;
  value: string;
}

export interface Vehicle {
  slug: string;
  name: string;
  type: string;
  tagline: string;
  description: string;
  images: string[];
  specs: VehicleSpec[];
  features: string[];
  badge: string;
}

export const vehicles: Vehicle[] = [
  {
    slug: "corvette-c8-e-ray",
    name: "Corvette C8 E-Ray",
    type: "American Supercar",
    tagline: "Electrified Performance. American Muscle Redefined.",
    description:
      "The Corvette C8 E-Ray is the first electrified, all-wheel-drive Corvette in history. Combining a 6.2L V8 with an electric motor, it delivers explosive acceleration and razor-sharp handling. A true American supercar built for those who demand attention on every road.",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/IMG_0341_f74bbf19.WEBP",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/corvette-interior-hgMBJi44hiazwCGASsVmKu.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/corvette-rear-QneK4fvHzEPpSevFCvMuJa.webp",
    ],
    specs: [
      { label: "Horsepower", value: "655 HP" },
      { label: "0–60 mph", value: "2.5 sec" },
      { label: "Engine", value: "6.2L V8 + E-Motor" },
      { label: "Drivetrain", value: "eAWD" },
      { label: "Seats", value: "2" },
      { label: "Transmission", value: "8-Speed DCT" },
    ],
    features: [
      "Mid-engine layout",
      "Magnetic ride control",
      "Performance data recorder",
      "Bose premium audio",
      "Head-up display",
      "Carbon fiber accents",
    ],
    badge: "Available",
  },
  {
    slug: "ferrari-roma",
    name: "Ferrari Roma",
    type: "Sports Car",
    tagline: "La Nuova Dolce Vita. Italian Elegance Meets Power.",
    description:
      "The Ferrari Roma embodies timeless Italian design with a twin-turbo V8 producing 612 horsepower. Its elegant fastback silhouette and refined interior make it the perfect grand tourer for those who appreciate beauty and performance in equal measure.",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/IMG_0462_5b55d064.WEBP",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/ferrari-roma-interior-FVJGKVgfiS45HGBqcRiVLE.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/ferrari-roma-rear-P6ShRuyszuWufuRKip6h3M.webp",
    ],
    specs: [
      { label: "Horsepower", value: "612 HP" },
      { label: "0–60 mph", value: "3.2 sec" },
      { label: "Engine", value: "3.9L Twin-Turbo V8" },
      { label: "Drivetrain", value: "RWD" },
      { label: "Seats", value: "2+2" },
      { label: "Transmission", value: "8-Speed DCT" },
    ],
    features: [
      "Ferrari dynamic enhancer",
      "Dual cockpit design",
      "16\" carbon ceramic brakes",
      "Adaptive LED headlights",
      "Premium leather interior",
      "Manettino drive modes",
    ],
    badge: "Available",
  },
  {
    slug: "lamborghini-urus",
    name: "Lamborghini Urus",
    type: "Luxury Performance SUV",
    tagline: "The World's First Super SUV.",
    description:
      "The Lamborghini Urus combines the soul of a supercar with the functionality of an SUV. Its twin-turbo V8 delivers 657 horsepower, making it the fastest SUV in its class. Aggressive styling, advanced aerodynamics, and a luxurious interior define this category-defying vehicle.",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/IMG_0466_82ad5183.WEBP",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/urus-interior-myMsE9izyNjpehCXnaA4wR.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/urus-rear-VLJYBirtPVmD9hBdvJmKkG.webp",
    ],
    specs: [
      { label: "Horsepower", value: "657 HP" },
      { label: "0–60 mph", value: "3.3 sec" },
      { label: "Engine", value: "4.0L Twin-Turbo V8" },
      { label: "Drivetrain", value: "AWD" },
      { label: "Seats", value: "5" },
      { label: "Transmission", value: "8-Speed Auto" },
    ],
    features: [
      "ANIMA drive mode selector",
      "Rear-wheel steering",
      "Carbon ceramic brakes",
      "Bang & Olufsen audio",
      "Alcantara headliner",
      "Adaptive air suspension",
    ],
    badge: "Available",
  },
  {
    slug: "porsche-911-carrera-4",
    name: "Porsche 911 Carrera 4",
    type: "Sports Convertible",
    tagline: "Open Air. Pure Porsche.",
    description:
      "The Porsche 911 Carrera 4 Cabriolet is the quintessential sports car experience with the top down. All-wheel drive confidence, a twin-turbo flat-six engine, and Porsche's legendary handling make every drive an event. Timeless design meets modern engineering.",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/IMG_0465_50d524d1.WEBP",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/porsche-911-interior-cyysKxZ7zDsqJyyuT89vP5.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/porsche-911-rear-gnCsiwxVRdVhbJez5UtS8v.webp",
    ],
    specs: [
      { label: "Horsepower", value: "379 HP" },
      { label: "0–60 mph", value: "3.8 sec" },
      { label: "Engine", value: "3.0L Twin-Turbo Flat-6" },
      { label: "Drivetrain", value: "AWD" },
      { label: "Seats", value: "4" },
      { label: "Transmission", value: "8-Speed PDK" },
    ],
    features: [
      "Power retractable soft top",
      "PASM adaptive dampers",
      "Sport Chrono package",
      "Bose surround sound",
      "Sport exhaust system",
      "Porsche Active Suspension",
    ],
    badge: "Available",
  },
  {
    slug: "mercedes-benz-s580",
    name: "Mercedes-Benz S580",
    type: "Ultra Luxury Sedan",
    tagline: "The Best Car in the World.",
    description:
      "The Mercedes-Benz S580 represents the pinnacle of automotive luxury. A twin-turbo V8, MBUX hyperscreen, and executive rear seating create an unmatched experience. Whether you're driving or being driven, the S-Class sets the standard that every luxury sedan aspires to reach.",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/IMG_0469_9bbb10a8.WEBP",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/s580-interior-jm3KzHWdW6VbvqDBBsiWKH.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/s580-rear-nwQXfyNrkUZeVX6DP6DbZQ.webp",
    ],
    specs: [
      { label: "Horsepower", value: "496 HP" },
      { label: "0–60 mph", value: "4.4 sec" },
      { label: "Engine", value: "4.0L Twin-Turbo V8" },
      { label: "Drivetrain", value: "4MATIC AWD" },
      { label: "Seats", value: "5" },
      { label: "Transmission", value: "9-Speed Auto" },
    ],
    features: [
      "MBUX hyperscreen display",
      "Burmester 4D surround sound",
      "Executive rear seating",
      "Active ambient lighting",
      "E-Active body control",
      "Rear-axle steering",
    ],
    badge: "Available",
  },
  {
    slug: "cadillac-escalade-600",
    name: "Cadillac Escalade 600",
    type: "Premium Luxury SUV",
    tagline: "Commanding Presence. Unmatched Luxury.",
    description:
      "The Cadillac Escalade 600 is the ultimate full-size luxury SUV. A supercharged 6.2L V8, curved OLED display, and AKG studio-reference audio system deliver an experience that commands respect on every road. Three rows of premium seating make it ideal for any occasion.",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/IMG_0468_40fd32e9.WEBP",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/escalade-interior-mHYZXvdEZJCbigCsSSx6XK.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/escalade-rear-mHFrytjxTpaF6HbiBJ69ow.webp",
    ],
    specs: [
      { label: "Horsepower", value: "682 HP" },
      { label: "0–60 mph", value: "4.4 sec" },
      { label: "Engine", value: "6.2L Supercharged V8" },
      { label: "Drivetrain", value: "4WD" },
      { label: "Seats", value: "7" },
      { label: "Transmission", value: "10-Speed Auto" },
    ],
    features: [
      "38\" curved OLED display",
      "AKG studio reference audio",
      "Super Cruise hands-free driving",
      "Magnetic ride control",
      "Night vision camera",
      "Air ride adaptive suspension",
    ],
    badge: "Available",
  },
  {
    slug: "mercedes-maybach-gls-600",
    name: "Mercedes-Maybach GLS 600",
    type: "Ultra Luxury SUV",
    tagline: "The Ultimate Expression of SUV Luxury.",
    description:
      "The Mercedes-Maybach GLS 600 is the most luxurious SUV ever built. A handcrafted interior with Nappa leather, champagne flutes, and executive rear lounge seating transform every journey into a first-class experience. The twin-turbo V8 with EQ Boost delivers effortless power.",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/IMG_0194_c945f855.WEBP",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/maybach-gls-interior-TxqxBSJMXvYfMFMmrkRJL2.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/maybach-gls-rear-4NAm2PqgbXFfbR6teVK37A.webp",
    ],
    specs: [
      { label: "Horsepower", value: "550 HP" },
      { label: "0–60 mph", value: "4.8 sec" },
      { label: "Engine", value: "4.0L Twin-Turbo V8 + EQ" },
      { label: "Drivetrain", value: "4MATIC AWD" },
      { label: "Seats", value: "4" },
      { label: "Transmission", value: "9-Speed Auto" },
    ],
    features: [
      "Maybach executive rear seats",
      "Burmester high-end 3D audio",
      "Champagne flutes & cooler",
      "AIRMATIC suspension",
      "Panoramic sliding sunroof",
      "Two-tone Maybach exterior",
    ],
    badge: "Available",
  },
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}
