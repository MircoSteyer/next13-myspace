import "server-only";
import Link from "next/link";
import FollowButton from "@/components/buttons/Follow";

interface UserCardProps {
  id: string;
  name: string | null;
  age: number | null;
  image: string | null;
}
const UserCard = ({ id, name, age, image }: UserCardProps) => {
  return (
    <div>
      <img src={image || "/finatix-logo.png"} alt={`${name}'s profile`} />
      <div>
        <h3>
          <Link href={`/users/${id}`}>{name}</Link>
        </h3>
        <p>Age: {age}</p>

        {/* @ts-expect-error Server Component */}
        <FollowButton targetUserId={id} />
      </div>
    </div>
  );
};

export default UserCard;
