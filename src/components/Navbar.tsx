'use client'
import Link from "next/link";
import React, { useEffect } from "react";

import ClientDesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { callUser } from "@/actions/user.actions";
import { useUser } from "@clerk/nextjs";




const  Navbar = () => {
  const { user: authUser } = useUser()
  useEffect(() => {
    if (!authUser) return;
    
    
  }, [authUser]);
 
//  if (authUser) callUser()
  return (
    <nav className="sticky py-2 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="">
            <Link href="/"className="text-xl font-bold text-primary font-mono tracking-wider">
              MySocial
            </Link>
          </div>
          <ClientDesktopNavbar/>
          <MobileNavbar/>
        </div>
       
      </div>
    </nav>
  );
};

export default Navbar;
