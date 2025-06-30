import { authCookie } from "@/features/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export interface AuthRequestDto {
  password: string;
}

export const authRoute = "/api/auth";

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("here");
  const { password }: AuthRequestDto = z.object({ password: z.string() }).parse(await req.json());
  if (password !== process.env.SESSION_SECRET) {
    return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
  }
  const res = NextResponse.json({ result: true });
  res.cookies.set({
    name: authCookie,
    value: process.env.SESSION_SECRET,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return res;
}
