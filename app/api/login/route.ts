import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbPool } from '../../../admin/utils/db';
import { generateUniqueSlug } from '@/admin/utils/generateSlug';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    console.log(email,password)
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const pool = await getDbPool();

    const result = await pool
      .request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE email = @email');

    const user = result.recordset[0];
  
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY is not defined');
    }
    
    const userSlug = generateUniqueSlug(user.name);

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role, slug: userSlug},
      process.env.JWT_SECRET_KEY!,
      { expiresIn: '1h', algorithm: 'HS256' }
    );

    const response = NextResponse.json(
      { message: 'Login successful', user: { id: user.id, name: user.name, email: user.email, role: user.role }, token },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: false,
     // secure: process.env.NODE_ENV === 'production'|| false,
      sameSite: 'strict',
      maxAge: 60 * 60
    });
    console.log("token",token)

    return response;


  } catch (error: any) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
