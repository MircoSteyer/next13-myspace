import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (session === null) {
    return NextResponse.json(
      { message: "No active user session found." },
      { status: 403 }
    );
  }

  if (!session.user?.email) {
    return NextResponse.json(
      { message: "Could not find user via e-mail." },
      { status: 404 }
    );
  }

  const data: User = await req.json();
  data.age = Number(data.age);

  const user = await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data,
  });

  return NextResponse.json(user);
}
