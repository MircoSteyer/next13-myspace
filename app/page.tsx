import "server-only";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerSession();
  /*
  if (session === null) {
    redirect("/api/auth/signin");
  }*/
  return <main></main>;
}
