
import { UserButton, SignInButton } from "@clerk/nextjs";
import {  HomeIcon, BellIcon, UserIcon } from "lucide-react";
import React from "react";
import Mode from "./Mode";
import { Button } from "./ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const DesktopNavbar = async () => {
  const user = await currentUser();
  return (
    <div className="hidden lg:flex items-center gap-2">
      <Mode />
      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/" >
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      {user ? (
        <>
         <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notification" >
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                user?.username ??
                user?.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button className="light:bg-black ">Sign</Button>
        </SignInButton>
      )}
    </div>
  );
};

export default DesktopNavbar;
