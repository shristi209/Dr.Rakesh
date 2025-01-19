import { getDbPool } from "@/admin/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        console.log("test")
        const id = req.nextUrl.pathname.split('/').pop() || '';
        const pool = await getDbPool();
        console.log(id);

        let query = 'SELECT * FROM Contact';
        if (id) {
            query = 'SELECT * FROM Contact WHERE id = @id';
        }

        const result = await pool.request()
            .input('id', id)  
            .query(query);

        return NextResponse.json(result.recordset); 

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch contact data' }, { status: 500 });
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
  