import { getDbPool } from "@/admin/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT ServiceTitle FROM ServicesDetail');
    return NextResponse.json(result.recordset);
  } catch (error) {
    const typedError = error as Error;
      return NextResponse.json({ error: 'Error fetching users', details: typedError.message }, { status: 500 });
    }
  }