// app/api/testDbConnection/route.ts
import { getDbPool } from '../../../admin/utils/db';

export async function GET() {
  try {
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT 1 AS test');
    console.log('Test query result:', result);
    return new Response(JSON.stringify({ message: 'Database connection successful', result }), { status: 200 });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return new Response(JSON.stringify({ message: 'Database connection failed', error }), { status: 500 });
  }
}
