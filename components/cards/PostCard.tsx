import { Post } from "@/interfaces/post";
import Link from "next/link";

const PostCard = (post: Post) => {
  return (
    <div>
      <Link href={`blog/${post.slug}`}>
        <h1>{post.title}</h1>
      </Link>
      <p>{post.content}</p>
    </div>
  );
};

export default PostCard;
