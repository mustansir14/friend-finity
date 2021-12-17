import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import CommentBlock from "../commentBlock/CommentBlock";
import timeSince from "../../utils/timeSince";

export default function Post({ post }) {
  const [state, setState] = useState({
    user: {},
    likes: [],
    comments: [],
    fetched: false,
  });
  const [isLiked, setIsLiked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const likeHandler = () => {
    // setLikes(isLiked ? likes - 1 : likes + 1);
    // setIsLiked(!isLiked);
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
      setState({
        user: userRes.data,
        likes: likesRes.data,
        comments: commentsRes.data,
        fetched: true,
      });
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
                state.fetched
                  ? state.user.profilePicURL
                  : "assets/no-profile-pic.png"
              }
              alt=""
            />
            <span className="postUsername">
              <span className="postUsername">
                {state.fetched ? (
                  state.user.firstName + " " + state.user.lastName
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
              class="btn btn-outline-primary btn-sm likeBtn"
            >
              <img
                className="icon"
                src="assets/like.png"
                onClick={likeHandler}
                alt=""
              />
              Like
              <span className="postLikeCounter">
                {state.fetched ? (
                  "(" + state.likes.length + ")"
                ) : (
                  <ClipLoader color="#6699CC" loading={true} size={15} />
                )}
              </span>
            </button>
          </div>
          <div className="postBottomMiddle">
            <button type="button" class="btn btn-primary btn-sm">
              <img className="icon" src="assets/share.svg" alt="" />
              Share
            </button>
          </div>
          <div className="postBottomRight">
            <button
              className="btn btn-link"
              type="button"
              onClick={() => {
                setCommentClicked(!commentClicked);
              }}
            >
              <img className="icon" src="assets/comment.jpeg" alt="" />
              {state.fetched ? (
                state.comments.length + " Comments"
              ) : (
                <ClipLoader color="#6699CC" loading={true} size={15} />
              )}
            </button>
          </div>
        </div>
      </div>
      {commentClicked && <CommentBlock comments={state.comments} />}
    </div>
  );
}
