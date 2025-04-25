import React from 'react';

const FallbackLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default FallbackLoader;