import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    
    <div className="px-4 lg:px-8 flex pt-5 items-center gap-x-3 mb-8 mt-2">
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        <Icon className={cn("w-10 h-10", iconColor)} />
      </div>
      <div>
        <h1 className="text-x text-white lg:text-3xl md:text-2xl font-bold">{title}</h1>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </div>
   
  );
};

export default Heading;
