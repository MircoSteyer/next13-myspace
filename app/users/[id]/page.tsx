import "server-only";
import { prisma } from "@/lib/prisma";
import UserCard from "@/components/cards/UserCard";
import { notFound } from "next/navigation";
interface UserProfileProps {
  params: {
    id: string;
  };
}
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
