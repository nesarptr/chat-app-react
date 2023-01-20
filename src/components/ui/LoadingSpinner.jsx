import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="spinner h-16 w-16 rounded-full border-t-2 border-blue-500">
        <div className="animation-spin h-full w-full rounded-full border-2 border-blue-500"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
