import "./comment.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import timeSince from "../../utils/timeSince";
import ClipLoader from "react-spinners/ClipLoader";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

export default function Comment({ comment, deleteHandler }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [state, setState] = useState({
    user: {},
    commentLikes: [],
    fetched: false,
  });
  const [deleting, setDeleting] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);
  const inputRef = useRef(null);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete("http://35.174.6.220/comments/" + comment._id);
      deleteHandler(comment._id);
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

  const editComment = async () => {
    setUpdating(!updating);
    if (updating) {
      if (!commentText) {
        setUpdating(false);
        setCommentText(comment.text);
        inputRef.current.value = comment.text;
        return;
      }
      setUpdateLoading(true);
      try {
        await axios.put("http://35.174.6.220/comments/" + comment._id, {
          text: commentText,
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
        "http://35.174.6.220/users/" + comment.userID
      );
      const commentLikesRes = await axios.get(
        "http://35.174.6.220/commentlikes/comment/" + comment._id
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
                  ? state.user.profilePicURL
                  : "assets/no-profile-pic.png"
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
            <div className="editIcons">
              <button
                className="editIcon"
                onClick={editComment}
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
              <button className="editIcon" onClick={handleDelete}>
                <span>
                  {deleting ? (
                    <ClipLoader color="#ffffff" loading={true} size={16} />
                  ) : (
                    <DeleteIcon />
                  )}
                </span>
              </button>
            </div>
          )}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted commentDate">
          {timeSince(comment.dateTimeCommented)}
        </h6>
        <input
          className="card-text commentText"
          ref={inputRef}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          readOnly={!updating}
        />
      </div>
    </div>
  );
}
