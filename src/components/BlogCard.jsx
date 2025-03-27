import React from "react";
import { formatDate } from "../lib/formatDate.js";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link
      className="flex flex-col justify-center items-center gap-2 p-3 border border-slate-200 rounded-md cursor-pointer"
      to={`/blog/${blog._id}`}
    >
      <div className="overflow-hidden w-full h-[13rem]">
        <img
          src={blog?.coverImage}
          alt={blog?.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-3 w-full">
        <h1 className="text-xl font-bold capitalize  w-full truncate overflow-hidden whitespace-nowrap text-ellipsis">
          {blog?.title}
        </h1>
        <div className="flex flex-col sm:flex-row items-start gap-0 w-full justify-between sm:items-center sm:gap-2">
          <p className="text-md font-bold w-full sm:w-[30%] truncate overflow-hidden whitespace-nowrap text-ellipsis">
            {blog?.createdBy?.name}
          </p>
          <p className="text-sm">{formatDate(blog?.createdAt)}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
