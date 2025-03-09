import Authem from "@/components/authem";
import CreatePost from "@/components/CreatePost";
import RecommendedUsers from "@/components/RecommendedUsers";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
export default async function Home() {
  const user =await currentUser()
  return (
    
    <div className="grid grid-cols-1 lg:grid-cols-10 space-x-4">
      <div className="lg:col-span-6">
        {user && <CreatePost/>}
        
      </div>
      <div className="hidden lg:block lg:col-span-4 space-x-4"><RecommendedUsers/></div>
     
    </div>
  );
}
