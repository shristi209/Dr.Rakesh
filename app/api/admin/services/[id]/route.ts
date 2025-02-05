import { getDbPool } from "@/admin/utils/db";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from 'fs';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop() || '';
    const pool = await getDbPool();

    // First, get the Services data
    let servicesQuery = 'SELECT * FROM Services';
    if (id) {
      servicesQuery = 'SELECT * FROM Services WHERE id = @id';
    }

    const servicesResult = await pool.request()
      .input('id', id)
      .query(servicesQuery);

    const services = id ? servicesResult.recordset[0] : servicesResult.recordset;

    // Then, get the ServicesDetail data
    if (id) {
      const detailsQuery = 'SELECT * FROM ServicesDetail WHERE services_id = @id';
      const detailsResult = await pool.request()
        .input('id', id)
        .query(detailsQuery);

      // Combine the results
      return NextResponse.json({
        ...services,
        servicesDetails: detailsResult.recordset
      });
    }

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching Services data:", error);
    return NextResponse.json({ error: 'Failed to fetch Services data' }, { status: 500 });
  }
}

// Ensure assests directory exists and is writable
const uploadDir = path.join(process.cwd(), 'public', 'assests');
try {
  // Create directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  // Check directory permissions
  fs.accessSync(uploadDir, fs.constants.W_OK);
  console.log(`Upload directory is writable: ${uploadDir}`);
} catch (dirError) {
  console.error('Error with upload directory:', {
    path: uploadDir,
    error: dirError
  });
  throw new Error(`Cannot access upload directory: ${dirError.message}`);
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop() || '';
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const { servicesData, servicesDetailsData } = await req.json();

    if (!servicesData) {
      return NextResponse.json({ error: 'Services data is required' }, { status: 400 });
    }

    const pool = await getDbPool();
    const transaction = pool.transaction();

    try {
      await transaction.begin();

      const { Name, Title, Description } = servicesData;

      const updates = [];

      if (Title !== undefined && Title !== null) updates.push({ field: 'Title', value: Title });
      if (Description !== undefined && Description !== null) updates.push({ field: 'Description', value: Description });
      if (Name !== undefined && Name !== null) updates.push({ field: 'Name', value: Name });


      if (updates.length > 0) {
        const setClause = updates.map((update) => `${update.field} = @${update.field}`).join(', ');
        const query = `UPDATE Services SET ${setClause} WHERE id = @id`;

        const request = transaction.request().input('id', id);
        updates.forEach(update => request.input(update.field, update.value));
        await request.query(query);
      }

      if (Array.isArray(servicesDetailsData)) {

        for (const detail of servicesDetailsData) {
          if (!detail.ServiceTitle || !detail.ServiceDescription) {
            console.warn(`Skipping invalid service detail: ${JSON.stringify(detail)}`);
            continue;
          }
          let servicePicturePath = null;
          if(detail.ServicePicture){
            // If ServicePicture is a string (filename or path)
            if (typeof detail.ServicePicture === 'string') {
              // If it's already a path or URL, use it directly
              if (detail.ServicePicture.startsWith('/') || detail.ServicePicture.startsWith('http')) {
                servicePicturePath = detail.ServicePicture;
              } else {
                // Use the original filename if it's just a filename
                servicePicturePath = `/${detail.ServicePicture}`;
              }
            } 
            // If it's an array with file object (from multipart form)
            else if (Array.isArray(detail.ServicePicture) && detail.ServicePicture[0]) {
              const file = detail.ServicePicture[0];
              
              // Safely extract file extension
              const fileExtension = file.OriginalFilename 
                ? path.extname(file.OriginalFilename) 
                : path.extname(file.filepath || '');
              
              const uniqueFilename = `service_${Date.now()}${fileExtension}`;
              const filePath = path.join(uploadDir, uniqueFilename);
              
              // Ensure filepath exists before moving
              if (file.filepath) {
                try {
                  // Move the file to the upload directory
                  fs.renameSync(file.filepath, filePath);
                  
                  // Verify file was moved
                  if (fs.existsSync(filePath)) {
                    const stats = fs.statSync(filePath);
                    console.log('File uploaded successfully:', {
                      path: `/${uniqueFilename}`,
                      size: stats.size
                    });
                    servicePicturePath = `/${uniqueFilename}`;
                  } else {
                    console.error('Failed to upload file');
                  }
                } catch (moveError) {
                  console.error('Error uploading file:', {
                    error: moveError,
                    stack: moveError.stack
                  });
                }
              } else {
                console.warn('No filepath found for uploaded file', { file });
              }
            }
            // Handle base64 image
            else if (typeof detail.ServicePicture === 'string' && detail.ServicePicture.startsWith('data:image')) {
              const matches = detail.ServicePicture.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
              if (matches) {
                const ext = matches[1];
                const base64Data = matches[2];
                const uniqueFilename = `service_${Date.now()}.${ext}`;
                const filePath = path.join(uploadDir, uniqueFilename);
                
                try {
                  // Write base64 to file
                  fs.writeFileSync(filePath, base64Data, { 
                    encoding: 'base64',
                    mode: 0o666 // Read and write permissions for everyone
                  });

                  // Verify file was written
                  if (fs.existsSync(filePath)) {
                    const stats = fs.statSync(filePath);
                    console.log('Base64 image uploaded successfully:', {
                      path: `${uniqueFilename}`,
                      size: stats.size
                    });
                    servicePicturePath = `${uniqueFilename}`;
                  } else {
                    console.error('Failed to upload base64 image');
                  }
                } catch (base64Error) {
                  console.error('Error uploading base64 image:', base64Error);
                }
              }
            }
          }

          try {
            if (detail.id) {
              await transaction.request()
                .input('id', detail.id)
                .input('ServiceTitle', detail.ServiceTitle)
                .input('ServiceDescription', detail.ServiceDescription)
                .input('ServicePicture', detail.ServicePicture || null)
                .query(`
                  UPDATE ServicesDetail 
                  SET 
                    ServiceTitle = @ServiceTitle, 
                    ServiceDescription = @ServiceDescription, 
                    ServicePicture = @ServicePicture
                  WHERE id = @id
                `);
              
              console.log(`Successfully updated service detail: ${detail.ServiceTitle}`);
            } else {
              // Insert new service detail
              await transaction.request()
                .input('services_id', id)
                .input('ServiceTitle', detail.ServiceTitle)
                .input('ServiceDescription', detail.ServiceDescription)
                .input('ServicePicture', servicePicturePath || detail.ServicePicture || null)
                .query(`
                  INSERT INTO ServicesDetail (services_id, ServiceTitle, ServiceDescription, ServicePicture)
                  VALUES (@services_id, @ServiceTitle, @ServiceDescription, @ServicePicture)
                `);
              
              console.log(`Successfully inserted service detail: ${detail.ServiceTitle}`);
            }
          } catch (insertError) {
            console.error('Error processing ServicesDetail:', {
              detail: detail,
              fullError: JSON.stringify(insertError, null, 2)
            });

            throw insertError;
          }
        }
      } else {
        console.warn('servicesDetailsData is not an array:', servicesDetailsData);
      }

      await transaction.commit();
      return NextResponse.json({ message: 'Successfully updated Services and Services Details', status: 'success' });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error updating Services data:", error);
    throw error;
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop() || '';
    const pool = await getDbPool();
    
    await pool.request()
      .input('id', id)
      .query('DELETE FROM ServicesDetail WHERE id = @id');

    await pool.request()
      .input('id', id)
      .query('DELETE FROM Services WHERE id = @id');
    
    return NextResponse.json({ 
      message: 'Successfully deleted Services and associated details', 
      status: 'success' 
    });
  } catch (error) {
    console.error("Error deleting Services:", error);
  }
}
