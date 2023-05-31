import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import FollowClient from "@/components/buttons/FollowClient";

interface FollowButtonProps {
  targetUserId: string;
}

export default async function FollowButton({
  targetUserId,
}: FollowButtonProps) {
  const session = await getServerSession(authOptions);

  const currentUserEmail = session?.user?.email!;
  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentUserEmail,
      },
    })
    .then((user) => user?.id!);

  const isFollowing = await prisma.follows.findFirst({
    where: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });

  console.log("isFollowingSever", isFollowing);

  return (
    <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
  );
}
