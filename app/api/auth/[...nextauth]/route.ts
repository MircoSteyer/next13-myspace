import NextAuth, { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

interface GithubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ account, user }): Promise<boolean> => {
      const res = await fetch("https://api.github.com/user/public_emails", {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `token ${account?.access_token}`,
        },
      });
      const emails: GithubEmail[] = await res.json();

      user.email = emails.find((mail) => mail.primary)?.email;

      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
