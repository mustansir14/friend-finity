import "./rightbar.css"
import Online from "../online/Online";
import {Users} from "../../dummyData"
export default function rightbar({profile}) {
    const HomeRightbar =() =>{
        return(
            <>
             <div className="birthdayContainer">
            <span className="birthdayText">
            <img className="birthdayImg" src="assets/gift.png" alt="" />
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
          </div>
          <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
                {Users.map(u=>(
                    <Online key={u.id} user={u}/>
                ))}
            </ul> 
            </>
        )
    };
    const ProfileRightbar =() =>{
        return(
        <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoKey">Karachi</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoKey">Lahore</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoKey">Single</span>
            </div>

        </div>
        </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <ProfileRightbar/>
            </div>
        </div>
    )
}