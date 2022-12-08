import "./rightbar.css";
import Online from "../online/Online";
import Messenger from "../messenger/Messenger";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Rightbar({ profile }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [friends, setFriends] = useState([]);
  const [toFriend, setToFriend] = useState(null);

  useEffect(() => {
    axios
      .get("http://35.174.6.220/friends/user/" + loggedInUser._id)
      .then((res) => {
        setFriends(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const friendClickHandler = (friend) => {
    setToFriend(friend);
  };

  const HomeRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Chat with your Friends</h4>
        <div className="rightbarSelectFriend">
          <ul className="rightbarFriendList">
            {friends.map((u) => (
              <Online
                key={u._id}
                user={u}
                friendClickHandler={friendClickHandler}
              />
            ))}
          </ul>
        </div>
        <hr />
        {toFriend && <Messenger toUser={toFriend} />}
      </>
    );
  };
  const ProfileRightbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Born:</span>
            <span className="rightbarInfoKey">
              {user.dateOfBirth.substr(0, 10)}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoKey">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Country:</span>
            <span className="rightbarInfoKey">{user.country}</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
