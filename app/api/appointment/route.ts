import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/admin/utils/db';

export interface AppointData{
  id: number;
  fullname: string;
  email: string;
  phonenumber: string;
  service: string;
  date: string;
  time: string;
  note?: string;
}

export async function getAppointment(): Promise<AppointData[]> {
  try {
    const pool = await getDbPool();
    const query = `
      SELECT TOP 1 id, fullname, email, phonenumber, service, date, time, note from Appointment
    `;
    const detailResult = await pool.request().query(query);
    
    const formattedResults = detailResult.recordset.map(record => {
      // Convert date and time to strings, handling potential Date objects
      const formattedDate = record.date instanceof Date 
        ? record.date.toISOString().split('T')[0]  // YYYY-MM-DD format
        : typeof record.date === 'string'
          ? record.date
          : '';

      const formattedTime = record.time instanceof Date
        ? record.time.toTimeString().split(' ')[0]  // HH:MM:SS format
        : typeof record.time === 'string'
          ? record.time
          : '';

      return {
        ...record,
        date: formattedDate,
        time: formattedTime
      };
    });

    console.log("Formatted data", formattedResults);
    return formattedResults;
  } catch (error) {
    console.error('Detailed Error fetching about data:', error);
    throw error;
  }
}


export async function POST(req: NextRequest) {
  try {
    const { fullname, email, phonenumber, service, date, time, note } = await req.json();
    const pool = await getDbPool();
    const query = `
      INSERT INTO Appointment (
        fullname,
        email,
        phonenumber,
        service,
        date,
        time,
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
