import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";

export default function Share() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicURL
                ? user.profilePicURL
                : "/assets/no-profile-pic.png"
            }
            alt=""
          />
          <input placeholder="What's in your mind?" className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <button className="shareOptionText">Photo/Video</button>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <button className="shareOptionText">Tag</button>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <button className="shareOptionText">Location</button>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <button className="shareOptionText">Feelings</button>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}
