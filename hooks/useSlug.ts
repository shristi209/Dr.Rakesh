import { NextRequest } from 'next/server';
import { headers } from 'next/headers';

export const useSlug = (req?: NextRequest) => {
    if (req) {
        return req.nextUrl.pathname.split('/').pop() || '';
    }
    
    // For server components
    const headersList = headers();
    const pathname = headersList.get('x-invoke-path') || '';
    return pathname.split('/').pop() || '';
};
