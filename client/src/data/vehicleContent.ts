/* ============================================================
   EASTAUTOS — Vehicle Content Data
   Luxury descriptions, performance specs, and FAQs for each
   vehicle in the fleet. Keyed by vehicle name for matching.
   ============================================================ */

export interface VehicleSpec {
  label: string;
  value: string;
}

export interface VehicleFAQ {
  question: string;
  answer: string;
}

export interface VehicleContent {
  description: string;
  specs: VehicleSpec[];
  faqs: VehicleFAQ[];
}

/**
 * Vehicle content keyed by normalized vehicle name.
 * Names are matched case-insensitively and with trimmed whitespace.
 */
export const vehicleContentMap: Record<string, VehicleContent> = {
  "mclaren artura spyder": {
    description:
      "The McLaren Artura Spyder represents the pinnacle of open-top supercar engineering — a hybrid powertrain masterpiece that delivers breathtaking performance with the visceral thrill of wind-in-hair driving. Its carbon fiber MonoCell chassis provides extraordinary rigidity while keeping weight to a minimum, and the retractable hardtop transforms the driving experience in seconds. Every surface has been sculpted for aerodynamic efficiency, channeling air precisely where it's needed to cool the twin-turbo V6 and electric motor combination. This is not merely a convertible — it is an engineering statement, designed for those who demand the absolute best from both technology and craftsmanship.",
    specs: [
      { label: "Engine", value: "3.0L Twin-Turbo V6 + E-Motor" },
      { label: "Horsepower", value: "700 HP (Combined)" },
      { label: "0–60 MPH", value: "2.8 seconds" },
      { label: "Top Speed", value: "205 MPH" },
      { label: "Transmission", value: "8-Speed SSG" },
      { label: "Drive", value: "Rear-Wheel Drive" },
      { label: "Weight", value: "3,303 lbs" },
      { label: "Roof", value: "Retractable Hardtop" },
    ],
    faqs: [
      {
        question: "Is the McLaren Artura Spyder available for weekend rentals?",
        answer:
          "Yes. We offer flexible rental periods starting from a 24-hour minimum. Weekend packages are available — submit an inquiry and our team will confirm availability and arrange delivery to your preferred location.",
      },
      {
        question: "What is required to rent this vehicle?",
        answer:
          "A valid driver's license, proof of full-coverage insurance, a security deposit, and a signed rental agreement. Our team will walk you through the process after your inquiry is confirmed.",
      },
      {
        question: "Can I take the McLaren Artura Spyder on a road trip?",
        answer:
          "Absolutely. We allow extended trips within the Tri-State area and beyond with prior arrangement. Mileage packages are available to suit your itinerary.",
      },
      {
        question: "Is delivery included?",
        answer:
          "Complimentary delivery is available within the greater New York metro area. Additional locations can be arranged for a nominal fee.",
      },
    ],
  },

  "cadillac escalade esv": {
    description:
      "The Cadillac Escalade ESV is the definitive full-size luxury SUV — a commanding presence that combines executive refinement with uncompromising space. Its extended wheelbase delivers an interior that rivals private lounges, with hand-stitched leather, genuine wood trim, and a curved OLED display that spans the entire dashboard. Whether you're arriving at a gala, transporting clients, or simply enjoying the open road, the Escalade ESV projects authority and sophistication in equal measure. The magnetic ride suspension absorbs every imperfection, delivering a ride quality that belies its imposing dimensions.",
    specs: [
      { label: "Engine", value: "6.2L V8" },
      { label: "Horsepower", value: "420 HP" },
      { label: "Torque", value: "460 lb-ft" },
      { label: "Transmission", value: "10-Speed Automatic" },
      { label: "Drive", value: "4WD" },
      { label: "Seating", value: "7 Passengers" },
      { label: "Display", value: "38\" Curved OLED" },
      { label: "Cargo", value: "142.8 cu ft (max)" },
    ],
    faqs: [
      {
        question: "Is the Escalade ESV suitable for airport transfers?",
        answer:
          "Perfectly suited. The extended wheelbase provides ample luggage space and rear-seat legroom for executive travel. We also offer chauffeur services with this vehicle upon request.",
      },
      {
        question: "Can I rent the Escalade ESV with a chauffeur?",
        answer:
          "Yes. Our professional chauffeur service is available with the Escalade ESV for events, corporate travel, and special occasions. Inquire for hourly and full-day rates.",
      },
      {
        question: "How many passengers does it accommodate?",
        answer:
          "The ESV comfortably seats up to 7 passengers across three rows, with generous legroom throughout. The third row is adult-friendly, unlike most competitors.",
      },
      {
        question: "Is this vehicle available for weddings and events?",
        answer:
          "Absolutely. The Escalade ESV is one of our most requested vehicles for weddings, proms, and corporate events. We offer special event packages with flexible scheduling.",
      },
    ],
  },

  "bmw 760i": {
    description:
      "The BMW 760i xDrive represents the absolute summit of the 7 Series lineage — a flagship sedan where cutting-edge technology meets hand-crafted luxury. Its twin-turbocharged V8 delivers effortless power through an intelligent all-wheel-drive system, while the Executive Lounge rear seating transforms the cabin into a mobile sanctuary. Crystal controls, Bowers & Wilkins Diamond Surround Sound, and BMW's most advanced driver assistance systems create an environment where every journey becomes an occasion. This is the car that moves heads of state and captains of industry — now available through our exclusive network.",
    specs: [
      { label: "Engine", value: "4.4L Twin-Turbo V8" },
      { label: "Horsepower", value: "544 HP" },
      { label: "Torque", value: "553 lb-ft" },
      { label: "0–60 MPH", value: "3.9 seconds" },
      { label: "Transmission", value: "8-Speed Steptronic" },
      { label: "Drive", value: "xDrive AWD" },
      { label: "Wheelbase", value: "126.4 inches" },
      { label: "Features", value: "Executive Lounge, B&W Sound" },
    ],
    faqs: [
      {
        question: "Is the BMW 760i available for corporate events?",
        answer:
          "Yes. The 760i is ideal for executive travel, client entertainment, and corporate events. Its rear Executive Lounge package provides first-class comfort for passengers.",
      },
      {
        question: "What makes the 760i different from a standard 7 Series?",
        answer:
          "The 760i is the range-topping variant with the most powerful engine, exclusive interior materials, and the full Executive Lounge rear package. It represents BMW's absolute best in luxury and performance.",
      },
      {
        question: "Can I self-drive this vehicle?",
        answer:
          "Yes, the 760i is available for self-drive rental. Its advanced driver assistance systems and intuitive controls make it remarkably easy to drive despite its flagship status.",
      },
      {
        question: "Is insurance included in the rental?",
        answer:
          "Comprehensive insurance coverage is included with every rental. Additional coverage options are available for complete peace of mind.",
      },
    ],
  },

  "lamborghini huracan evo": {
    description:
      "The Lamborghini Huracán EVO is a visceral expression of Italian supercar philosophy — raw, unfiltered performance wrapped in a design language that stops traffic and accelerates heartbeats. Its naturally aspirated V10 engine screams to 8,500 RPM, delivering a soundtrack that no turbocharged rival can replicate. The LDVI (Lamborghini Dinamica Veicolo Integrata) system anticipates driver inputs and orchestrates every mechanical component in perfect harmony. From the carbon-ceramic brakes to the active aerodynamics, every element exists to deliver an experience that transcends mere transportation. This is driving distilled to its most elemental and exhilarating form.",
    specs: [
      { label: "Engine", value: "5.2L Naturally Aspirated V10" },
      { label: "Horsepower", value: "631 HP" },
      { label: "Torque", value: "443 lb-ft" },
      { label: "0–60 MPH", value: "2.9 seconds" },
      { label: "Top Speed", value: "202 MPH" },
      { label: "Transmission", value: "7-Speed Dual-Clutch" },
      { label: "Drive", value: "All-Wheel Drive" },
      { label: "Redline", value: "8,500 RPM" },
    ],
    faqs: [
      {
        question: "What experience level is recommended for the Huracán EVO?",
        answer:
          "While the Huracán EVO is remarkably approachable for a supercar thanks to its all-wheel-drive system and electronic aids, we recommend prior experience with high-performance vehicles. Our team can provide a thorough orientation before handover.",
      },
      {
        question: "Is the Huracán EVO available for photoshoots?",
        answer:
          "Yes. The Huracán EVO is one of our most photographed vehicles. We offer dedicated photoshoot packages with flexible location options across the Tri-State area.",
      },
      {
        question: "What is the mileage allowance?",
        answer:
          "Standard rentals include a generous daily mileage allowance. Extended mileage packages are available for road trips and longer excursions — just let us know your plans when inquiring.",
      },
      {
        question: "Can I rent this for a special occasion?",
        answer:
          "Absolutely. The Huracán EVO is perfect for birthdays, anniversaries, proposals, and milestone celebrations. We can arrange delivery timed precisely to your event.",
      },
    ],
  },

  "bmw m4 comp": {
    description:
      "The BMW M4 Competition is a precision instrument disguised as a grand tourer — a car that delivers track-capable performance without sacrificing daily usability. Its twin-turbocharged inline-six produces a relentless wave of torque, channeled through an eight-speed automatic that shifts with surgical precision. The adaptive M suspension and electronically controlled differential transform every corner into an opportunity for controlled aggression. Carbon fiber roof panels lower the center of gravity, while the aggressive widebody stance communicates intent before a single pedal is pressed. This is BMW's motorsport heritage, refined for the road.",
    specs: [
      { label: "Engine", value: "3.0L Twin-Turbo Inline-6" },
      { label: "Horsepower", value: "503 HP" },
      { label: "Torque", value: "479 lb-ft" },
      { label: "0–60 MPH", value: "3.4 seconds" },
      { label: "Top Speed", value: "180 MPH (limited)" },
      { label: "Transmission", value: "8-Speed M Steptronic" },
      { label: "Drive", value: "Rear-Wheel Drive" },
      { label: "Weight", value: "3,830 lbs" },
    ],
    faqs: [
      {
        question: "Is the M4 Competition a good choice for a weekend getaway?",
        answer:
          "Ideal. The M4 Competition combines supercar-level performance with genuine grand touring comfort. Its trunk accommodates weekend luggage easily, and the adaptive suspension offers a surprisingly refined highway ride.",
      },
      {
        question: "What fuel does the M4 Competition require?",
        answer:
          "Premium unleaded fuel (91 octane or higher) is required. The vehicle will be delivered with a full tank, and we ask that it be returned at the same level.",
      },
      {
        question: "Is this vehicle available for track days?",
        answer:
          "Track use is available by special arrangement only. Please mention your interest when submitting an inquiry, and our team will discuss options and requirements.",
      },
      {
        question: "How does the rental process work?",
        answer:
          "Submit an inquiry through our form or contact us directly. We'll confirm availability, discuss terms, and arrange delivery or pickup at your convenience. The entire process is designed to be seamless and discreet.",
      },
    ],
  },

  "lamborghini urus": {
    description:
      "The Lamborghini Urus redefines what a super SUV can be — combining the soul of a Lamborghini with the versatility of a luxury sport utility vehicle. Its twin-turbocharged V8 produces supercar-level acceleration from a platform that seats five in absolute comfort, with enough cargo space for a weekend in the Hamptons. The Urus commands attention with its angular, aggressive design language while delivering a ride quality that pampers occupants on any surface. Active anti-roll bars, rear-wheel steering, and adaptive air suspension work in concert to deliver handling that defies physics for a vehicle of this size. It is, quite simply, the world's most exciting SUV.",
    specs: [
      { label: "Engine", value: "4.0L Twin-Turbo V8" },
      { label: "Horsepower", value: "657 HP" },
      { label: "Torque", value: "627 lb-ft" },
      { label: "0–60 MPH", value: "3.3 seconds" },
      { label: "Top Speed", value: "190 MPH" },
      { label: "Transmission", value: "8-Speed Automatic" },
      { label: "Drive", value: "All-Wheel Drive" },
      { label: "Seating", value: "5 Passengers" },
    ],
    faqs: [
      {
        question: "Is the Urus practical for everyday use?",
        answer:
          "Remarkably so. Despite its supercar performance, the Urus offers genuine luxury SUV practicality — comfortable seating for five, a spacious trunk, and a refined ride in its Strada driving mode.",
      },
      {
        question: "Can I take the Urus to the Hamptons or upstate?",
        answer:
          "Absolutely. The Urus is perfect for weekend getaways. Its all-wheel-drive system and adaptive suspension handle any road condition with confidence. Extended mileage packages are available.",
      },
      {
        question: "Is this vehicle available for music video or content shoots?",
        answer:
          "Yes. The Urus is extremely popular for content creation, music videos, and social media shoots. We offer dedicated production packages with flexible scheduling.",
      },
      {
        question: "What makes the Urus different from other luxury SUVs?",
        answer:
          "The Urus delivers genuine supercar acceleration (0–60 in 3.3 seconds) in an SUV body. No other vehicle in this class matches its combination of performance, presence, and practicality.",
      },
    ],
  },
};

