"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export const SignIn = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (status === "authenticated") {
    return (
      <Link href={"/dashboard"}>
        <Image
          src={session?.user?.image ?? "/finatix.logo.png"}
          width={32}
          height={32}
          alt={"Profile Picture"}
        />
      </Link>
    );
  }

  return <button onClick={() => signIn()}>Sign In</button>;
};

export default SignIn;
