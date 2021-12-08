import "./Topbar.css"
import {Search, Person,Chat,Notifications} from '@mui/icons-material'
export default function Topbar(){
    return(
        <div className="topbarContainer">
            <div className="topbarLeft"></div>
            <span className="logo">FriendFinity</span>
            <div className="topbarCenter"></div>
                <div className="searchbar">
                    <Search  classname= "searchIcon"/>
                    <input placeholder="Search for Friend" className="searchInput"/>
                </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
                </div>
        </div>
    );
}