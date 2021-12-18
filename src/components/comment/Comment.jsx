import "./comment.css";
import { useState, useEffect } from "react";
import axios from "axios";
import timeSince from "../../utils/timeSince";
import ClipLoader from "react-spinners/ClipLoader";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Comment({ comment, deleteHandler }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [state, setState] = useState({
    user: {},
    commentLikes: [],
    fetched: false,
  });
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete("http://localhost:8000/comments/" + comment._id);
      deleteHandler(comment._id);
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

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
    <div className="card comment">
      <div className="card-body commentBody">
        <h5 className="card-title commentName">
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
              <ClipLoader color="#ffffff" loading={true} size={14} />
            )}
          </span>
          {user._id === comment.userID && (
            <button className="deleteIcon" onClick={handleDelete}>
              <span>
                {deleting ? (
                  <ClipLoader color="#ffffff" loading={true} size={16} />
                ) : (
                  <DeleteIcon />
                )}
              </span>
            </button>
          )}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted commentDate">
          {timeSince(comment.dateTimeCommented)}
        </h6>
        <p className="card-text commentText">{comment.text}</p>
      </div>
    </div>
  );
}
