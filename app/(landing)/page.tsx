"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import  Link  from "next/link";
import TypewriterComponent from 'typewriter-effect';
import { useAuth } from "@clerk/nextjs";
const testimonials=[
  {
    name:'ER-RAKIBI Anas',
    avatar:'/avatar/anas.jpeg',
    title: 'Web Developper'
  },
  {
    name:'ELALAOUI Abdelkarim',
    avatar:'/avatar/alawi.jpg',
    title: 'Web Developper'
  }
];
export default function landing() {
  const {isSignedIn} = useAuth();
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


    <div className="w-full bg-[#111827] overflow-auto">

      <nav className="pe-5 ps-5 bg-transparent flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative h-24 w-24 mr-4">
            <Image fill alt="logo" src="/logo.svg" />
          </div>
        </Link>
        <div className="flex items-center gap-x-2">
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button variant="outline" className="rounded-full hover:bg-[#ec2d3e] border-none font-bold">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <div className="text-white font-bold py-36 text-center space-y-5">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
            <h1>The Best AI Tool For</h1>
            <div className="bg-clip-text dg-gradient-to-r text-[#ec2d3e]">
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
              <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button className="rounded-full p-4 md:p-6 md:text-lg font-semibold bg-[#ec2d3e] hover:bg-[#ec2d3db7]">
              Start Generating For Free
            </Button>
              </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
              No credit card required. 
            </div>

              <div className="px-10 pt-20 pb-5">
                <h2 className="text-center text-4xl text-white font-extrabold mb-10 ">
                  Testimonials  
                </h2>
              </div>
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
                {testimonials.map((item)=>(
                  <Card key={item.name} className="bg-[#192339] border-none text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-x-2">
                        <div>
                          <p className="text-lg">{item.name}</p>
                          <p className="text-zinc-400 text-sm">{item.title}</p>
                        </div>
                      </CardTitle>
                      <CardContent className="pt-4 px-0 text-zinc-400 text-sm">
                        {item.description}
                      </CardContent>
                    </CardHeader>
                  </Card>
                ))}
              </div>
           */}
           
        <div className="container px-5 mx-auto text-center">
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-2 md:space-y-0">
            {testimonials.map((item)=>(
                <div key={item.name} className="md:w-1/2 flex flex-col p-6 space-y-2 items-center rounded-lg border border-gray-700 bg-gray-700">
                    <img src={item.avatar} alt="{item.name} avatar" className="w-16 rounded-full -mt-12"/>
                    <h5 className="font-bold text-lg text-slate-900">{item.name}</h5>
                    <p className="leading-5 text-sm ">{item.title}</p>
                </div>
                ))}
                
            </div>
            
        </div>
      </div>

    </div>
    </>
  )
}
