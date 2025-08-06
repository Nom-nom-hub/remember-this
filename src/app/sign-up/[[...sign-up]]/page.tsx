import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-pink-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Remember This</h1>
          <p className="text-gray-600">Create your account to get started</p>
        </div>
        <SignUp 
          path="/sign-up" 
          routing="path" 
          signInUrl="/sign-in"
          redirectUrl="/submit"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-2xl border-0",
            }
          }}
        />
      </div>
    </div>
  )
}
