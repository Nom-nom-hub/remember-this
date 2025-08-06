'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import MemoryForm, { MemoryFormData } from '@/components/MemoryForm';

// Memory submission function using our API
async function handleMemorySubmit(data: MemoryFormData): Promise<void> {
  try {
    // Parse tags from comma-separated string to array
    const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    
    const memoryData = {
      title: data.title,
      description: data.description,
      category: data.category,
      timeframe: data.timeframe || null,
      tags: tags.length > 0 ? tags : null,
      imageUrl: null, // TODO: Implement image upload
      isPublic: true,
    };

    const response = await fetch('/api/memories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memoryData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Memory submitted successfully:', result);
    
    // TODO: Show success message to user
    // TODO: Redirect to memory page or show success state
  } catch (error) {
    console.error('Error submitting memory:', error);
    throw error; // Re-throw to let the form handle the error state
  }
}

export default function SubmitMemoryPage() {
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
              ✨ Share your memory
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              What Do You
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Remember?
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
              Share a moment, person, place, or experience that holds meaning for you. 
              Help others discover the connections that bind us all together.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-gray-900/30 rounded-3xl border border-gray-700/50 backdrop-blur-sm p-8 sm:p-12">
            <MemoryForm onSubmit={handleMemorySubmit} />
          </div>

          {/* Help Section */}
          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl font-semibold text-white mb-6">
              Tips for Great Memories
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/30 backdrop-blur-sm">
                <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Be Specific</h3>
                <p className="text-gray-300 text-sm">Include details like dates, locations, or names to help others connect with your memory.</p>
              </div>
              
              <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/30 backdrop-blur-sm">
                <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Share Emotions</h3>
                <p className="text-gray-300 text-sm">Describe how the memory made you feel - emotions are what make memories truly memorable.</p>
              </div>
              
              <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/30 backdrop-blur-sm">
                <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Use Tags</h3>
                <p className="text-gray-300 text-sm">Add relevant tags to make your memory discoverable by others with similar experiences.</p>
              </div>
            </div>
          </div>
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
