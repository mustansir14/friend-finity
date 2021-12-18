import "./Topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Topbar() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUser(user);
      }
    } catch (error) {}
  }, []);

  const handleLogOut = () => {
    localStorage.setItem("user", "");
    navigate("/login");
    setUser(null);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">FriendFinity</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search for Friend" className="searchInput" />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/home" className="topbarLink">
            Home
          </Link>
          <Link to="/profile" className="topbarLink">
            Profile
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
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
                src={user ? user.profilePicURL : "/assets/no-profile-pic.png"}
                alt=""
                className="topbarImg"
              />
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownImgButton">
              <button className="dropdown-item" onClick={handleLogOut}>
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
