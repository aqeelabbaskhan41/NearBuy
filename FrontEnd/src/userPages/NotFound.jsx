import React from "react";

function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-9xl font-bold text-gray-200">404</div>
        <div className="text-2xl font-semibold text-gray-500">
          Sorry, this page does not exist.
        </div>
      </div>
    </>
  );
}

export default NotFound;
