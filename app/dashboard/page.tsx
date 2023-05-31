import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProfileForm from "@/app/dashboard/ProfileForm";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  console.log("SESSION", session);

  if (session === null) {
    redirect("/api/auth/signin");
  }

  console.log("EMAIL", session.user?.email);
  if (!session.user?.email) return <div></div>;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (user === null) return <div></div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <ProfileForm {...user} />
    </div>
  );
};

export default DashboardPage;
