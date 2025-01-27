import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Create a response to clear cookies
  const response = NextResponse.redirect(new URL('/', request.url));

  // Clear authentication cookies
  response.cookies.delete('token');
  response.cookies.delete('userRole');

  return response;
}
