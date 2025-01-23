import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/admin/utils/db';

export async function POST(req: NextRequest) {
  try {
    const { fullname, email, phonenumber, service, date, time, note } = await req.json();
    console.log("Received appointment:", fullname, email, phonenumber, service, date, time, note);

    const pool = await getDbPool();

    const query = `
      INSERT INTO appointments (
        fullname,
        email,
        phonenumber,
        service,
        appointment_date,
        appointment_time,
        note
      )
      VALUES (
        @fullname,
        @email,
        @phonenumber,
        @service,
        @date,
        @time,
        @note
      );
    `;

    const result = await pool.request()
      .input('fullname', fullname)
      .input('email', email)
      .input('phonenumber', phonenumber)
      .input('service', service)
      .input('date', date)
      .input('time', time)
      .input('note', note)
      .query(query);

    return NextResponse.json({ success: true, message: 'Appointment booked successfully!' });

  } catch (error) {
    console.error('Error booking appointment:', error);
    return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
  }
}
