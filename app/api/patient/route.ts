import { getDbPool } from '@/admin/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function ProfileInfo(req: NextRequest) {
  try {
    const pool = await getDbPool();
    const query = `SELECT * FROM Users WHERE id = @id`
    const result = await pool.request()
      .input('id', id)
      .query(query);
    const contact = result.recordset[0];
    return NextResponse.json(contact);
  }
  catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contact data' }, { status: 500 });
  }
}
