import { NextRequest, NextResponse } from "next/server";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: "/api/:function*",
};

function createResponse(message: string, options: ResponseInit | undefined) {
  return new NextResponse(JSON.stringify({ success: false, message }), options);
}

function hasTokenValid(request: NextRequest) {
  return false;
}

function hasToken(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ").at(1);
  return token;
}

export function middleware(request: NextRequest, response: NextResponse) {
  if (!hasToken(request)) {
    return createResponse("No token provided.", { status: 401 });
  }

  // if (!hasTokenValid(request)) {
  //   return createResponse("Unauthorized. Token is not valid.", {
  //     status: 401,
  //   });
  // }
}
