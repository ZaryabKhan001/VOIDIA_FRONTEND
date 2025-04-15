import React, { useEffect } from "react";
import { Loader2, Smile } from "lucide-react";
import { BlogCard } from "../components/index.js";
import { getAllBlogs } from "../features/blog/blogThunks.js";
import {} from "../features/blog/blogSlice.js";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.allBlogs);
  const loading = useSelector((state) => state.blog.loading.allBlogs);
  const error = useSelector((state) => state.blog.error.allBlogs);

  const fetchAllBlogs = async () => {
    try {
      const result = await dispatch(getAllBlogs());
      if (getAllBlogs.fulfilled.match(result)) {
        console.log("All blogs fetched succesfully");
      }
    } catch (error) {
      console.log("Error in fetching all blogs");
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <div className="my-10">
      <div className="flex flex-col justify-between items-center gap-2">
        <h1 className="text-2xl font-bold text-center">
          Blog World, Blogs that don't make you feel bore.
        </h1>
        <h1 className="text-xl text-green-500 italic">Promise</h1>
      </div>

      {loading ? (
        <div className="min-h-[calc(100vh-(15vh+17.8rem))] flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : blogs?.length === 0 ? (
        <div className="my-10 text-lg font-bold min-h-[40vh] mx-auto text-center flex flex-col justify-center items-center gap-5">
          <Smile size={100} className="text-green-500" />
          <p>No blogs to show.</p>
        </div>
      ) : (
        <div className="my-24 md:mx-10 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">All Blogs</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs?.map((blog, index) => (
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
