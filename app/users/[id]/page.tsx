import "server-only";
import { prisma } from "@/lib/prisma";
import UserCard from "@/components/cards/UserCard";
import { notFound } from "next/navigation";
import { Metadata } from "next";
interface UserProfileProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params,
}: UserProfileProps): Promise<Metadata> => {
  const user = await prisma.user.findUnique({ where: { id: params.id } });

  return {
    title: `User profile of ${user?.name}`,
    category: "user data",
  };
};

const UserProfile = async ({ params }: UserProfileProps) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (user === null) return notFound();

  return (
    <div>
      <UserCard {...user} />
    </div>
  );
};

export default UserProfile;
