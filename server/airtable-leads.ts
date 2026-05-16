import { ENV } from "./_core/env";

export interface AirtableLeadInput {
  fullName: string;
  phoneNumber: string;
  email?: string;
  vehicleRequested?: string;
  eventDate?: string;
  occasion?: string;
  pickupArea?: string;
  message?: string;
  leadSource?: string;
  leadStatus?: string;
}

/**
 * Create a lead in Airtable Leads table
 * Maps website inquiry data to Airtable fields
 */
export async function createAirtableLead(input: AirtableLeadInput): Promise<boolean> {
  if (!ENV.airtableApiKey || !ENV.airtableBaseId) {
    console.warn("[Airtable Leads] Missing API key or Base ID — skipping lead creation");
    return false;
  }

  try {
    const url = `https://api.airtable.com/v0/${ENV.airtableBaseId}/Leads`;

    const fields: Record<string, unknown> = {
      "Full Name": input.fullName,
      "Phone Number": input.phoneNumber,
    };

    if (input.email) fields["Email"] = input.email;
    if (input.vehicleRequested) fields["Vehicle Requested"] = input.vehicleRequested;
    if (input.eventDate) fields["Event Date"] = input.eventDate;
    if (input.occasion) fields["Occasion"] = input.occasion;
    if (input.pickupArea) fields["Pickup Area"] = input.pickupArea;
    if (input.message) fields["Message"] = input.message;
    if (input.leadSource) fields["Lead Source"] = input.leadSource;
    if (input.leadStatus) fields["Lead Status"] = input.leadStatus;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ENV.airtableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields }],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`[Airtable Leads] API error: ${response.status}`, error);
      return false;
    }

    const data = await response.json();
    console.log(`[Airtable Leads] Lead created successfully:`, data.records[0].id);
    return true;
  } catch (error) {
    console.error("[Airtable Leads] Failed to create lead:", error);
    return false;
  }
}
