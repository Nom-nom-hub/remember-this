import Navigation from '@/components/Navigation';
import { getPublicMemories } from '@/lib/queries';
import Link from 'next/link';

export default async function MemoriesPage() {
  const memories = await getPublicMemories(50);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 text-amber-300 text-sm font-medium mb-6 border border-amber-400/20 backdrop-blur-sm">
              🌟 Community memories
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Shared
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Memories
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
              Discover the moments that connect us all. Browse memories shared by our community
              and find the connections that matter.
            </p>
          </div>

          {/* Memories Grid */}
          {memories.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {memories.map((memory) => (
                <div
                  key={memory.id}
                  className="group relative bg-gray-900/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                  
                  <div className="relative">
                    {/* Category Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium mb-4">
                      {memory.category}
                    </div>

                    {/* Memory Title */}
                    <h3 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">
                      {memory.title}
                    </h3>

                    {/* Memory Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {memory.description}
                    </p>

                    {/* Timeframe */}
                    {memory.timeframe && (
                      <div className="flex items-center text-gray-400 text-xs mb-4">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {memory.timeframe}
                      </div>
                    )}

                    {/* Tags */}
                    {memory.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {JSON.parse(memory.tags).slice(0, 3).map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md bg-gray-800/50 text-gray-300 text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                        {JSON.parse(memory.tags).length > 3 && (
                          <span className="text-gray-400 text-xs">
                            +{JSON.parse(memory.tags).length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Created Date */}
                    <div className="text-gray-500 text-xs">
                      {new Date(memory.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <button className="w-full text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors">
                        I remember this too →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No memories yet</h3>
              <p className="text-gray-400 mb-6">Be the first to share a memory with the community!</p>
              <Link
                href="/submit"
                className="inline-flex items-center px-6 py-3 text-sm font-semibold text-black bg-gradient-to-r from-amber-400 to-orange-400 rounded-full hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-200"
              >
                Share a Memory
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-900 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400 font-light">&copy; 2025 Remember This. Made with ❤️ for connection.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
