"use server"
import prisma from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { getId } from './user.actions'
import { revalidatePath } from 'next/cache'

export  async function CreatePostAPi( content:string,image:string) {

    try {
        const userId = await getId();
    
        if (!userId) return;
    
        const post = await prisma.post.create({
          data: {
            content,
            image,
            authorId: userId,
          },
        });
    
        revalidatePath("/"); // 
        return { success: true, post };
      } catch (error) {
        console.error("Failed to create post:", error);
        return { success: false, error: "Failed to create post" };
      }

}

