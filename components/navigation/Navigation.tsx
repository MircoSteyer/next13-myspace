import Image from "next/image";
import Link from "next/link";
import "server-only";
import SignIn from "@/components/buttons/SignIn";
import NavigationItem from "@/components/navigation/NavigationItem";
import SignOut from "@/components/buttons/SignOut";

const Navigation = () => {
  return (
    <nav className="flex h-14 items-center justify-between bg-red-400">
      <Link href="/">
        <Image
          className="h-full w-auto"
          width={0}
          height={0}
          src="/finatix-logo.png"
          sizes={"100vw"}
          alt="Finatix Logo"
          priority
        ></Image>
      </Link>
      <ul className="mr-4 flex list-none">
        <NavigationItem>
          <Link href={"/about"}>About</Link>
        </NavigationItem>
        <NavigationItem>
          <Link href={"/blog"}>Blog</Link>
        </NavigationItem>
        <NavigationItem>
          <Link href={"/users"}>Users</Link>
        </NavigationItem>
        <NavigationItem>
          <SignIn />
        </NavigationItem>
        <NavigationItem>
          <SignOut />
        </NavigationItem>
      </ul>
    </nav>
  );
};

export default Navigation;
