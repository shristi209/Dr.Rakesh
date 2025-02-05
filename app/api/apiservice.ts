import { getDbPool } from "@/admin/utils/db";

export interface ServiceDetailData {
  DetailID: number;
  ServiceTitle: string;
  ServiceDescription: string;
  ServicePicture: string;
  services_id: number;
}
export interface ServiceData {
  id: number;
  Title: string;
  Description: string;
  Name: string;

  details: ServiceDetailData[];
}
export interface ServiceShortData {
  Title: string;
}


export async function getServices(): Promise<ServiceData> {
  try {
    const pool = await getDbPool();
    const query = `
      SELECT TOP 1 s.id, s.Title, s.Description, s.Name
      FROM Services s
    `;
    console.log('Executing service query:', query);
    const result = await pool.request().query(query);
    
    const service = result.recordset[0];
    if (!service) {
      return { id: 0, Title: '', Description: '', Name: '', details: [] };
    }

    const detailQuery = `
      SELECT ServiceTitle, ServiceDescription, ServicePicture, services_id 
      FROM ServicesDetail 
      WHERE services_id = @id
    `;
    console.log('Executing detail query:', detailQuery);
    const detailData = await pool.request()
      .input('id', service.id)
      .query(detailQuery);

    return {
      ...service,
      details: detailData.recordset.map((detail: ServiceDetailData) => ({
        ...detail,
        ServicePicture: detail.ServicePicture ? `/assests${detail.ServicePicture}` : ''
      }))
    };
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}
