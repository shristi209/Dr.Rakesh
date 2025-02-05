import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from "@/admin/utils/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    if (!fullName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    const pool = await getDbPool();

    await pool.request()
      .input('fullName', fullName)
      .input('email', email)
      .input('phone', phone)
      .input('subject', subject)
      .input('message', message)
      .query('INSERT INTO contactMessage (fullName, email, phone, message, subject) VALUES (@fullName, @email, @phone, @message, @subject)');

    return NextResponse.json(
      { message: 'Message sent successfully!' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json(
      { error: 'Failed to submit message', details: (error as Error).message }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM contactMessage');
    return NextResponse.json(result.recordset, { status: 200 });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages', details: (error as Error).message }, 
      { status: 500 }
    );
  }
}