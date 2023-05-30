import { NextResponse } from "next/server";
import { Post } from "@/app/interfaces/post";
import { getServerSession } from "next-auth";

const posts: Post[] = [
  {
    title: "First Post",
    slug: "first-post",
    content: "This is the content of the first post.",
  },
  {
    title: "Second Post",
    slug: "second-post",
    content: "This is the content of the second post.",
  },
  {
    title: "Third Post",
    slug: "third-post",
    content: "This is the content of the third post.",
  },
  {
    title: "Fourth Post",
    slug: "fourth-post",
    content: "This is the content of the fourth post.",
  },
  {
    title: "Fifth Post",
    slug: "fifth-post",
    content: "This is the content of the fifth post.",
  },
];

export async function GET() {
  const session = await getServerSession();
  console.log("sessions", session);
  return NextResponse.json(posts);
}
