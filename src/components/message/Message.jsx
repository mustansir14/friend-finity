import "./message.css";
import timeSince from "../../utils/timeSince";

export default function Message({ own, user, message }) {
  if (own) user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {own ? (
          <>
            <p className="messageText">{message.messageText}</p>
            <img
              className="messageImg messageImgRight"
              src={
                user.profilePicURL
                  ? user.profilePicURL
                  : "/assets/no-profile-pic.png"
              }
              alt=""
            />
          </>
        ) : (
          <>
            <img
              className="messageImg messageImgLeft"
              src={
                user.profilePicURL
                  ? user.profilePicURL
                  : "/assets/no-profile-pic.png"
              }
              alt=""
            />
            <p className="messageText">{message.messageText}</p>
          </>
        )}
      </div>
      <div className="messageBottom">{timeSince(message.sendDateTime)}</div>
    </div>
  );
}
