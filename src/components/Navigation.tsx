'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="font-serif font-bold text-2xl bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
            >
              Remember This
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-amber-400 transition-colors font-medium text-sm"
            >
              Home
            </Link>
            <Link 
              href="/memories" 
              className="text-gray-300 hover:text-amber-400 transition-colors font-medium text-sm"
            >
              Memories
            </Link>
            
            <SignedIn>
              <Link 
                href="/submit" 
                className="text-gray-300 hover:text-amber-400 transition-colors font-medium text-sm"
              >
                Submit
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }}
                userProfileMode="navigation"
                userProfileUrl="/user-profile"
              />
            </SignedIn>
            
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium text-amber-400 border border-amber-400/30 rounded-full hover:bg-amber-400/10 transition-all duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-amber-400 transition-colors p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
