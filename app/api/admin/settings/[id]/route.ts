import { getDbPool } from "@/admin/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const id = 1;
    const pool = await getDbPool();

    let query = 'SELECT * FROM settings';
    if (id) {
      query = 'SELECT * FROM settings WHERE id = @id';
    } else {
      console.log("error")
    }

    const result = await pool.request()
      .input('id', id)
      .query(query);
    const contact = result.recordset[0];
    return NextResponse.json(contact);

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    console.log("Incoming PUT request to update settings");

    const formData = await req.formData();
    console.log("Form Data:", Object.fromEntries(formData));

    // Extract text fields
    const name = formData.get('name')?.toString() || '';
    const specialist = formData.get('specialist')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    
    // Handle file uploads
    const logoFile = formData.get('logo') as File | null;
    const imageFile = formData.get('image') as File | null;

    const id = req.nextUrl.pathname.split('/').pop() || '';
    
    console.log("Extracted ID:", id);
    console.log("Extracted Parameters:", { name, specialist, description });

    if (!id) {
      return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
    }

    const pool = await getDbPool();
    console.log("Database pool acquired successfully");

    let query = 'UPDATE settings SET ';
    const params = [];

    // Handle logo file upload
    let logoPath = '';
    if (logoFile && logoFile instanceof File) {
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      const uniqueFilename = `logo_${Date.now()}_${logoFile.name}`;
      const fullPath = path.join(uploadDir, uniqueFilename);
      
      await writeFile(fullPath, buffer);
      logoPath = `/uploads/${uniqueFilename}`;

      query += 'logo = @logo, ';
      params.push({ name: 'logo', value: logoPath });
    }

    // Handle image file upload
    let imagePath = '';
    if (imageFile && imageFile instanceof File) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      const uniqueFilename = `image_${Date.now()}_${imageFile.name}`;
      const fullPath = path.join(uploadDir, uniqueFilename);
      
      await writeFile(fullPath, buffer);
      imagePath = `/uploads/${uniqueFilename}`;

      query += 'image = @image, ';
      params.push({ name: 'image', value: imagePath });
    }

    // Add other text fields
    if (name) {
      query += 'name = @name, ';
      params.push({ name: 'name', value: name });
    }
    if (specialist) {
      query += 'specialist = @specialist, ';
      params.push({ name: 'specialist', value: specialist });
    }
    if (description) {
      query += 'description = @description, ';
      params.push({ name: 'description', value: description });
    }
    
    if (params.length === 0) {
      return NextResponse.json({ error: 'No update parameters provided' }, { status: 400 });
    }
    
    query = query.slice(0, -2);
    query += ' WHERE id = @id';
    params.push({ name: 'id', value: id });

    const request = pool.request();
    params.forEach((param) => {
      console.log(`Adding parameter: ${param.name} = ${param.value}`);
      request.input(param.name, param.value);
    });

    const result = await request.query(query);
    console.log("Query execution result:", result);

    return NextResponse.json({ 
      message: 'Settings updated successfully!', 
      updatedRows: result.rowsAffected[0],
      name,
      specialist,
      description,
      logoPath,
      imagePath
    });
  } catch (error) {
    const typedError = error as Error;
    console.error("Full error in PUT endpoint:", typedError);
    
    return NextResponse.json({ 
      error: 'Error updating settings', 
      details: typedError.message,
      stack: typedError.stack 
    }, { status: 500 });
  }
}
