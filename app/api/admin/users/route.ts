import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '../../../../admin/utils/db';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const pool = await getDbPool();

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

    return NextResponse.json({ message: 'User created successfully!' });
  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: 'Error creating user', details: typedError.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const id = url.searchParams.get('id');

    const pool = await getDbPool();

    if (id) {
      const result = await pool
        .request()
        .input('id', id)
        .query('SELECT * FROM Users WHERE id = @id');

      const user = result.recordset[0];
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(user);
    }
    const result = await pool.request().query('SELECT * FROM Users ORDER BY id DESC');
    return NextResponse.json(result.recordset);
  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: 'Error fetching users', details: typedError.message }, { status: 500 });
  }
}
