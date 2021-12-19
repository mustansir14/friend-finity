import "./addFriend.css";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function AddFriend({ user }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [btnText, setBtnText] = useState("Add");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/friends/request", {
        user1ID: loggedInUser._id,
        user2ID: user._id,
      });
      setBtnText("Pending");
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src={
          user.profilePicURL ? user.profilePicURL : "/assets/no-profile-pic.png"
        }
        alt=""
      />
      <span className="sidebarFriendName">
        {user.firstName + " " + user.lastName}
      </span>
      <button onClick={handleClick} className="sidebarAddFriendBtn">
        {loading ? (
          <ClipLoader color="#6699CC" loading={true} size={14} />
        ) : (
          btnText === "Add" && <AddIcon />
        )}
        {btnText}
      </button>
    </li>
  );
}
