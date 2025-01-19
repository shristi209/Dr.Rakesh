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
    const result = await pool.request().query('SELECT * FROM Users');
    return NextResponse.json(result.recordset);
  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: 'Error fetching users', details: typedError.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, email, password, role } = await req.json();
    const pool = await getDbPool();

    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;

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
    if (passwordHash) {
      query += 'password = @password, ';
      params.push({ name: 'password', value: passwordHash });
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

// export async function DELETE(req: NextRequest) {
//   try {
//     const url = req.nextUrl;
//     const id = url.searchParams.get('id');

//     const pool = await getDbPool();

//     if (!id) {
//       return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
//     }

//     await pool
//       .request()
//       .input('id', id)
//       .query('DELETE FROM Users WHERE id = @id');

//     return NextResponse.json({ message: 'User deleted successfully!' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error deleting user', details: error.message }, { status: 500 });
//   }
// }
