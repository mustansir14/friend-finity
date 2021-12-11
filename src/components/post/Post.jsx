import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PlusOneTwoTone } from "@mui/icons-material";
import {Users} from "../../dummyData"
export default function Post({post}) {

  const user =
  console.log(post);
    return (
        <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src={Users.filter((u)=>u.id===post.userId)[0].profilePicture} alt=""/>
              <span className="postUsername">
              <span className="postUsername">{Users.filter((u)=>u.id===post.userId)[0].username}</span>
              </span>
              <span className="postDate">{post.date}</span>
            </div>
            <div className="postTopRight">
              <MoreVertIcon />
            </div>
          </div>
          <div className="postCenter">
          <span className="postText">{post?.desc}</span>
            <img className="postImg" src={post.photo} alt=""/>
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" alt=""/>
            <img className ="heartIcon" src="assets/heart.png" alt=""/>
            <button className="postlikeCounter">{post.like} People like it</button>
            </div>
            <div className="postBottomRight">
            <button className="postCommentText">{post.comment} Comments</button>
            </div>
          </div>
        </div>
      </div>
    )
}
