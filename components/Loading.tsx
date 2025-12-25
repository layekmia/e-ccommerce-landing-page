"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-rose-50">
      <div className="text-center space-y-6 px-4">
        {/* Animated Logo/Icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 animate-spin">
              <div className="w-full h-full rounded-full border-4 border-transparent border-t-white border-r-white"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Loading...
          </h2>
          <p className="text-gray-600">
            Preparing your experience
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}

