import { getDbPool } from "@/admin/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop() || '';
    const pool = await getDbPool();

    // First, get the AboutUs data
    let aboutUsQuery = 'SELECT * FROM AboutUs';
    if (id) {
      aboutUsQuery = 'SELECT * FROM AboutUs WHERE id = @id';
    }

    const aboutUsResult = await pool.request()
      .input('id', id)
      .query(aboutUsQuery);

    const aboutUs = id ? aboutUsResult.recordset[0] : aboutUsResult.recordset;

    // Then, get the AboutUsDetails data
    if (id) {
      const detailsQuery = 'SELECT d.*, i.IconName FROM AboutUsDetails d LEFT JOIN Icons i ON d.icon_id = i.IconID WHERE d.aboutus_id = @id';
      const detailsResult = await pool.request()
        .input('id', id)
        .query(detailsQuery);

      // Combine the results
      return NextResponse.json({
        ...aboutUs,
        aboutUsDetails: detailsResult.recordset
      });
    }

    return NextResponse.json(aboutUs);
  } catch (error) {
    console.error("Error fetching AboutUs data:", error);
    return NextResponse.json({ error: 'Failed to fetch AboutUs data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop() || '';
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { aboutUsData, aboutUsDetailsData } = await req.json();
    console.log("Received data:", { aboutUsData, aboutUsDetailsData });

    if (!aboutUsData) {
      return NextResponse.json({ error: 'AboutUs data is required' }, { status: 400 });
    }

    const pool = await getDbPool();
    const transaction = pool.transaction();

    try {
      await transaction.begin();

      // Update AboutUs table
      const { name, title, description, picture } = aboutUsData;
      const updates = [];

      if (name !== undefined && name !== null) updates.push({ field: 'name', value: name });
      if (title !== undefined && title !== null) updates.push({ field: 'title', value: title });
      if (description !== undefined && description !== null) updates.push({ field: 'description', value: description });
      if (picture !== undefined && picture !== null) updates.push({ field: 'picture', value: picture });

      if (updates.length > 0) {
        const setClause = updates.map((update) => `${update.field} = @${update.field}`).join(', ');
        const query = `UPDATE AboutUs SET ${setClause} WHERE id = @id`;

        const request = transaction.request().input('id', id);
        updates.forEach(update => request.input(update.field, update.value));
        await request.query(query);
      }
      // console.log("Updated AboutUs data:", aboutUsDetailsData);
      // Handle AboutUsDetails - Delete and reinsert pattern like Services
      if (Array.isArray(aboutUsDetailsData)) {
        // First, delete existing details
        await transaction.request()
          .input('aboutus_id', id)
          .query('DELETE FROM AboutUsDetails WHERE aboutus_id = @aboutus_id');

        // Then insert new details
        for (const detail of aboutUsDetailsData) {
          console.log("Inserting detail:", detail.IconID);

          if (!detail.Title || !detail.IconID) continue;
          await transaction.request()
            .input('aboutus_id', id)
            .input('title', detail.Title)
            .input('icon_id', detail.IconID)
            .query(`
              INSERT INTO AboutUsDetails (aboutus_id, title, icon_id)
              VALUES (@aboutus_id, @title, @icon_id)
            `);
        }
      }

      await transaction.commit();
      return NextResponse.json({ message: 'Successfully updated AboutUs and AboutUs Details' });

    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  } catch (error) {
    console.error("Error updating AboutUs data:", error);
    return NextResponse.json({
      error: 'Failed to update AboutUs and AboutUs Details',
      details: (error as Error).message
    }, { status: 500 });
  }
}
