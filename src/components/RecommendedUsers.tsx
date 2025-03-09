import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRandomUsers } from "@/actions/user.actions";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import FollowButton from "./FollowButton";

const RecommendedUsers = async () => {
  const randomUser = await getRandomUsers();
  if (randomUser.length === 0) return null;
  return (
    
<Card className="">
  <CardHeader>
    <CardTitle>Who to follow</CardTitle>
  </CardHeader>
  <CardContent>
  <div className="space-y-4">
          {randomUser.map((user) => (
            <div key={user.id} className="flex gap-2 items-center justify-between ">
              <div className="flex items-center gap-1">
                <Link href={`/profile/${user.username}`}>
                  <Avatar>
                    <AvatarImage src={user.image ?? "/avatar.png"} />
                  </Avatar>
                </Link>
                <div className="text-xs">
                  <Link href={`/profile/${user.username}`} className="font-medium cursor-pointer">
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">{user._count.followers} followers</p>
                </div>
              </div>
              <FollowButton  userId={user.id} />
            </div>
          ))}
        </div>
        </CardContent>
</Card>


  );
};

export default RecommendedUsers;
