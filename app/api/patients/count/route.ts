import { NextResponse } from 'next/server';
import { getDbPool } from "@/admin/utils/db";

export async function GET() {
    try {
        const pool = await getDbPool();
        const result = await pool.request().query('SELECT COUNT(*) as count FROM Patients');
        
        return NextResponse.json({ 
            count: result.recordset[0].count 
        });
    } catch (error) {
        console.error("Error fetching patient count:", error);
        return NextResponse.json({ 
            error: 'Failed to fetch patient count' 
        }, { status: 500 });
    }
}
