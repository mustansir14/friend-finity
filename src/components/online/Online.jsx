import "./online.css";

export default function Online({ user, friendClickHandler }) {
  const handleClick = () => {
    friendClickHandler(user);
  };
  return (
    <button className="rightbarFriend" onClick={handleClick}>
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={
            user.profilePicURL
              ? user.profilePicURL
              : "/assets/no-profile-pic.png"
          }
          alt=""
        />
      </div>
      <span className="rightbarUsername">
        {user.firstName + " " + user.lastName}
      </span>
    </button>
  );
}
