import React, { useEffect } from "react";
import { Loader2, Smile } from "lucide-react";
import { BlogCard } from "../components/index.js";
import { selectUser } from "../features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsOfUser } from "../features/blog/blogThunks.js";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const blogs = useSelector((state) => state.blog.userBlogs);
  const loading = useSelector((state) => state.blog.loading.userBlogs);
  const error = useSelector((state) => state.blog.error.userBlogs);

  const fetchBlogsOfUser = async () => {
    try {
      const result = await dispatch(getBlogsOfUser());
      if (getBlogsOfUser.fulfilled.match(result)) {
        console.log("Blogs of user fetched successfully");
      }
    } catch (error) {
      console.log("Error in getting user blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogsOfUser();
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
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-lg font-bold">
            Total Blogs: <span>{blogs?.length}</span>
          </p>
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

export default UserProfilePage;
