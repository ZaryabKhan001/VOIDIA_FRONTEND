import React from "react";

const AuthorInfoCard = ({ author }) => {
  return (
    <div className="p-4 border border-slate-200 rounded-md">
      <h1 className="text-lg font-bold mb-3">Author</h1>
      <div className="flex justify-start items-start gap-3">
        <div className="w-[5rem] h-[5rem] overflow-hidden rounded-full p-2 border border-slate-300">
          <img src="/user.jfif" alt="author" loading="lazy" />
        </div>
        <div className="flex flex-col justify-start items-start">
          <p className="capitalize font-bold">{author?.name}</p>
          <p>{author?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfoCard;
