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

export interface SiteSetting {
  name: string;
  specialist: string;
  description: string;
  logo: string;
  image: string;
}
export async function fetchCurrentSettings(settingId: number): Promise<SiteSetting | null> {
  try {
    const pool = await getDbPool();
    const result = await pool.request()
      .query('SELECT TOP 1 name, specialist, description, logo, image FROM settings');

    const settings = result.recordset.reduce((acc: Record<string, string>, setting: SiteSetting) => {
      acc['name'] = setting.name;
      acc['specialist'] = setting.specialist;
      if (setting.description) acc['description'] = setting.description;
      if (setting.logo) acc['logo'] = setting.logo;
      if (setting.image) acc['image'] = setting.image;
      return acc;
    }, {});

    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
}
