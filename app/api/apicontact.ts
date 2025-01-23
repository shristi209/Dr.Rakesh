import { getDbPool } from "@/admin/utils/db";

export interface ContactInformation {
  location: string;
  email: string;
  phone: string;
  emergency_num: string;
  working_hours: string;
  facebook: string;
  instagram: string;
  twitter: string;
}

export async function getContactData(contactId: number): Promise<ContactInformation | null> {
  try {
    const pool = await getDbPool();
    const query = `
      SELECT TOP 1 id, location, email, phone, emergency_num, working_hours, facebook, instagram, twitter
      FROM Contact
      WHERE id = @contactId
    `;
    console.log('Executing contact query:', query);
    const result = await pool.request().input('contactId', contactId).query(query);
    const contact = result.recordset[0];

    return contact || null;
  } catch (error) {
    console.error('Error fetching contact data:', error);
    throw error;
  }
}
