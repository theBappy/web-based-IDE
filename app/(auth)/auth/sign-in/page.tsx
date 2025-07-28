import { SignInFormClient } from '@/features/auth/components/sign-in-form-client'
import Image from 'next/image'

const SignInPage = () => {
  return (
    <div className='flex space-y-5 mx-auto flex-col items-center justify-center'>
       <Image src={"/l.svg"} alt="logo" height={250} width={250} /> 
       <SignInFormClient />
    </div>
  )
}

export default SignInPage