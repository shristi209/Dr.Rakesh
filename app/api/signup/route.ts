import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '../../../admin/utils/db';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    const pool = await getDbPool();

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const existingUser = await pool.request().input('email', email).query('SELECT * FROM Users WHERE email = @email'); 
    
    if (existingUser.recordset.length>0){
      return NextResponse.json(
        { message: 'This email is already signed up. Please use a different email.' },
        { status: 400 }
      );
    }
    
    const result = await pool.request()
      .input('name', name)
      .input('email', email)
      .input('password', passwordHash)
      .query('INSERT INTO Users (name, email, password) VALUES (@name, @email, @password)');

    return NextResponse.json({ message: 'User created successfully!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