/**
 * Get vehicle content by name (case-insensitive matching)
 */
export function getVehicleContent(vehicleName: string): VehicleContent | null {
  const normalized = vehicleName.toLowerCase().trim();
  return vehicleContentMap[normalized] || null;
}

/**
 * Generate generic content for vehicles not in our curated map
 */
export function getGenericVehicleContent(vehicleName: string, brand: string): VehicleContent {
  return {
    description: `The ${vehicleName} represents the finest in ${brand}'s lineup — a vehicle crafted for those who appreciate the intersection of performance, luxury, and exclusivity. Available through the Eastautos network, this vehicle delivers an experience that transcends ordinary transportation. Every detail has been considered, from the materials that greet your fingertips to the powertrain that responds to your every command. Contact our team to learn more about this exceptional vehicle and arrange a private viewing.`,
    specs: [],
    faqs: [
      {
        question: `How do I rent the ${vehicleName}?`,
        answer:
          "Submit an inquiry through our form or contact us directly via phone or text. Our team will confirm availability, discuss rental terms, and arrange delivery to your preferred location within 24 hours.",
      },
      {
        question: "What is included in the rental?",
        answer:
          "Every rental includes comprehensive insurance coverage, 24/7 roadside assistance, and complimentary delivery within the greater New York metro area. The vehicle is delivered detailed, with a full tank of fuel.",
      },
      {
        question: "What are the rental requirements?",
        answer:
          "A valid driver's license, proof of full-coverage insurance, a security deposit, and a signed rental agreement. Our team will guide you through the process after your inquiry is confirmed.",
      },
      {
        question: "Is this vehicle available for events and photoshoots?",
        answer:
          "Yes. We offer dedicated packages for weddings, corporate events, content creation, and photoshoots. Flexible scheduling and location options are available — just let us know your needs.",
      },
    ],
  };
}
