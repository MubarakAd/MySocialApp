'use server'
import prisma from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'


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
export async function getId() {
    const { userId: clerkId } = await auth();
    if (!clerkId) return null 
    const user= await getUser(clerkId)
    if (!user) return null
    return user.id
    
}
export async function getRandomUsers() {
    const userId=await getId()
    if (!userId) return [];
    const randomUser = await prisma.user.findMany({
        where: {
          AND: [
            { NOT: { id: userId } },
            {
                NOT: {
                  followers: {
                    some: {
                      followerId: userId,
                    },
                  },
                },
              },
          ],
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          _count: {
            select: {
              followers: true,
            },
          },
        },
        take: 3,
      });
      
    return randomUser
    
}
export async function toggleFollow(targetId:string) {
    const userId=await getId()
    if (!userId){
        return 
    }
    if (userId===targetId){
         throw new Error("You cannot follow yourself");
    }
    
    try {
        const existingUser =await prisma.follows.findUnique({
            where:{
                followerId_followingId:{
                    followerId:userId,
                    followingId:targetId
                }
                
            }
        })
        if (existingUser){
             await prisma.follows.delete({
                where:{
                    followerId_followingId:{
                        followerId:userId,
                        followingId:targetId
                    }
                }
            })
        }
        else{
            await prisma.$transaction([
                prisma.follows.create({
                    data:{
                        followerId:userId,
                        followingId:targetId
                    }
                }),
                prisma.notification.create({
                    data: {
                        type: "FOLLOW",
                        userId: targetId, // user being followed
                        creatorId: userId, // user following
                      },
                })
    
            ])
        }
        revalidatePath('/')
         return {success:true}
    } catch (error) {
        return {success:false}
    }
   
}

