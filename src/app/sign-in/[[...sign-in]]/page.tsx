import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-pink-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to Remember This</p>
        </div>
        <SignIn 
          path="/sign-in" 
          routing="path" 
          signUpUrl="/sign-up"
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
