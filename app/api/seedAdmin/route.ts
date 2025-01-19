import { NextResponse } from 'next/server';
import { getDbPool } from '../../../../admin/utils/db'; 
import bcrypt from 'bcrypt';

export async function POST() {
  try {
    const pool = await getDbPool();
    const name = 'Admin';
    const email = 'admin@admin.com';
    const password = 'admin123';
    const role = 'admin';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    await pool
      .request()
      .input('name', name)
      .input('email', email)
      .input('password', passwordHash)
      .input('role', role)
      .query(`
        INSERT INTO Users (name, email, password, role)
        VALUES (@name, @email, @password, @role)
      `);

    return NextResponse.json({ message: 'Admin user seeded successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Error seeding admin user', details: error }, { status: 500 });
  }
}
