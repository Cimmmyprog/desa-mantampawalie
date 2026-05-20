import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import { hashPassword, signToken } from "../../../../src/utils/auth";

export async function POST(request: Request) {
  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Email atau password salah" },
      { status: 401 }
    );
  }

  if (user.password !== hashPassword(body.password)) {
    return NextResponse.json(
      { message: "Email atau password salah" },
      { status: 401 }
    );
  }

  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return NextResponse.json({
    message: "Login berhasil",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}