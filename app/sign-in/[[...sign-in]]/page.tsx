'use client'

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100">
      <SignIn 
        path="/sign-in"
        routing="path"
        appearance={{
          elements: {
            // Hides footer actions, footer links, and Clerk branding
            footer: "hidden",
            footerItem: "hidden",
            footerAction: "hidden",
            footerActionLink: "hidden",
          },
        }}
      />
    </div>
  )
}