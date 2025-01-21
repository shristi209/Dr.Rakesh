import { getDbPool } from "@/admin/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pool = await getDbPool();

    let query = 'SELECT * FROM Icons';

    const result = await pool.request()
      .query(query);

    const Icons = result.recordset;
    return NextResponse.json(Icons);

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Icons data' }, { status: 500 });
  }
}