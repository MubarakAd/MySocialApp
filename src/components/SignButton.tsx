'use client'
import { SignInButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'

const SignButtonn = () => {
  return (
    <SignInButton mode="modal">
    <Button variant="default" className="w-full">
      Sign In
    </Button>
  </SignInButton>
  )
}

export default SignButtonn