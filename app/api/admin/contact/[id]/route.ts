import { getDbPool } from "@/admin/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const id = 1;
    const pool = await getDbPool();

    let query = 'SELECT * FROM Contact';
    if (id) {
      query = 'SELECT * FROM Contact WHERE id = @id';
    } else {
      console.log("error")
    }

    const result = await pool.request()
      .input('id', id)
      .query(query);
    const contact = result.recordset[0];
    return NextResponse.json(contact);

  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: 'Error updating user', details: typedError.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { location, email, phone, emergency_num, working_hours, facebook, instagram, twitter} = await req.json();
    const id = req.nextUrl.pathname.split('/').pop() || '';
    const pool = await getDbPool();

    let query = 'UPDATE Contact SET ';
    const params = [];
    if (location) {
      query += 'location = @location, ';
      params.push({ name: 'location', value: location });
    }
    if (email) {
      query += 'email = @email, ';
      params.push({ name: 'email', value: email });
    }
    if (phone) {
      query += 'phone = @phone, ';
      params.push({ name: 'phone', value: phone });
    }
    if (emergency_num) {
      query += 'emergency_num = @emergency_num, ';
      params.push({ name: 'emergency_num', value: emergency_num });
    }
    if (working_hours) {
      query += 'working_hours = @working_hours, ';
      params.push({ name: 'working_hours', value: working_hours });
    }
    if (facebook) {
      query += 'facebook = @facebook, ';
      params.push({ name: 'facebook', value: facebook });
    }
    if (instagram) {
      query += 'instagram = @instagram, ';
      params.push({ name: 'instagram', value: instagram });
    }
    if (twitter) {
      query += 'twitter = @twitter, ';
      params.push({ name: 'twitter', value: twitter });
    }
    query = query.slice(0, -2);
    query += ' WHERE id = @id';
    params.push({ name: 'id', value: id });

    const request = pool.request();
    params.forEach((param) => request.input(param.name, param.value));

    await request.query(query);

    return NextResponse.json({ message: 'User updated successfully!' });
  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: 'Error updating user', details: typedError.message }, { status: 500 });
  }
}
