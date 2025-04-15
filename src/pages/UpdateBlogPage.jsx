import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogSchema } from "../schemas/blog.schema.js";
import { Input } from "../components/ui/input.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button.jsx";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../components/ui/textarea.jsx";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { updateBlog, getBlogDetails } from "../features/blog/blogThunks.js";
import { useDispatch, useSelector } from "react-redux";

const UpdateBlogPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(blogSchema), mode: "onChange" });

  const [file, setFile] = useState(null);
  const [blogData, setBlogData] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [pageLoader, setPageLoader] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.blog.error.updateBlog);
  const loading = useSelector((state) => state.blog.loading.updateBlog);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl);
      setFile(selectedFile);
    }
  };

  const handleUpdate = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);

    if (file) {
      formData.append("coverImage", file);
    } else {
      formData.append("coverImage", imageUrl);
    }

    try {
      const result = await dispatch(updateBlog({ blogId: id, data: formData }));

      if (updateBlog.fulfilled.match(result)) {
        toast("Blog Updated Successfully");
        navigate("/");
      }
    } catch (error) {
      toast("Blog Updation Failed");
      console.error("Blog Updation Error:", error);
    }
  };

  const fetchBlogData = async () => {
    setPageLoader(true);
    try {
      const result = await dispatch(getBlogDetails(id));
      if (getBlogDetails.fulfilled.match(result)) {
        console.log("Blog Details fetched successfully");
        const blogData = result.payload;
        setBlogData(blogData);
        setImageUrl(blogData.coverImage);

        reset({
          title: blogData.title || "",
          content: blogData.content || "",
          coverImage: blogData?.coverImage ? blogData?.coverImage : "",
        });
      }
    } catch (error) {
      console.log("Error in fetching Blog Details", error);
    } finally {
      setPageLoader(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <div className="my-10 ">
      {pageLoader ? (
        <div className="min-h-[calc(100vh-(18vh+10.2rem))] sm:min-h-[calc(100vh-(15vh+9.3rem))] flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div>
          {" "}
          <h1 className="text-2xl font-bold">Update Blog</h1>
          <form
            className="flex flex-col justify-center items-start gap-5 my-5 w-full lg:w-[50rem]"
            onSubmit={handleSubmit(handleUpdate)}
          >
            <div className="w-full">
              <div className="relative w-32 h-32">
                <div className="w-32 h-32 rounded-full border-2 border-gray-300 overflow-hidden flex items-center justify-center bg-gray-200">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>
                <label className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-600 transition">
                  <Camera size={20} color="white" />
                  <Input
                    type="file"
                    accept="image/*"
                    className={"hidden"}
                    {...register("coverImage", {
                      onChange: (e) => handleFileChange(e),
                    })}
                  />
                </label>
              </div>
              {errors?.coverImage && (
                <p className="text-sm text-red-500">
                  {errors?.coverImage?.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Input
                placeholder="Enter Title"
                {...register("title")}
                defaultValue={blogData?.title}
                type={"text"}
              />
              {errors?.title && (
                <p className="text-sm text-red-500">{errors?.title?.message}</p>
              )}
            </div>

            <div className="w-full">
              <Textarea
                placeholder="Write blog here..."
                className={"h-[10rem]"}
                {...register("content")}
                defaultValue={blogData?.content}
              />
              {errors?.content && (
                <p className="text-sm text-red-500">
                  {errors?.content?.message}
                </p>
              )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              className={"cursor-pointer"}
              type="submit"
              disabled={loading || !isValid}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Update"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateBlogPage;
