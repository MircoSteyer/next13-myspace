import "server-only";
import { Post } from "@/interfaces/post";
import PostCard from "@/components/cards/PostCard";
const BlogPage = async () => {
  const posts: Post[] = await fetch(
    "https://next13-myspace-mircosteyer.vercel.app/api/content"
  ).then((res) => res.json());

  return (
    <div>
      {posts.map((post) => (
        <>
          <PostCard {...post} key={post.slug} />
          <hr />
          <br />
        </>
      ))}
    </div>
  );
};

export default BlogPage;
