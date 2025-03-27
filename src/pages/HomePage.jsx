import React from "react";
import { Loader2, Smile } from "lucide-react";
import { BlogCard } from "../components/index.js";
import useFetch from "../hooks/useFetch.js";

const HomePage = () => {
  const { data, error, isLoading } = useFetch("/posts");
  return (
    <div className="my-10">
      <div className="flex flex-col justify-between items-center gap-2">
        <h1 className="text-2xl font-bold text-center">
          Blog World, Blogs that don't make you feel bore.
        </h1>
        <h1 className="text-xl text-green-500 italic">Promise</h1>
      </div>

      {isLoading ? (
        <div className="min-h-[calc(100vh-(15vh+17.8rem))] flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : data?.length === 0 ? (
        <div className="my-10 text-lg font-bold min-h-[40vh] mx-auto text-center flex flex-col justify-center items-center gap-5">
          <Smile size={100} className="text-green-500" />
          <p>No blogs to show.</p>
        </div>
      ) : (
        <div className="my-24 md:mx-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.map((blog, index) => (
              <BlogCard blog={blog} key={index} />
            ))}
          </div>
        </div>
      )}
      <div>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default HomePage;
