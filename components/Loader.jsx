import React from "react";

function Loader() {
  return (
    <div className="fixed z-[99] min-h-[100%] w-[100%] opacity-70 flex flex-col bg-black shadow-sm">
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="flex justify-center">
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
