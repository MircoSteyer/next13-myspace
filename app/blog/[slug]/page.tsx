import "server-only";
import { Post } from "@/app/interfaces/post";

interface BlogPageProps {
  params: { slug: string };
}
// for ISR
export const revalidate = 600;

// for SSG (ISR when used with revalidate)

export async function generateStaticParams() {
  const posts: Post[] = await fetch(
    "https://next13-myspace-mircosteyer.vercel.app/api/content"
  ).then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const posts: Post[] = await fetch(
    "https://next13-myspace-mircosteyer.vercel.app/api/content",
    {
      cache: "default",
    }
  ).then((res) => res.json());

  const post = posts.find((post) => post.slug === params.slug);

  if (!post) return <div>Blog entry {params.slug} does not exist.</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPage;
