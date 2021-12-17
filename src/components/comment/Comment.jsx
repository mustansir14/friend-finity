import "./comment.css";
import { useState, useEffect } from "react";
import axios from "axios";
import timeSince from "../../utils/timeSince";
import ClipLoader from "react-spinners/ClipLoader";

export default function Comment({ comment }) {
  const [state, setState] = useState({
    user: {},
    commentLikes: [],
    fetched: false,
  });

  useEffect(() => {
    async function fetchData() {
      const userRes = await axios.get(
        "http://localhost:8000/users/" + comment.userID
      );
      const commentLikesRes = await axios.get(
        "http://localhost:8000/commentlikes/comment/" + comment._id
      );
      setState({
        user: userRes.data,
        commentLikes: commentLikesRes.data,
        fetched: true,
      });
    }
    fetchData();
  }, [comment]);
  return (
    <div class="card comment">
      <div class="card-body commentBody">
        <h5 class="card-title commentName">
          <img
            className="commentUserImg"
            src={
              state.fetched
                ? state.user.profilePicURL
                : "assets/no-profile-pic.png"
            }
            alt=""
          />
          <span>
            {state.fetched ? (
              state.user.firstName + " " + state.user.lastName
            ) : (
              <ClipLoader color="#6699CC" loading={true} size={14} />
            )}
          </span>
        </h5>
        <h6 class="card-subtitle mb-2 text-muted commentDate">
          {timeSince(comment.dateTimeCommented)}
        </h6>
        <p class="card-text commentText">{comment.text}</p>
        {/* <a href="#" class="btn btn-primary">
          Go somewhere
        </a> */}
      </div>
    </div>
  );
}
