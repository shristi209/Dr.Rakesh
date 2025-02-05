import { getDbPool } from "@/admin/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { appointmentId, status, newTime, newDate } = await req.json();

    if (!appointmentId || !status) {
      return NextResponse.json({ error: 'Missing appointmentId or status' }, { status: 400 });
    }

    const pool = await getDbPool();
    console.log("status, time, date", status, newTime, newDate  )

    if (status=='Rescheduled') {
      const query = `
        UPDATE Appointment
        SET status = @status, time = @time, date = @date
        WHERE id = @appointmentId
      `;
      await pool.request()
        .input('appointmentId', appointmentId)
        .input('status', 'Rescheduled')
        .input('time', newTime)
        .input('date', newDate)
        .query(query);

      return NextResponse.json({ message: 'Appointment rescheduled successfully' });
    } else {
      const query = `
        UPDATE Appointment
        SET status = @status
        WHERE id = @appointmentId
      `;
      await pool.request()
        .input('appointmentId', appointmentId)
        .input('status', status)
        .query(query);

      return NextResponse.json({ message: 'Status updated successfully' });
    }

  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}
