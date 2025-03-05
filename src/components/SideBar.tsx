import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import UnAuthenticated from "./UnAuthenticated";
import AuthenticatedUser from "./AuthenticatedUser";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { getUser } from "@/actions/user.actions";
import { Link, MapPinIcon, LinkIcon } from "lucide-react";

import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const SideBar = async () => {
  const authUser = await currentUser();
  if (!authUser) {
    return <UnAuthenticated />;
  }
  const user = await getUser(authUser.id);
  if (!user) return null;
  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
          <Link
  href={`/profile/${user.username}`}
  className="flex flex-col items-center justify-center"
  suppressHydrationWarning
>
  <Avatar className="w-20 h-20 border-2">
    <AvatarImage src={user.image || "/avatar.png"} />
  </Avatar>
  <div className="mt-4 space-y-1">
    <h3 className="font-semibold">{user.name}</h3>
    <p className="text-sm text-muted-foreground">{user.username}</p>
  </div>
</Link>


            {user.bio && (
              <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
            )}

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {user.location || "No location"}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {user.website ? (
                  <a
                    href={`${user.website}`}
                    className="hover:underline truncate"
                    target="_blank"
                  >
                    {user.website}
                  </a>
                ) : (
                  "No website"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SideBar;
