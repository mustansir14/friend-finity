import "./rightbar.css"
import Online from "../online/Online";
import {Users} from "../../dummyData"
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
                {Users.map(u=>(
                    <Online key={u.id} user={u}/>
                ))}
        </ul>
            </div>
        </div>
    )
}
