import "./post.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import CommentBlock from "../commentBlock/CommentBlock";
import timeSince from "../../utils/timeSince";
import containsUser from "../../utils/containsUser";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

export default function Post({ post, deleteHandler }) {
  const [fetched, setFetched] = useState(false);
  const [user, setUser] = useState();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const [commentsLength, setCommentsLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [postText, setPostText] = useState(post.text);
  const [updateLoading, setUpdateLoading] = useState(false);
  const inputRef = useRef();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const likeHandler = () => {
    if (!isLiked) {
      likes.push(loggedInUser);
      setLikes([...likes]);
      setIsLiked(true);
      axios
        .post("http://localhost:8000/postlikes", {
          userID: loggedInUser._id,
          postID: post._id,
        })
        .catch((error) => console.log(error));
    } else {
      const like = likes.pop();
      setLikes([...likes]);
      setIsLiked(false);
      axios
        .delete("http://localhost:8000/postlikes/" + like._id)
        .catch((error) => console.log(error));
    }
  };

  const updateComments = (comments) => {
    setCommentsLength(comments.length);
    setComments([...comments]);
  };

  const deletePost = async () => {
    setDeleting(true);
    try {
      await axios.delete("http://localhost:8000/posts/" + post._id);
      deleteHandler(post._id);
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

  const editPost = async () => {
    setUpdating(!updating);
    if (updating) {
      if (!postText && !post.imageURL) {
        setUpdating(false);
        setPostText(post.text);
        inputRef.current.value = post.text;
        return;
      }
      setUpdateLoading(true);
      try {
        await axios.put("http://localhost:8000/posts/" + post._id, {
          text: postText,
        });
      } catch (error) {
        console.log(error);
      }
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const userRes = await axios.get(
        "http://localhost:8000/users/" + post.userID
      );
      const likesRes = await axios.get(
        "http://localhost:8000/postlikes/post/" + post._id
      );
      const commentsRes = await axios.get(
        "http://localhost:8000/comments/post/" + post._id
      );
      setUser(userRes.data);
      setLikes(likesRes.data);
      setComments(commentsRes.data);
      setCommentsLength(commentsRes.data.length);
      setFetched(true);
      if (containsUser(loggedInUser._id, likesRes.data)) setIsLiked(true);
    }
    fetchData();
  }, [post]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={
                fetched && user.profilePicURL
                  ? user.profilePicURL
                  : "assets/no-profile-pic.png"
              }
              alt=""
            />
            <span className="postUsername">
              <span className="postUsername">
                {fetched ? (
                  user.firstName + " " + user.lastName
                ) : (
                  <ClipLoader color="#6699CC" loading={true} size={25} />
                )}
              </span>
            </span>
            <span className="postDate">{timeSince(post.dateTimePosted)}</span>
          </div>
          {loggedInUser._id === post.userID && (
            <div className="postTopRight">
              <button
                className="postEditBtn"
                onClick={editPost}
                type={"button"}
              >
                {updateLoading ? (
                  <ClipLoader color="#ffffff" loading={true} size={16} />
                ) : updating ? (
                  <SaveIcon></SaveIcon>
                ) : (
                  <EditIcon />
                )}
              </button>
              <button className="postEditBtn" onClick={deletePost}>
                {deleting ? (
                  <ClipLoader color="#ffffff" loading={true} size={16} />
                ) : (
                  <DeleteIcon />
                )}
              </button>
            </div>
          )}
        </div>
        <div className="postCenter">
          <textarea
            className="postText"
            value={postText}
            readOnly={!updating}
            onChange={(e) => {
              e.target.style.height = "30px";
              e.target.style.height = e.target.scrollHeight + "px";
              setPostText(e.target.value);
            }}
            ref={inputRef}
          />
          {post.imageURL && (
            <img className="postImg" src={post.imageURL} alt="" />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <button
              type="button"
              className={
                "likeBtn " + (isLiked ? "likeBtnClicked" : "likeBtnNotClicked")
              }
              onClick={likeHandler}
            >
              <ThumbUpOffAltIcon />
              <span className="btnText">
                {fetched ? (
                  likes.length + " "
                ) : (
                  <ClipLoader color="#6699CC" loading={true} size={15} />
                )}
                Likes
              </span>
            </button>
          </div>
          <div className="postBottomMiddle">
            <button type="button" className="likeBtn">
              <ShareIcon />
              <span className="btnText">Share</span>
            </button>
          </div>
          <div className="postBottomRight">
            <button
              className="likeBtn"
              type="button"
              onClick={() => {
                setCommentClicked(!commentClicked);
              }}
            >
              <CommentIcon />
              <span className="btnText">
                {fetched ? (
                  commentsLength + " Comments"
                ) : (
                  <ClipLoader color="#6699CC" loading={true} size={15} />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      {commentClicked && (
        <CommentBlock
          comments={comments}
          updateComments={updateComments}
          postID={post._id}
        />
      )}
    </div>
  );
}
