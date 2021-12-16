import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PlusOneTwoTone } from "@mui/icons-material";
import { useState } from "react";
import {Users} from "../../dummyData"
export default function Post({post}) {
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)
  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
    return (
        <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src="" alt=""/>
              <span className="postUsername">
              <span className="postUsername">{post.userId}</span>
              </span>
              <span className="postDate">{post.datePosted}</span>
            </div>
            <div className="postTopRight">
              <MoreVertIcon />
            </div>
          </div>
          <div className="postCenter">
          <span className="postText">{post.text}</span>
            <img className="postImg" src="" alt=""/>
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">15 people like it</span>
            </div>
            <div className="postBottomRight">
            <button className="postCommentText">15 Comments</button>
            </div>
          </div>
        </div>
      </div>
    )
}