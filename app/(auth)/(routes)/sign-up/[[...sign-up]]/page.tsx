import { Button } from '@/components/ui/button'
import {SignUp} from '@clerk/nextjs'
import  Link  from 'next/link'

export default function Page() {
  return(
<div>
    <Link href="/">
        <Button>Back</Button>
      </Link>

<SignUp/>
</div>
    ) 
    
}
