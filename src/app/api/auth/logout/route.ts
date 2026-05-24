import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  response.cookies.delete('auth_token');
  return response;
}
export async function GET(req: Request) {
  const response = NextResponse.redirect(new URL('/', req.url));
  response.cookies.delete('auth_token');
  return response;
}
