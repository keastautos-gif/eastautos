import { ENV } from "./_core/env";

export interface AirtableVehicle {
  id: string;
  name: string;
  brand: string;
  status: "Available" | "Booked" | "Unavailable";
  dailyRate: number;
  image: string;
  showOnWebsite: boolean;
  location: string;
  inquiryLink: string;
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
        name: (record.fields["Vehicle Name"] as string) || "",
        brand: (record.fields["Brand"] as string) || "",
        status: (status === "Available" || status === "Booked" || status === "Unavailable" ? status : "Unavailable") as "Available" | "Booked" | "Unavailable",
        dailyRate: (record.fields["Daily Rate"] as number) || 0,
        image: (record.fields["Vehicle Image"] as string) || "",
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
