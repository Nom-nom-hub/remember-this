import Link from "next/link";
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 text-sm font-medium mb-8 border border-amber-400/30 backdrop-blur-sm">
              ✨ Reconnect through shared memories
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[0.9] tracking-tight">
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Remember</span>
              <br />
              <span className="text-white">This</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Find friends who remember what you remember. Share moments, discover connections, and explore the memories that connect us all.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link 
                href="/submit"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-black bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.02] transform"
              >
                Start Remembering
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/memories"
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-gray-300 bg-gray-800/50 border border-gray-600 rounded-full hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
              >
                Explore Memories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Three simple steps to rediscover the connections that matter most
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              <div className="relative bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-amber-500/25">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-4 text-center">
                  Share a Memory
                </h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  Post moments, people, places, or pictures that hold special meaning in your heart
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              <div className="relative bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-amber-500/25">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-4 text-center">
                  Find Connection
                </h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  See who else remembers the same thing and discover shared experiences across time
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              <div className="relative bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-amber-500/25">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-4 text-center">
                  Stay Nostalgic
                </h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  Explore a timeline of collective memories and relive the moments that shaped us all
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400 font-light">&copy; 2025 Remember This. Made with ❤️ for connection.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
