import { STORAGE_KEY } from "@constants/login/auth";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/api/users",
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get(STORAGE_KEY);

  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: "authentication failed", statusCode: 401 }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  return NextResponse.next();
}
