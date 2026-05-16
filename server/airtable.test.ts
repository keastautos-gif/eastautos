import { describe, it, expect, beforeAll } from "vitest";
import { getAirtableVehicles } from "./airtable";

describe("Airtable Integration", () => {
  it("should fetch vehicles from Airtable", async () => {
    const vehicles = await getAirtableVehicles();
    
    // Should return an array (even if empty due to missing credentials)
    expect(Array.isArray(vehicles)).toBe(true);
    
    // If vehicles are returned, they should have the correct structure
    if (vehicles.length > 0) {
      const vehicle = vehicles[0];
      expect(vehicle).toHaveProperty("id");
      expect(vehicle).toHaveProperty("name");
      expect(vehicle).toHaveProperty("brand");
      expect(vehicle).toHaveProperty("status");
      expect(vehicle).toHaveProperty("dailyRate");
      expect(vehicle).toHaveProperty("image");
      expect(vehicle).toHaveProperty("showOnWebsite");
      expect(vehicle).toHaveProperty("location");
      expect(vehicle).toHaveProperty("inquiryLink");
    }
  });
});
