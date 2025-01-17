import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }

        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        const { payload } = await jwtVerify(token, secretKey);

        (request as any).user = payload;

        return NextResponse.next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: ['/admin', '/admin/', '/app/admin/', '/app/admin/(.*)'],
};
