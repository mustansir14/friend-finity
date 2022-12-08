import Comment from "../comment/Comment";
import CommentIcon from "@mui/icons-material/Comment";
import { useState } from "react";
import axios from "axios";
import "./commentBlock.css";

export default function CommentBlock({ comments, updateComments, postID }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [commentText, setCommentText] = useState("");
  const [uploading, setUploading] = useState(false);

  const deleteHandler = (id) => {
    let newComments = [];
    for (let i in comments) {
      if (comments[i]._id !== id) newComments.push(comments[i]);
    }
    updateComments(newComments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText) return;
    setUploading(true);
    try {
      const data = {
        userID: user._id,
        postID: postID,
        text: commentText,
      };
      const res = await axios.post("http://35.174.6.220/comments", data);
      comments.push(res.data);
      updateComments(comments);
      console.log("uploaded");
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
    setUploading(false);
  };

  return (
    <div className="commentBlock">
      <div className="comments">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
      <form className="addComment" onSubmit={handleSubmit}>
        <div className="card comment">
          <div className="card-body commentBody">
            <h5 className="card-title commentName">
              <img
                className="commentUserImg"
                src={
                  user.profilePicURL
                    ? user.profilePicURL
                    : "assets/no-profile-pic.png"
                }
                alt=""
              />
              <input
                type="text"
                className="commentInput"
                placeholder="Add a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></input>
            </h5>
            <hr className="commentHr" />
            <button className="commentSubmit" type="submit">
              <CommentIcon />
              <span className="submitBtnText">Add</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
