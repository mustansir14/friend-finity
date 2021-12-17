import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/1.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicURL
                    ? user.profilePicURL
                    : "/assets/no-profile-pic.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">
                {user.firstName + " " + user.lastName}
              </h4>
              <span className="profileInfoDesc">Wassup Bois</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile={true} />
          </div>
        </div>
      </div>
    </>
  );
}
