import React from "react";

const NotFoundPage = () => {
  return (
    <div className="mt-16 md:mt-5 lg:mt-8 py-5 h-[calc(100vh-15vh)] sm:h-[calc(100vh-20vh)] w-full flex flex-col justify-center items-center gap-2 text-black">
      <h1 className="text-5xl font-bold">404</h1>
      <p>Page Not Found</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-sm">
        Go to home
      </button>
    </div>
  );
};

export default NotFoundPage;
