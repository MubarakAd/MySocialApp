'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { toggleFollow } from '@/actions/user.actions'
import { Loader2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
const FollowButton = ({userId}:{userId:string}) => {
    const [isLoading,setIsLoading]=useState(false)
    const handleFollow=async()=>{
        setIsLoading(true)
        try {
              await toggleFollow(userId)
              toast.success("following success")
        } catch (error) {
            toast.error("Error following user");
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <Button onClick={handleFollow} disabled={isLoading} variant={'secondary'} className='cursor-pointer text-center'>
       {isLoading?<Loader2Icon className="size-4 animate-spin"/ >:"follow"} </Button>
  )
}

export default FollowButton