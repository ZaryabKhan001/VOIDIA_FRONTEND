import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.js";
import { useNavigate, useParams } from "react-router-dom";
import { AuthorInfoCard, CommentBox } from "../components/index.js";
import { formatDate } from "../lib/formatDate.js";
import { Button } from "../components/ui/button.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  toggleDislike,
  toggleLike,
} from "../features/user/userSlice.js";
import { Input } from "../components/ui/input.jsx";
import { Loader2, ThumbsUp, ThumbsDownIcon } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "../lib/axios.js";

const BlogPage = () => {
  const [commentMessage, setCommentMessage] = useState("");
  const [isCommentSending, setIsCommentSending] = useState(false);
  const [commentSendingError, setCommentSendingError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, refetchData } = useFetch(`/posts/blog/${id}`);
  const { data: comments, refetchData: refetchComments } = useFetch(
    `/posts/${id}/comments`
  );

  const user = useSelector(selectUser);
  const isLiked = user.likedPosts.includes(id);
  const isDisliked = user.dislikedPosts.includes(id);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const response = await axiosInstance.delete(`/posts/${id}`);
      if (!response) {
        console.log("Error in deleting Blog");
        return;
      }
      toast("Blog deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in deleting Blog", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/posts/${id}/comments`);
      if (!response) {
        console.log("Error in fetching Blog Comments");
        return;
      }
      refetchComments();
    } catch (error) {
      console.log("Error in fetching Blog Comments", error);
    }
  };

  const handleAddingComment = async (e) => {
    e.preventDefault();
    try {
      setIsCommentSending(true);
      setCommentSendingError("");
      const response = await axiosInstance.post(`/posts/${id}/comments`, {
        content: commentMessage,
      });
      if (!response) {
        console.log("Error in adding comment");
        return;
      }

      fetchComments();
    } catch (error) {
      console.log("Error in adding comment", error);
      setCommentSendingError(error.response.data.message);
    } finally {
      setCommentMessage("");
      setIsCommentSending(false);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axiosInstance.patch(`/posts/${id}/like`);
      if (!response) {
        console.log("Error in Liking Post");
        return;
      }
      dispatch(toggleLike(id));
    } catch (error) {
      console.log("Error in Liking Post", error);
    }
  };

  const handleDisLike = async () => {
    try {
      const response = await axiosInstance.patch(`/posts/${id}/dislike`);
      if (!response) {
        console.log("Error in DisLiking Post");
        return;
      }
      dispatch(toggleDislike(id));
    } catch (error) {
      console.log("Error in DisLiking Post", error);
    }
  };

  useEffect(() => {
    refetchData();
  }, [isLiked, isDisliked]);

  return (
    <div className="my-10">
      {isLoading ? (
        <div className="min-h-[calc(100vh-(18vh+10.2rem))] sm:min-h-[calc(100vh-(15vh+9.3rem))] flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        data[0] &&
        comments && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="md:col-span-2 lg:col-span-3">
              <div>
                <div className="flex flex-col justify-center items-start gap-3 border border-slate-200 p-4 rounded-md">
                  <h1 className="text-2xl font-bold text-center capitalize">
                    {data[0]?.title}
                  </h1>
                  <p className="text-sm">{formatDate(data[0]?.createdAt)}</p>
                  <p className="font-bold">
                    By:{" "}
                    <span className="font-normal capitalize">
                      {data[0]?.createdBy?.name}
                    </span>
                  </p>
                  {user?._id === data[0]?.createdBy?._id && (
                    <div className="flex justify-between items-center gap-3">
                      <Button
                        variant={"outline"}
                        className={"cursor-pointer"}
                        onClick={() => navigate(`/blog/update/${data[0]?._id}`)}
                      >
                        Update
                      </Button>
                      <Button
                        variant={"outline"}
                        className={"cursor-pointer"}
                        onClick={() => handleDelete()}
                      >
                        {deleteLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </div>
                  )}
                  <div className="overflow-hidden h-[60vh] w-full">
                    <img
                      src={data[0]?.coverImage}
                      alt={data[0]?.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-lg font-bold">Content</h1>
                  <p className="text-sm">{data[0]?.content}</p>
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
                          onClick={() => handleLike()}
                        />
                        <p className="text-sm">{data[0].likes}</p>
                      </div>
                      <div className="flex flex-col justify-between items-center gap-2">
                        <ThumbsDownIcon
                          className={`cursor-pointer ${
                            isDisliked && "text-red-500"
                          }`}
                          onClick={() => handleDisLike()}
                        />
                        <p className="text-sm">{data[0].disLikes}</p>
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
                  {comments.map((comment, index) => {
                    return <CommentBox comment={comment} key={index} />;
                  })}
                </div>
              </div>
            </div>
            <div>
              <AuthorInfoCard author={data[0]?.createdBy} />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default BlogPage;
