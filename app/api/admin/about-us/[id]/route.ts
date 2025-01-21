import { getDbPool } from "@/admin/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop() || '';
    const pool = await getDbPool();
    // console.log("id", id)
    let query = 'SELECT * FROM AboutUs';
    if (id) {
      query = 'SELECT * FROM AboutUs WHERE id = @id';
    } else {
      console.log("error")
    }

    const result = await pool.request()
      .input('id', id)
      .query(query);
    const AboutUs = result.recordset[0];
    // console.log("AboutUs", AboutUs)

    return NextResponse.json(AboutUs);

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch AboutUs data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop() || '';
    if (!id) {
      return NextResponse.json({ error: 'id is missing in the request' }, { status: 400 });
    }

    const { aboutUsData, aboutUsDetailsData } = await req.json();
    const pool = await getDbPool();
    const transaction = pool.transaction();
    await transaction.begin();

    // Step 1: Update the About Us table if data has changed
    const { title, description, picture, name } = aboutUsData;
    const updates = [];
    console.log("aboutus", aboutUsData)

    if (name !== ''||null) updates.push({ field: 'name', value: name });
    if (title !== ''||null) updates.push({ field: 'title', value: title });
    if (description !== ''||null) updates.push({ field: 'description', value: description });
    if (picture !== ''||null) updates.push({ field: 'picture', value: picture });

    if (updates.length > 0) {
      let setClause = updates.map((update) => `${update.field} = @${update.field}`).join(', ');
      let query = `UPDATE AboutUs SET ${setClause} WHERE id = @id`;

      const request = transaction.request().input('id', id);
      updates.forEach(update => request.input(update.field, update.value));

      await request.query(query);
    }

    // Step 2: Handle the About Us Details table (add, update, delete)
    for (const detail of aboutUsDetailsData) {
      console.log("aboutUsDetailsData",aboutUsDetailsData)
      if (detail.DetailID) {
        await transaction.request()
          .input('DetailID', detail.DetailID)
          .input('aboutus_id', id)
          .input('title', detail.title)
          .input('icon_id', detail.iconID)
          .query('UPDATE AboutUsDetails SET title = @title, icon_id = @icon_id WHERE DetailID = @DetailID');
      } else {
        await transaction.request()
          .input('aboutus_id', id)
          .input('title', detail.title)
          .input('icon_id', detail.iconID)
          .query('INSERT INTO AboutUsDetails (aboutus_id, title, icon_id) VALUES (@aboutus_id, @title, @icon_id)');
      }
    }

    // Step 3: Handle deletions for About Us Details (if any DetailIDs are null or marked for deletion)
    const detailsToDelete = aboutUsDetailsData.filter(detail => detail.isDeleted);
    for (const detail of detailsToDelete) {
      await transaction.request()
        .input('DetailID', detail.DetailID)
        .query('DELETE FROM AboutUsDetails WHERE DetailID = @DetailID');
    }

    // Commit the transaction
    await transaction.commit();

    return NextResponse.json({ message: 'Successfully updated About Us and About Us Details' });
  } catch (error) {
    console.error("Error updating About Us data", error);
    return NextResponse.json({ error: 'Failed to update About Us and About Us Details', details: (error as Error).message }, { status: 500 });
  }
}

