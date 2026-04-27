import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const adminPassword = process.env.ADMIN_PASSWORD ?? "happyhomeinteriors2026";

  if (!password || password !== adminPassword) {
    return NextResponse.json(
      { message: "Incorrect password. Please try again." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return response;
}
