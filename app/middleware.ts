import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
    try {
        console.log('Middleware started'); // Log when middleware is called
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);

        (request as any).user = decoded; 

        return NextResponse.next();

    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}
export const config = {
    matcher: '/api/siignupp',
};
