import React from 'react';
import { AlertCircle } from 'lucide-react';

interface LoadingErrorProps {
  message?: string;
  retry?: () => void;
}

const LoadingError: React.FC<LoadingErrorProps> = ({ 
  message = 'An error occurred while loading the data.',
  retry
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="w-12 h-12 text-error-500 mb-4" />
      <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
      {retry && (
        <button 
          onClick={retry}
          className="btn btn-primary"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default LoadingError;