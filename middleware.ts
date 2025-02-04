import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

interface JWTPayload {
    role: string;
    slug?: string;
    [key: string]: any;
}

export async function middleware(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        const currentPath = request.nextUrl.pathname;

        if (!token) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        const { payload } = await jwtVerify(token, secretKey) as { payload: JWTPayload };

        const response = NextResponse.next();

        response.cookies.set({
            name: 'userRole',
            value: payload.role,
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        const roleRoutes: { [key: string]: string } = {
            'admin': '/admin',
            'patient': '/patientappointment'
        };

        const targetRoute = roleRoutes[payload.role];

        if (payload.role === 'patient') {
            const pathSegments = currentPath.split('/');
            const userSlug = payload.slug;

            if (userSlug && pathSegments[2] !== userSlug) {
                return NextResponse.redirect(new URL(`/patientappointment/${userSlug}/appointments`, request.url));
            }
        }

        if (targetRoute && !currentPath.startsWith(targetRoute)) {
            return NextResponse.redirect(new URL(targetRoute, request.url));
        }

        return response;
    } catch {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: [
        '/(admin|patientappointment)/:path*',
        '/app/(admin|patientappointment)/:path*',
    ],
};
