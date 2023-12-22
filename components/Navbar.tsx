import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./Mobile-Sidebar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4 bg-[#0e183d]">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
