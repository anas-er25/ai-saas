import {SignIn} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import  Link  from 'next/link'

export default function Page() {
  return(
<div>
    <Link href="/">
        <Button className='mb-4'>Back</Button>
      </Link>
<SignIn/>
</div>
    ) 
    
}
