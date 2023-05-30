import { prisma } from "@/lib/prisma";
import UserCard from "@/components/cards/UserCard";

const UsersPage = async () => {
  const users = await prisma.user.findMany();

  return (
    <div>
      {users.map((user) => (
        <UserCard {...user} key={user.id} />
      ))}
    </div>
  );
};

export default UsersPage;
