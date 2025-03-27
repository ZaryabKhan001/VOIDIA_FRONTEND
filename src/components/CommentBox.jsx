import React from "react";
import { formatDate } from "../lib/formatDate.js";

const CommentBox = ({ comment }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 border border-slate-200 p-2 w-full rounded-md">
      <h2 className="text-md">{comment.content}</h2>
      <div className="flex flex-col justify-start items-start">
        <p className="capitalize text-sm font-bold">{comment.createdBy.name}</p>
        <p className="text-xs">{formatDate(comment.createdAt)}</p>
      </div>
    </div>
  );
};

export default CommentBox;
