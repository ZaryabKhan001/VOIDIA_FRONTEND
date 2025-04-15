import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { AuthorInfoCard, CommentBox } from "../components/index.js";
import { formatDate } from "../lib/formatDate.js";
import { Button } from "../components/ui/button.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  toggleDislike,
  toggleLike,
} from "../features/auth/authSlice.js";
import { Input } from "../components/ui/input.jsx";
import { Loader2, ThumbsUp, ThumbsDownIcon } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  deleteBlog,
  addComment,
  getAllComments,
  reactToBlog,
  getBlogDetails,
} from "../features/blog/blogThunks.js";

const BlogPage = () => {
  const [commentMessage, setCommentMessage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.blog.blogDetails);
  const loading = useSelector((state) => state.blog.loading.blogDetails);
  const deleteLoading = useSelector((state) => state.blog.error.deleteBlog);
  const comments = useSelector((state) => state.blog.comments);
  const isCommentSending = useSelector(
    (state) => state.blog.loading.addComment
  );
  const commentSendingError = useSelector(
    (state) => state.blog.error.addComment
  );

  const user = useSelector(selectUser);
  const isLiked = user.likedPosts?.includes(id);
  const isDisliked = user.dislikedPosts?.includes(id);
  const [likes, setLikes] = useState(data?.likes);
  const [dislikes, setDisLikes] = useState(data?.disLikes);

  const fetchBlogDetails = async () => {
    try {
      const result = await dispatch(getBlogDetails(id));
      if (getBlogDetails.fulfilled.match(result)) {
        console.log("Blog Details fetched successfully");
      }
    } catch (error) {
      console.log("Error in fetching blog details", error);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await dispatch(deleteBlog(id));
      if (deleteBlog.fulfilled.match(result)) {
        console.log("Blog deleted Successfully");
        toast("Blog deleted successfully");
      }
      navigate("/");
    } catch (error) {
      console.log("Error in deleting Blog", error);
    }
  };

  const fetchComments = async () => {
    try {
      const result = await dispatch(getAllComments(id));
      if (getAllComments.fulfilled.match(result)) {
        console.log("Blog Comments fetched successfully");
      }
    } catch (error) {
      console.log("Error in fetching Blog Comments", error);
    }
  };

  const handleAddingComment = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(addComment({ id, commentMessage }));
      if (addComment.fulfilled.match(result)) {
        console.log("Comment added successfully");
      }

      fetchComments();
    } catch (error) {
      console.log("Error in adding comment", error);
    } finally {
      setCommentMessage("");
    }
  };

  const handleReaction = async (type) => {
    try {
      const response = await dispatch(
        reactToBlog({ blogId: id, reaction: type })
      );
      if (type === "like") {
        dispatch(toggleLike(id));
      }
      if (type === "dislike") {
        dispatch(toggleDislike(id));
      }
    } catch (error) {
      console.error("Error in reaction:", error);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
    fetchComments();
  }, []);

  useEffect(() => {
    setLikes(data?.likes);
    setDisLikes(data?.disLikes);
  }, [data]);

  return (
    <div className="my-10">
      {loading ? (
        <div className="min-h-[calc(100vh-(18vh+10.2rem))] sm:min-h-[calc(100vh-(15vh+9.3rem))] flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        data &&
        comments && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="md:col-span-2 lg:col-span-3">
              <div>
                <div className="flex flex-col justify-center items-start gap-3 border border-slate-200 p-4 rounded-md">
                  <h1 className="text-2xl font-bold text-center capitalize">
                    {data?.title}
                  </h1>
                  <p className="text-sm">{formatDate(data?.createdAt)}</p>
                  <p className="font-bold">
                    By:{" "}
                    <span className="font-normal capitalize">
                      {data?.createdBy?.name}
                    </span>
                  </p>
                  {user?._id === data?.createdBy?._id && (
                    <div className="flex justify-between items-center gap-3">
                      <Button
                        variant={"outline"}
                        className={"cursor-pointer"}
                        onClick={() => navigate(`/blog/update/${data?._id}`)}
                      >
                        Update
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger>
                          {" "}
                          <Button
                            variant={"outline"}
                            className={"cursor-pointer"}
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your blog and remove blog data
                              from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete()}
                              className="cursor-pointer"
                            >
                              {deleteLoading ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                "Confirm"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                  <div className="overflow-hidden h-[60vh] w-full">
                    <img
                      src={data?.coverImage}
                      alt={data?.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-lg font-bold">Content</h1>
                  <p className="text-sm">{data?.content}</p>
                </div>

                {/* like  scenario  */}
                {user._id && (
                  <div className="my-3 flex justify-between items-center gap-3 w-full">
                    <h1 className="text-xl font-bold">Feedback:</h1>
                    <div className="flex gap-2">
                      <div className="flex flex-col justify-between items-center gap-2">
                        <ThumbsUp
                          className={`cursor-pointer ${
                            isLiked && "text-green-500"
                          }`}
                          onClick={() => handleReaction("like")}
                        />
                        <p className="text-sm">{Number(likes)}</p>
                      </div>
                      <div className="flex flex-col justify-between items-center gap-2">
                        <ThumbsDownIcon
                          className={`cursor-pointer ${
                            isDisliked && "text-red-500"
                          }`}
                          onClick={() => handleReaction("dislike")}
                        />
                        <p className="text-sm">{Number(dislikes)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comment Scenario  */}
                <div className="flex flex-col justify-start items-start gap-3 w-full my-5">
                  <h1 className="text-xl font-bold">Comments:</h1>
                  {user?._id && (
                    <form
                      className="flex flex-col justify-start items-start sm:flex-row w-full"
                      onSubmit={handleAddingComment}
                    >
                      <Input
                        placeholder="Add a comment."
                        className={"rounded-none"}
                        value={commentMessage}
                        onChange={(e) => setCommentMessage(e.target.value)}
                      />
                      <Button
                        type="submit"
                        className={"rounded-none cursor-pointer"}
                        disabled={
                          commentMessage.trim() === "" || isCommentSending
                        }
                      >
                        {isCommentSending ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Add"
                        )}
                      </Button>
                    </form>
                  )}

                  {commentSendingError && (
                    <p className="text-sm text-red-500">
                      {commentSendingError}
                    </p>
                  )}
                  {comments.length === 0 ? (
                    <p className="text-sm">No Comments yet.</p>
                  ) : (
                    comments.map((comment, index) => {
                      return <CommentBox comment={comment} key={index} />;
                    })
                  )}
                </div>
              </div>
            </div>
            <div>
              <AuthorInfoCard author={data?.createdBy} />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default BlogPage;
