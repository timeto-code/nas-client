import generateJWT from "@/actions/generateJWT";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  const session = req.auth;
  const jwt = await generateJWT(session);
  if (!jwt) return NextResponse.json({ status: 500 });
  return NextResponse.json({ jwt }, { status: 200 });
});
