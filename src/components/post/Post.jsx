import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import CommentBlock from "../commentBlock/CommentBlock";
import timeSince from "../../utils/timeSince";
import containsUser from "../../utils/containsUser";

export default function Post({ post }) {
  const [fetched, setFetched] = useState(false);
  const [user, setUser] = useState();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const likeHandler = () => {
    if (!isLiked) {
      likes.push(user);
      setLikes([...likes]);
      setIsLiked(true);
      axios
        .post("http://localhost:8000/postlikes", {
          userID: user._id,
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
      setFetched(true);
      if (containsUser(userRes.data._id, likesRes.data)) setIsLiked(true);
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
              src={fetched ? user.profilePicURL : "assets/no-profile-pic.png"}
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
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.text}</span>
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
                  comments.length + " Comments"
                ) : (
                  <ClipLoader color="#6699CC" loading={true} size={15} />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      {commentClicked && comments.length > 0 && (
        <CommentBlock comments={comments} />
      )}
    </div>
  );
}
