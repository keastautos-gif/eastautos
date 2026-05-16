import { ENV } from "./_core/env";

export interface AirtableVehicle {
  id: string;
  name: string;
  brand: string;
  status: "Available" | "Booked" | "Unavailable";
  suggestedRate: number;
  image: string;
  showOnWebsite: boolean;
  location: string;
  inquiryLink: string;
}

export interface AirtableVehicleDetail extends AirtableVehicle {
  photos: string[];
}

/**
 * Extract vehicle name from Car ID, removing color suffix
 * e.g., "BMW M4 Comp (Grey)" -> "BMW M4 Comp"
 */
function extractVehicleName(carId: string): string {
  return carId.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

/**
 * Extract first image URL from Car Photo attachment array
 */
function extractImageUrl(carPhotos: unknown): string {
  if (Array.isArray(carPhotos) && carPhotos.length > 0) {
    const photo = carPhotos[0] as { url?: string };
    return photo.url || "";
  }
  return "";
}

/**
 * Extract all image URLs from Car Photo attachment array
 */
function extractAllImageUrls(carPhotos: unknown): string[] {
  if (Array.isArray(carPhotos)) {
    return carPhotos
      .map((photo) => (photo as { url?: string }).url)
      .filter((url): url is string => Boolean(url));
  }
  return [];
}

/**
 * Fetch all vehicles from Airtable Cars table
 * Filters to only include vehicles where "Show On Website" is checked
 */
export async function getAirtableVehicles(): Promise<AirtableVehicle[]> {
  if (!ENV.airtableApiKey || !ENV.airtableBaseId) {
    console.warn("[Airtable] Missing API key or Base ID — skipping fetch");
    return [];
  }

  try {
    const url = `https://api.airtable.com/v0/${ENV.airtableBaseId}/Cars?filterByFormula={Show On Website}=TRUE()`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ENV.airtableApiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `[Airtable] API error: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const data = (await response.json()) as {
      records: Array<{
        id: string;
        fields: Record<string, unknown>;
      }>;
    };

    return data.records.map((record) => {
      const status = (record.fields["Status"] as string) || "Unavailable";
      return {
        id: record.id,
        name: extractVehicleName((record.fields["Car ID"] as string) || ""),
        brand: (record.fields["Car Model"] as string) || "",
        status: (status === "Available" || status === "Booked" || status === "Unavailable" ? status : "Unavailable") as "Available" | "Booked" | "Unavailable",
        suggestedRate: (record.fields["Suggested Rate"] as number) || 0,
        image: extractImageUrl(record.fields["Car Photo"]),
        showOnWebsite: (record.fields["Show On Website"] as boolean) || false,
        location: (record.fields["Location"] as string) || "",
        inquiryLink: (record.fields["Inquiry Link"] as string) || "",
      };
    });
  } catch (error) {
    console.error("[Airtable] Failed to fetch vehicles:", error);
    return [];
  }
}

/**
 * Fetch a single vehicle by ID from Airtable Cars table
 * Includes all photos for the detail page
 */
export async function getAirtableVehicleById(
  vehicleId: string
): Promise<AirtableVehicleDetail | null> {
  if (!ENV.airtableApiKey || !ENV.airtableBaseId) {
    console.warn("[Airtable] Missing API key or Base ID — skipping fetch");
    return null;
  }

  try {
    const url = `https://api.airtable.com/v0/${ENV.airtableBaseId}/Cars/${vehicleId}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ENV.airtableApiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `[Airtable] API error: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const record = (await response.json()) as {
      id: string;
      fields: Record<string, unknown>;
    };

    const status = (record.fields["Status"] as string) || "Unavailable";
    return {
      id: record.id,
      name: extractVehicleName((record.fields["Car ID"] as string) || ""),
      brand: (record.fields["Car Model"] as string) || "",
      status: (status === "Available" ||
      status === "Booked" ||
      status === "Unavailable"
        ? status
        : "Unavailable") as "Available" | "Booked" | "Unavailable",
      suggestedRate: (record.fields["Suggested Rate"] as number) || 0,
      image: extractImageUrl(record.fields["Car Photo"]),
      showOnWebsite: (record.fields["Show On Website"] as boolean) || false,
      location: (record.fields["Location"] as string) || "",
      inquiryLink: (record.fields["Inquiry Link"] as string) || "",
      photos: extractAllImageUrls(record.fields["Car Photo"]),
    };
  } catch (error) {
    console.error("[Airtable] Failed to fetch vehicle:", error);
    return null;
  }
}
