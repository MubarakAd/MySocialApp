"use client"; // Ensure this runs on the client side

import Link from "next/link";
import { useEffect, useState } from "react";
import UnAuthenticated from "./UnAuthenticated";
import {
  Card,
  CardContent,
} from "./ui/card";
import { getUser } from "@/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import { MapPinIcon, LinkIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage } from "./ui/avatar";

const SideBar = () => {
  const { user: authUser } = useUser(); // Get authenticated user (Clerk)
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    if (!authUser) return;
    
    const fetchUser = async () => {
      const userData = await getUser(authUser.id);
      setUser(userData);
    };

    fetchUser();
  }, [authUser]);

  if (!authUser) return <UnAuthenticated />;
  if (!user) return null; // Avoid rendering until user data is available

  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-20 h-20 border-2 ">
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
                  <p className="font-medium">{user._count?.following || 0}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium">{user._count?.followers || 0}</p>
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
                    href={user.website}
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
