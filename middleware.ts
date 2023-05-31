"use client";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  console.log("visiting page", request.url);
  const session = await fetch("http://localhost:3000/api/auth/session").then(
    (res) => res.json()
  );
  console.log("session", session);
  return NextResponse.next();
}

export const config = {
  matcher: ["/about"],
};
