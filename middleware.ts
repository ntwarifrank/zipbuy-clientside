/*
import { NextRequest, NextResponse } from "next/server";

export default function loggedin(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  const publicPath = ["/", "/login", "/register"];
  if (publicPath.includes(path)) {
    if (token) {
      return NextResponse.redirect(new URL("/buyingpage", req.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/buyingpage", "/login", "/", "/register", "/checkCart"],
};

*/