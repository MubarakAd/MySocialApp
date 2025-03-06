import Authem from "@/components/authem";
import CreatePost from "@/components/CreatePost";
import prisma from "@/lib/prisma";
export default  function Home() {
  
  return (
    <div className=" grid-cols-1 lg:grid-cols-10">
      <div className="col-span-6">
        <CreatePost/>
      </div>
      <div className="hidden lg:block lg:col-span-4">hello</div>
     
    </div>
  );
}
