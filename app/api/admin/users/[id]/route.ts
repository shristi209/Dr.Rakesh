import { getDbPool } from "@/admin/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function GET(req: NextRequest) {
  try {

    const id  = req.nextUrl.pathname.split('/').pop() || '';
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
    const result = await pool.request().query('SELECT * FROM Users');
    return NextResponse.json(result.recordset);
  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: 'Error fetching users', details: typedError.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { name, email, role } = await req.json();
    const id  = req.nextUrl.pathname.split('/').pop() || '';
    console.log("result", id, name, email, role)
    const pool = await getDbPool();

    let query = 'UPDATE Users SET ';
    const params = [];
    if (name) {
      query += 'name = @name, ';
      params.push({ name: 'name', value: name });
    }
    if (email) {
      query += 'email = @email, ';
      params.push({ name: 'email', value: email });
    }
    if (role) {
      query += 'role = @role, ';
      params.push({ name: 'role', value: role });
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

export async function DELETE(req: NextRequest) {
  try {
    const id  = req.nextUrl.pathname.split('/').pop() || '';

    const pool = await getDbPool();

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await pool
      .request()
      .input('id', id)
      .query('DELETE FROM Users WHERE id = @id');

    return NextResponse.json({ message: 'User deleted successfully!' });
  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: 'Error fetching users', details: typedError.message }, { status: 500 });  }
}
