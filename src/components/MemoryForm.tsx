'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';

// Types
export type MemoryCategory = 'Person' | 'Place' | 'Thing' | 'Moment' | 'Picture';

export interface MemoryFormData {
  title: string;
  category: MemoryCategory;
  description: string;
  tags: string; // comma-separated string
  timeframe?: string;
  image: File | null;
}

interface MemoryFormProps {
  onSubmit: (data: MemoryFormData) => Promise<void>;
  isSubmitting?: boolean;
  initialData?: Partial<MemoryFormData>;
}

interface FormInputs {
  title: string;
  category: MemoryCategory;
  description: string;
  tags: string;
  image: FileList | null;
}

const CATEGORY_OPTIONS: { value: MemoryCategory; label: string; icon: string }[] = [
  { value: 'Person', label: 'Person', icon: '👤' },
  { value: 'Place', label: 'Place', icon: '📍' },
  { value: 'Thing', label: 'Thing', icon: '🏷️' },
  { value: 'Moment', label: 'Moment', icon: '⭐' },
  { value: 'Picture', label: 'Picture', icon: '📷' },
];

export default function MemoryForm({ onSubmit, isSubmitting = false, initialData }: MemoryFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      title: initialData?.title || '',
      category: initialData?.category || 'Moment',
      description: initialData?.description || '',
      tags: initialData?.tags || '',
      image: null,
    },
  });

  const watchedImage = watch('image');

  // Handle image preview
  const handleImageChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Watch for image changes
  React.useEffect(() => {
    handleImageChange(watchedImage);
  }, [watchedImage]);

  const onFormSubmit = async (data: FormInputs) => {
    try {
      setSubmitStatus('idle');
      
      // Get the first image file or null
      const image = data.image && data.image.length > 0 ? data.image[0] : null;

      const memoryData: MemoryFormData = {
        title: data.title,
        category: data.category,
        description: data.description,
        tags: data.tags, // Keep as string
        image,
      };

      await onSubmit(memoryData);
      setSubmitStatus('success');
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Banner */}
      {submitStatus === 'success' && (
        <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-green-400 font-medium">Memory submitted successfully!</h3>
              <p className="text-green-300/80 text-sm">Your memory has been shared and others can now find it.</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {submitStatus === 'error' && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-red-400 font-medium">Something went wrong</h3>
              <p className="text-red-300/80 text-sm">Please try again or contact support if the problem persists.</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white mb-3">
            Memory Title *
          </label>
          <input
            type="text"
            id="title"
            {...register('title', {
              required: 'Title is required',
              maxLength: {
                value: 100,
                message: 'Title must be 100 characters or less',
              },
            })}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all backdrop-blur-sm"
            placeholder="What do you remember?"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>

        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-white mb-3">
            Category *
          </label>
          <select
            id="category"
            {...register('category', { required: 'Please select a category' })}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all backdrop-blur-sm"
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                {option.icon} {option.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-2 text-sm text-red-400">{errors.category.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-white mb-3">
            Description *
          </label>
          <textarea
            id="description"
            rows={5}
            {...register('description', {
              required: 'Description is required',
              maxLength: {
                value: 1000,
                message: 'Description must be 1000 characters or less',
              },
            })}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all resize-none backdrop-blur-sm"
            placeholder="Describe your memory in detail..."
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>

        {/* Tags Field */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-white mb-3">
            Tags <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            id="tags"
            {...register('tags')}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all backdrop-blur-sm"
            placeholder="music, friends, summer, 90s (comma-separated)"
          />
          <p className="mt-2 text-sm text-gray-400">
            Add tags to help others find your memory. Separate with commas.
          </p>
        </div>

        {/* Image Upload Field */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-white mb-3">
            Image <span className="text-gray-400">(optional)</span>
          </label>
          <div className="space-y-4">
            <input
              type="file"
              id="image"
              accept=".jpg,.jpeg,.png,.webp"
              {...register('image')}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-amber-400/20 file:text-amber-400 hover:file:bg-amber-400/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all backdrop-blur-sm"
            />
            {imagePreview && (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={400}
                  height={300}
                  className="w-full max-w-sm mx-auto rounded-xl border border-gray-600"
                  style={{ objectFit: 'contain' }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    // Reset the file input
                    const fileInput = document.getElementById('image') as HTMLInputElement;
                    if (fileInput) fileInput.value = '';
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full text-white hover:bg-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Accepts JPEG, PNG, or WebP images up to 10MB.
          </p>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.02] transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Share Memory
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </>
            )}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-300 bg-gray-800/50 border border-gray-600 rounded-full hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
