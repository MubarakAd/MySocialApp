'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Mode from "./Mode";
const Authem = () => {
  return (
    <><header >
    <SignedOut>
      <SignInButton >
        <Button className="bg-black text-white ">Sign</Button>
        </SignInButton>
      <SignUpButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
   
  </header>
   <Mode/></>
    
  )
}

export default Authem