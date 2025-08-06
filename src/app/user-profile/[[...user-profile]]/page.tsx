import { UserProfile } from '@clerk/nextjs'

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
            <p className="text-gray-400">Manage your account settings and preferences</p>
          </div>
          
          <div className="flex justify-center">
            <UserProfile 
              path="/user-profile" 
              routing="path"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-2xl bg-gray-800 border border-gray-700",
                  navbar: "bg-gray-900 border-gray-700",
                  navbarMobileMenuButton: "text-white",
                  headerTitle: "text-white",
                  headerSubtitle: "text-gray-400",
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
