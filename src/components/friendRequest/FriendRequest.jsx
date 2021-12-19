import "./friendRequest.css";
import { useState, useEffect } from "react";
import axios from "axios";
import timeSince from "../../utils/timeSince";
import ClipLoader from "react-spinners/ClipLoader";

export default function FriendRequest({ friendRequest }) {
  const [user, setUser] = useState();
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      await axios.put(
        "http://localhost:8000/friends/accept/" + friendRequest._id
      );
      setIsFriend(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      const userRes = await axios.get(
        "http://localhost:8000/users/" + friendRequest.user1ID
      );
      const friendRes = await axios.get(
        "http://localhost:8000/friends/" + friendRequest._id
      );
      if (friendRes.data.status === "accepted") setIsFriend(true);
      setUser(userRes.data);
      setFetched(true);
    }
    fetchData();
  }, [friendRequest]);

  return (
    <div className="card friendRequest dropdown-item">
      <div className="card-body friendRequestBody">
        <h5 className="card-title friendRequestName">
          <img
            className="friendRequestUserImg"
            src={
              fetched
                ? user.profilePicURL
                  ? user.profilePicURL
                  : "assets/no-profile-pic.png"
                : "assets/no-profile-pic.png"
            }
            alt=""
          />
          <span className="friendRequestText">
            {fetched ? (
              user.firstName +
              " " +
              user.lastName +
              (isFriend ? " is now your friend!" : " wants to be your friend")
            ) : (
              <ClipLoader color="#ffffff" loading={true} size={14} />
            )}
          </span>
        </h5>
        <h6 className="card-subtitle mb-2 text-muted friendRequestDate">
          {timeSince(friendRequest.dateRequested)}
        </h6>
        {!isFriend && (
          <button className="acceptBtn" onClick={handleAccept}>
            {loading ? (
              <ClipLoader color="#ffffff" loading={true} size={14} />
            ) : (
              "Accept"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
