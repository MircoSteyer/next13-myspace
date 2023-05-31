"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface FollowButtonClientProps {
  targetUserId: string;
  isFollowing: boolean;
}

const FollowButtonClient = ({
  targetUserId,
  isFollowing,
}: FollowButtonClientProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  console.log("isfollowing", isFollowing);

  const follow = async () => {
    setIsFetching(true);

    const res = await fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify({ targetUserId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsFetching(false);

    startTransition(() => router.refresh());
  };

  const unfollow = async () => {
    setIsFetching(true);

    const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
      method: "DELETE",
    });

    setIsFetching(false);

    startTransition(() => router.refresh());
  };

  if (isFollowing) {
    return (
      <button onClick={unfollow}>{!isMutating ? "Unfollow" : "..."}</button>
    );
  }

  if (!isFollowing) {
    return <button onClick={follow}>{!isMutating ? "Follow" : "..."}</button>;
  }

  return <div></div>;
};

export default FollowButtonClient;
