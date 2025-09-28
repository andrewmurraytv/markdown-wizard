import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="app-container pb-16">
      {/* Header skeleton */}
      <header className="relative z-10 flex flex-col items-center p-4 bg-white border-b border-gray-200 min-h-[120px]">
        <div className="text-center mb-4">
          <Skeleton className="h-10 w-80 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 mx-auto mb-1" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
        <Skeleton className="h-6 w-32" />
      </header>

      {/* Direction toggle skeleton */}
      <div className="my-4">
        <Skeleton className="h-12 w-full max-w-md mx-auto" />
      </div>

      {/* Controls skeleton */}
      <div className="mb-6">
        <Skeleton className="h-16 w-full" />
      </div>

      {/* Editor container skeleton */}
      <div className="editor-container">
        {/* Input panel skeleton */}
        <div className="editor-panel min-h-[460px]">
          <div className="flex justify-between items-center p-4 bg-secondary border-b">
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="p-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5 mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* Actions skeleton */}
        <div className="actions min-w-[120px]">
          <Skeleton className="h-10 w-20 mb-2" />
          <Skeleton className="h-10 w-16" />
        </div>

        {/* Output panel skeleton */}
        <div className="editor-panel min-h-[460px]">
          <div className="flex justify-between items-center p-4 bg-secondary border-b">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-16" />
          </div>
          <div className="p-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>

      {/* Features section skeleton */}
      <div className="mt-12">
        <Skeleton className="h-8 w-48 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 bg-white rounded-lg border">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;