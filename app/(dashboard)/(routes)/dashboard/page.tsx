import { UserButton } from "@clerk/nextjs";

export default function landing() {
    return (
      <>
      <h1 className="text-3xl font-bold text-center">Protected</h1>
      <UserButton afterSignOutUrl="/"/>
      </>
    )
  }
  