import { getDbPool } from "@/admin/utils/db";
import { NextResponse } from "next/server";

export interface settingdata {
    id: number;
    name: string;
    specialist: string;
    description: string;
    logo: string;
    image: string;
}
export async function siteSetting() {
  try {
    const pool = await getDbPool();

    let query = 'SELECT TOP 1 id, name, specialist, description, logo, image FROM settings';

    const result = await pool.request()
      .query(query);
    const setting = result.recordset[0];
    return setting || null; 

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings data' }, { status: 500 });
  }
}