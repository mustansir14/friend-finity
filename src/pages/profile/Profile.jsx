import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useRef } from "react";
import axios from "axios";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [username, setUsername] = useState(
    user.firstName + " " + user.lastName
  );
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const inputRef = useRef(null);

  const editName = async () => {
    setUpdating(!updating);
    if (updating) {
      if (!username && !username.includes(" ")) {
        setUpdating(false);
        setUsername(user.firstName + " " + user.lastName);
        inputRef.current.value = user.firstName + " " + user.lastName;
        return;
      }
      setUpdateLoading(true);
      try {
        const res = await axios.put("http://localhost:8000/users/" + user._id, {
          firstName: username.split(" ")[0],
          lastName: username.split(" ")[1],
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        user = res.data.user;
      } catch (error) {
        console.log(error);
      }
      setUpdateLoading(false);
    }
  };
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
              <div className="profileInfoContainer">
                <img
                  className="profileUserImg"
                  src={
                    user.profilePicURL
                      ? user.profilePicURL
                      : "/assets/no-profile-pic.png"
                  }
                  alt=""
                />
                <div className="profileInfo">
                  <h4 className="profileInfoName">
                    <input
                      className="profileName"
                      value={username}
                      readOnly={!updating}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      ref={inputRef}
                    />

                    <button
                      className="postEditBtn"
                      onClick={editName}
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
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed profile={true} />
            <Rightbar profile={true} />
          </div>
        </div>
      </div>
    </>
  );
}
