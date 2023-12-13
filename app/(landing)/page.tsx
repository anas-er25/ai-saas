import { Button } from "@/components/ui/button";
import  Link  from "next/link";

export default function landing() {
  return (
    <>
    <h1 className="text-3xl font-bold text-center">Unprotected</h1>
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
    </div>
    </>
  )
}
