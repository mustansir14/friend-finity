import "./Topbar.css";
import "../friendRequest/friendRequest.css";
import { Person, Chat, Notifications } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import FriendRequest from "../friendRequest/FriendRequest.jsx";

export default function Topbar() {
  let navigate = useNavigate();
  const tempUser = JSON.parse(localStorage.getItem("user")) || "";
  const [user, setUser] = useState(tempUser);
  const [friendRequests, setFriendRequests] = useState([]);

  if (tempUser.toString() !== user.toString()) setUser(tempUser);
  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser("");
    navigate("/login");
  };

  useEffect(() => {
    if (!user) return;
    try {
      axios
        .get(
          "http://" + process.env.URL + "/friends/user/" + user._id + "/pending"
        )
        .then((res) => {
          setFriendRequests(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [user]);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">FriendFinity</span>
      </div>
      <div className="topbarCenter"></div>
      {user && (
        <div className="topbarIcons">
          <div className="dropdown">
            <button
              className="dropdown-toggle topbarIconItem"
              type="button"
              id="dropdownRequestsBtn"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <Person />
              {friendRequests.length > 0 && (
                <span className="topbarIconBadge">{friendRequests.length}</span>
              )}
            </button>
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownRequestsBtn"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                {friendRequests.length > 0 ? (
                  friendRequests.map((friendRequest) => (
                    <FriendRequest
                      key={friendRequest._id}
                      friendRequest={friendRequest}
                    />
                  ))
                ) : (
                  <div className="card friendRequest dropdown-item">
                    <div className="card-body friendRequestBody">
                      <h5 className="card-title friendRequestName">
                        <span className="friendRequestText">
                          No friend requests
                        </span>
                      </h5>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/home" className="topbarLink">
            Home
          </Link>
          <Link to="/profile" className="topbarLink">
            Profile
          </Link>
        </div>

        {user ? (
          <div className="dropdown">
            <button
              className="dropdown-toggle imgDropDown"
              type="button"
              id="dropdownImgButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={
                  user.profilePicURL
                    ? user.profilePicURL
                    : "/assets/no-profile-pic.png"
                }
                alt=""
                className="topbarImg"
              />
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownImgButton">
              <button
                className="dropdown-item logoutBtn"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <img src="/assets/no-profile-pic.png" alt="" className="topbarImg" />
        )}
      </div>
    </div>
  );
}
