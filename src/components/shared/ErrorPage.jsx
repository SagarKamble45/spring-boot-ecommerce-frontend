import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = ({ errorMessage = "Something went wrong. Please try again later." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <div className="bg-red-50 border border-red-100 rounded-2xl p-8 shadow-sm text-center max-w-md w-full">
        <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
        <p className="text-red-600 text-lg font-medium">
          {errorMessage}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;