import React from 'react';

const LoadingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-pulse">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-white">Loading...</h2>
        <p className="mt-2 text-gray-400">Please wait while we set things up</p>
      </div>
    </div>
  );
};

export default LoadingPage;
