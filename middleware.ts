import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }
        
        // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!, { algorithms: ['HS256'] });
        // console.log('Decoded token:', decoded);
        // (request as any).user = decoded;

        return NextResponse.next();

    } catch (error) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: ['/admin', '/admin/', '/app/admin/', '/app/admin/(.*)'],

};