'use server'
import prisma from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'


export  async function callUser(){
    const {userId}=await auth()
    const user=await currentUser()
   
    if (!userId || !user) {
        return 
    }
    const existingUser=await prisma.user.findUnique({
        where:{
            clerkId:userId
        }
    })
if (existingUser){
    return existingUser
} 
console.log("existinguser is",existingUser)
    try {
        const dbUser =await prisma.user.create({
            data: {
                clerkId: userId,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl,
              },
        })
        return dbUser
    } catch (error) {
        console.log("error is", error)
    }
 
}
export async function getUser(clerkId:string){
    const user= await prisma.user.findUnique({
        where:{
            clerkId
        },
        include:{
            _count:{
                select:{
                    followers:true,
                    following:true,
                    posts:true
                }
            }
        }
    })
    if (!user){
        return null
    }
    return user
}

