import "server-only";
import { Post } from "@/app/interfaces/post";

interface BlogPageProps {
  params: { slug: string };
}
// for ISR
export const revalidate = 600;

// for SSG (ISR when used with revalidate)
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts: Post[] = await fetch("http://localhost:3000/api/content", {
    cache: "default",
  }).then((res) => res.json());

  return posts.map((post) => ({ slug: post.slug }));
}

export async function BlogPage({ params }: BlogPageProps) {
  const posts: Post[] = await fetch("http://localhost:3000/api/content", {
    cache: "default",
  }).then((res) => res.json());

  const post = posts.find((post) => post.slug === params.slug);

  if (!post) return <div>Blog entry {params.slug} does not exist.</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export default BlogPage;
