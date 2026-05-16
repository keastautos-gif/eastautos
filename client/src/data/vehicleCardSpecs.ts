/* ============================================================
   EASTAUTOS — Vehicle Card Specs
   Quick-reference specs for fleet cards (Engine, HP, MSRP).
   Keyed by normalized vehicle name for matching.
   ============================================================ */

export interface CardSpec {
  engine: string;
  horsepower: string;
  msrp: string;
}

export const vehicleCardSpecsMap: Record<string, CardSpec> = {
  "mclaren artura spyder": {
    engine: "3.0L Twin-Turbo V6 Hybrid",
    horsepower: "700 HP",
    msrp: "$280,000",
  },
  "cadillac escalade esv": {
    engine: "6.2L V8",
    horsepower: "420 HP",
    msrp: "$115,000",
  },
  "bmw 760i": {
    engine: "4.4L Twin-Turbo V8",
    horsepower: "544 HP",
    msrp: "$115,000",
  },
  "lamborghini huracan evo": {
    engine: "5.2L V10",
    horsepower: "631 HP",
    msrp: "$270,000",
  },
  "bmw m4 comp": {
    engine: "3.0L Twin-Turbo I6",
    horsepower: "503 HP",
    msrp: "$80,000",
  },
  "lamborghini urus": {
    engine: "4.0L Twin-Turbo V8",
    horsepower: "657 HP",
    msrp: "$240,000",
  },
  "ferrari roma": {
    engine: "3.9L Twin-Turbo V8",
    horsepower: "612 HP",
    msrp: "$250,000",
  },
  "mercedes-benz s580": {
    engine: "4.0L Twin-Turbo V8",
    horsepower: "496 HP",
    msrp: "$120,000",
  },
  "mercedes-maybach gls 600": {
    engine: "4.0L Twin-Turbo V8",
    horsepower: "550 HP",
    msrp: "$175,000",
  },
  "porsche 911 turbo s": {
    engine: "3.7L Twin-Turbo Flat-6",
    horsepower: "640 HP",
    msrp: "$230,000",
  },
  "rolls-royce ghost": {
    engine: "6.75L Twin-Turbo V12",
    horsepower: "563 HP",
    msrp: "$340,000",
  },
  "corvette c8 e-ray": {
    engine: "6.2L V8 + E-Motor",
    horsepower: "655 HP",
    msrp: "$110,000",
  },
};

/**
 * Get card specs by vehicle name (case-insensitive matching)
 */
export function getCardSpecs(vehicleName: string): CardSpec | null {
  const normalized = vehicleName.toLowerCase().trim();
  return vehicleCardSpecsMap[normalized] || null;
}
