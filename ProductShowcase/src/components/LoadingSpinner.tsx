import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-pokemon-red rounded-full opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-pokemon-red rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pokemon-red rounded-full shadow-inner shadow-black/20"></div>
      </div>
      <p className="text-pokemon-red font-bold animate-pulse tracking-widest text-lg">
        PRECISO PEGAR TODOS...
      </p>
    </div>
  );
};

export default LoadingSpinner;
