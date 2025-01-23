import { getDbPool } from "@/admin/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop() || '';
    const pool = await getDbPool();

    // First, get the Services data
    let servicesQuery = 'SELECT * FROM Services';
    if (id) {
      servicesQuery = 'SELECT * FROM Services WHERE id = @id';
    }

    const servicesResult = await pool.request()
      .input('id', id)
      .query(servicesQuery);
    
    const services = id ? servicesResult.recordset[0] : servicesResult.recordset;

    // Then, get the ServicesDetail data
    if (id) {
      const detailsQuery = 'SELECT * FROM ServicesDetail WHERE services_id = @id';
      const detailsResult = await pool.request()
        .input('id', id)
        .query(detailsQuery);

      // Combine the results
      return NextResponse.json({
        ...services,
        servicesDetails: detailsResult.recordset
      });
    }

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching Services data:", error);
    return NextResponse.json({ error: 'Failed to fetch Services data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop() || '';
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { servicesData, servicesDetailsData } = await req.json();
    console.log("Received data:", { servicesData, servicesDetailsData });

    if (!servicesData) {
      return NextResponse.json({ error: 'Services data is required' }, { status: 400 });
    }

    const pool = await getDbPool();
    const transaction = pool.transaction();

    try {
      await transaction.begin();

      // Update Services table
      const { Name, Title, Description } = servicesData;
      const updates = [];

      if (Title !== undefined && Title !== null) updates.push({ field: 'Title', value: Title });
      if (Description !== undefined && Description !== null) updates.push({ field: 'Description', value: Description });
      if (Name !== undefined && Name !== null) updates.push({ field: 'Name', value: Name });

      if (updates.length > 0) {
        const setClause = updates.map((update) => `${update.field} = @${update.field}`).join(', ');
        const query = `UPDATE Services SET ${setClause} WHERE id = @id`;

        const request = transaction.request().input('id', id);
        updates.forEach(update => request.input(update.field, update.value));
        await request.query(query);
      }

      // Handle ServicesDetails
      if (Array.isArray(servicesDetailsData)) {
        // First, delete existing details
        await transaction.request()
          .input('services_id', id)
          .query('DELETE FROM ServicesDetail WHERE services_id = @services_id');

        // Then insert new details
        for (const detail of servicesDetailsData) {
          if (!detail.Title || !detail.Description) continue;

          await transaction.request()
            .input('services_id', id)
            .input('Title', detail.Title)
            .input('Description', detail.Description)
            .input('Picture', detail.Picture || null)
            .query(`
              INSERT INTO ServicesDetail (services_id, Title, Description, Picture)
              VALUES (@services_id, @Title, @Description, @Picture)
            `);
        }
      }

      await transaction.commit();
      return NextResponse.json({ message: 'Successfully updated Services and Services Details', status: 'success' });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error updating Services data:", error);
    throw error;
  }
}
