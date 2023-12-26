"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import  Link  from "next/link";
import TypewriterComponent from 'typewriter-effect';
export default function landing() {
  return (
    <>
    {/* <h1 className="text-3xl font-bold text-center">Unprotected</h1>
    <div>
      <Link href="/sign-in">
        <Button>Login</Button>
      </Link>
    
      <Link href="/sign-up">
        <Button>Register</Button>
      </Link>
      <Link href="/">
        <Button>Home</Button>
      </Link>
    </div> */}


    <div className="w-full bg-blue-950">

      <nav className="p-4 bg-transparent flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="logo" src="/logo.svg" />
          </div>
          <h3 className="font-bold text-white">POTA.AI</h3>
        </Link>
        <div className="flex items-center gap-x-2">
          <Link href="/sign-up">
            <Button variant="outline" className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <div className="text-white font-bold py-36 text-center space-y-5">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
            <h1>The Best AI Tool For</h1>
            <div className="bg-clip-text dg-gradient-to-r text-pink-700">
              <TypewriterComponent 
              options={{
                strings:[
                  "Chatbot.",
                  "Image Generation.",
                  "Music Generation.",
                  "Code Generation.",
                  "Video Generation.",
                ],
                autoStart:true,
                loop:true
              }}
              />
            </div>
        </div>

            <div className="text-sm md:text-xl font-light text-zinc-400 ">
              Create content using AI 10x faster.
            </div>
            <div>
              <Link href="/sign-up">
              <Button className="rounded-full p-4 md:p-6 md:text-lg font-semibold">
              Start Generating For Free
            </Button>
              </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
              No credit card required. 
            </div>

              <div className="px-10 pt-24 pb-20">
                <h2 className="text-center text-4xl text-white font-extrabold mb-10 ">
                  Testimonials  
                </h2>
              </div>
          
      </div>

    </div>
    </>
  )
}
