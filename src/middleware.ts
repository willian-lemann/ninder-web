import jwtDecode from "jwt-decode";

import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/api/users/:path*",
    "/api/chats/:path*",
    "/api/messages/:path*",
    "/api/me",
    "/api/accept-regulation",
  ],
};

function createResponse(message: string, options: ResponseInit | undefined) {
  return new NextResponse(JSON.stringify({ success: false, message }), options);
}

function hasToken(request: NextRequest) {
  const token = request.headers
    .get("Authorization")
    ?.split(" ")
    .at(1) as string;

  return token;
}

export function middleware(request: NextRequest) {
  const token = hasToken(request);

  if (!token) return createResponse("No token provided.", { status: 401 });

  const decodedToken = jwtDecode<{ email: string; sub: string }>(token);

  const requestHeaders = new Headers(request.headers);

  console.log(decodedToken);
  requestHeaders.set("userid", decodedToken.sub as string);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
