"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  ArrowRight,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
  File,
} from "lucide-react";
import { useRouter } from "next/navigation";
const tools =[
  {
    label:'Conversation',
    icon: MessageSquare,
    href:'/conversation',
    bgColor:'bg-violet-500/10',
    color:'text-violet-500'
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    href: "/image",
    bgColor:'bg-pink-700/10',
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    href: "/video",
    bgColor:'bg-orange-700/10',
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-emerald-500",
    href: "/code",
    bgColor:'bg-emerald-500/10',
  },
  {
    label: "PDF Generation",
    icon: File,
    color: "text-green-700",
    href: "/pdf",
    bgColor:'bg-green-700/10',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mt-9 text-[#001B79]">
          Welcome to POTA.AI
        </h2>
        <p className="text-muted-foreground text-center text-sm md:text-lg ">Chat with the smartest AI.</p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool)=>(
          <Card onClick={()=> router.push(tool.href)} key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer ">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)}/>
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5"/>
          </Card>
        ))}
      </div>
    </div>
  );
}
