import { Suspense } from 'react'
import SignUpClient from './SignUpClient'

export const metadata = {
  title: 'Sign Up | Jetpackers AI',
  description:
    'Join Shaan & Deb for a 3-hour live session on 12 April. No tech experience needed.',
}

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpClient />
    </Suspense>
  )
}
