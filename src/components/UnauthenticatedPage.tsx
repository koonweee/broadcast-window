import React from 'react';
import {LoginButton} from './login-button';

export function UnauthenticatedPage({ featureName = "feature" }: { featureName?: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full mx-4 p-8 bg-gray-800 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Access Required</h1>
          <p className="text-gray-400 mb-8">
            Please sign in to access the {featureName}
          </p>
          <div className="flex justify-center">
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};
