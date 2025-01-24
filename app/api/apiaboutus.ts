import { getDbPool } from "@/admin/utils/db";

export interface AboutData {
  id: number;
  name: string;
  title: string;
  description: string;
  picture?: string | null;
  details?: AboutDetail[];
}

export interface AboutDetail {
  IconName: string;
  title: string;
}

export async function getAboutData(): Promise<AboutData | null> {
  try {
    const pool = await getDbPool();
    const query = `
      SELECT TOP 1 id, name, title, description, picture
      FROM AboutUs
    `;
    console.log('Executing about query:', query);
    const result = await pool.request().query(query);
    
    // Log raw result for debugging
    console.log('Raw AboutUs result:', result.recordset);

    if (result.recordset.length === 0) {
      console.warn('No AboutUs data found');
      return null;
    }

    const aboutData = result.recordset[0];

    const detailQuery = `
      SELECT Icons.IconName, title
      FROM AboutUsDetails
      LEFT JOIN Icons ON Icons.IconId = AboutUsDetails.icon_id
      WHERE aboutus_id = @id
    `;
    
    const detailResult = await pool.request()
      .input('id', aboutData.id)
      .query(detailQuery);

    console.log('AboutUs Details:', detailResult.recordset);

    return {
      ...aboutData,
      picture: aboutData.picture ? `/${aboutData.picture}` : null,
      details: detailResult.recordset
    };
  } catch (error) {
    console.error('DETAILED Error fetching about data:', error);
    throw error;
  }
}
