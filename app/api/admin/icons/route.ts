import { getDbPool } from "@/admin/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = await getDbPool();

    const query = 'SELECT * FROM Icons';

    const result = await pool.request()
      .query(query);

    const Icons = result.recordset;
    return NextResponse.json(Icons);

  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: 'Failed to fetch Icons data' , details: typedError.message }, { status: 500 });
  }
}