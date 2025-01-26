// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { jwtVerify } from 'jose';
// import { getDbPool } from '@/admin/utils/db';

// export async function GET(req: NextRequest) {
//   try {
//     const cookieStore = cookies();
//     const token = cookieStore.get('token')?.value;

//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const secretKey = process.env.JWT_SECRET_KEY;
//     if (!secretKey) {
//       return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
//     }

//     const { payload } = await jwtVerify(
//       token, 
//       new TextEncoder().encode(secretKey)
//     );

//     const email = payload.email as string;

//     // Fetch patient details from the database
//     const patient = await getDbPool().user.findUnique({
//       where: { email },
//       select: {
//         id: true,
//         fullname: true,
//         email: true,
//         phonenumber: true,
//         age: true,
//         gender: true,
//         address: true,
//         bloodgroup: true,
//       }
//     });

//     if (!patient) {
//       return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
//     }

//     return NextResponse.json(patient);
//   } catch (error) {
//     console.error('Error fetching patient details:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
