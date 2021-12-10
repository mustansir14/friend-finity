import "./rightbar.css"

export default function rightbar() {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
            <span className="birthdayText">
            <img className="birthdayImg" src="assets/gift.png" alt="" />
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
          <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
                <li className="rightBarFriend">
                    <div className="rightbarProfileImgContainer">
                        <img className ="rightbarProfileImg" src="/assets/person/3.jpeg" alt=""/>
                        <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Carter</span>
                </li>
        </ul>
            </div>
        </div>
    )
}
