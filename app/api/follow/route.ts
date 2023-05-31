import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { targetUserId } = await req.json();

  const currentUserEmail = session?.user?.email!;
  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentUserEmail,
      },
    })
    .then((user) => user?.id!);

  const record = await prisma.follows.create({
    data: {
      followingId: targetUserId,
      followerId: currentUserId,
    },
  });

  return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const targetUserId = req.nextUrl.searchParams.get("targetUserId");

  const currentUserEmail = session?.user?.email!;
  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentUserEmail,
      },
    })
    .then((user) => user?.id!);

  const record = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId!,
      },
    },
  });

  return NextResponse.json(record);
}
