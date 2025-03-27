import React, { useState } from "react";
import { blogSchema } from "../schemas/blog.schema.js";
import { Input } from "../components/ui/input.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button.jsx";
import { Loader2 } from "lucide-react";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "sonner";
import { Textarea } from "../components/ui/textarea.jsx";
import { useNavigate } from "react-router-dom";

const AddNewBlogPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(blogSchema), mode: "onChange" });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddingPost = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("coverImage", data.coverImage[0]); // Extract File from FileList

      const response = await axiosInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response) {
        console.error("Error uploading blog");
        return;
      }

      console.log("Blog uploaded successfully", response.data);
      toast("Blog Added Successfully");
      navigate("/");
    } catch (error) {
      console.error(
        "Error uploading blog",
        error.response?.data.message || error.message
      );
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-10 ">
      <h1 className="text-2xl font-bold">Add New Blog</h1>
      <form
        className="flex flex-col justify-center items-start gap-5 my-5 w-full lg:w-[50rem]"
        onSubmit={handleSubmit(handleAddingPost)}
      >
        <div className="w-full">
          <Input
            placeholder="Enter Title"
            {...register("title")}
            type={"text"}
          />
          {errors?.title && (
            <p className="text-sm text-red-500">{errors?.title?.message}</p>
          )}
        </div>
        <div className="w-full">
          <Input
            type="file"
            accept="image/*"
            {...register("coverImage", {
              validate: (value) => {
                const file = value?.[0]; // Extract the first file from FileList
                if (!file) return "Image is required";
                if (!(file instanceof File)) return "Invalid file format";
                if (file.size > 5 * 1024 * 1024)
                  return "File size must be less than 5MB";
                if (!["image/jpeg", "image/png"].includes(file.type))
                  return "Only JPG and PNG files are allowed";
                return true;
              },
            })}
          />
          {errors?.coverImage && (
            <p className="text-sm text-red-500">{errors.coverImage.message}</p>
          )}
        </div>
        <div className="w-full">
          <Textarea
            placeholder="Write blog here..."
            className={"h-[10rem]"}
            {...register("content")}
          />
          {errors?.content && (
            <p className="text-sm text-red-500">{errors?.content?.message}</p>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button
          className={"cursor-pointer"}
          type="submit"
          disabled={!isValid || isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default AddNewBlogPage;
