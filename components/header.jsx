import React from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
export default function Header() {  
    return (
        <div className="fixed top-0 w-full  bg-white-80   backdrop-blur-md z-50 border-b">

        <nav className="container mx-auto  py-4 flex justify-between items-center">  
            <Link href={"/"} className="flex items-center">
            <Image src={'/logo.png'} width={200} height={60} alt="finwise
            " className="h-12 w-auto object-contain"/>
            </Link>
      
        
        <div className="flex items-center gap-4">
            <SignedIn>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-500 flex items-center gap-2">
                    <Button variant="outline" className="mr-2">
                        <LayoutDashboard size={16}/>
                        <span className="hidden md:inline">Dashboard</span>
                    </Button>   
                </Link>

                <Link href="/transaction/create">
                    <Button  className="mr-2">
                        <PenBox size={16}/>
                        <span className="hidden md:inline">Add Transaction</span>
                    </Button>   
                </Link>


            </SignedIn>
             <SignedOut>    
              <SignInButton forceRedirectUrl="/dashboard"> 
                <Button varient='outline'>Login</Button>
              </SignInButton>
              {/* <SignUpButton /> */}
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }} />
            </SignedIn>
        </div>

              </nav> 
        </div>
    );
}