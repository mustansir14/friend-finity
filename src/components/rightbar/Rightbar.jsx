import "./rightbar.css";
import Online from "../online/Online";
import Messenger from "../messenger/Messenger";
import { Users } from "../../dummyData";
export default function rightbar({ profile }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const HomeRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Chat with your Friends</h4>
        <div className="rightbarSelectFriend">
          <ul className="rightbarFriendList">
            {Users.map((u) => (
              <Online key={u.id} user={u} />
            ))}
          </ul>
        </div>
        <hr />
        <Messenger />
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
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoKey">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Country:</span>
            <span className="rightbarInfoKey">{user.country}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoKey">Single</span>
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
