import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from './ui/button'
const UnAuthenticated = () => {
  return (
    <div><Card className='justify-center'>
    <CardHeader>
      <CardTitle className='text-center text font-bold'>Welcome Back!</CardTitle>
    </CardHeader>
    <CardContent className='text-center dark:text-gray-300 text-gray-500 text-sm'>
      <p>Login to access your profile and connect with other</p>
    </CardContent>
    <CardFooter className='flex flex-col gap-2'>
    <SignInButton mode="modal">
    <Button variant="default" className="w-full">
      Sign In
    </Button>
  </SignInButton>
  <SignUpButton mode='modal'>
  <Button variant="outline" className="w-full">
      Sign Up
    </Button>
  </SignUpButton>
    </CardFooter>
  </Card>
  </div>
  )
}

export default UnAuthenticated