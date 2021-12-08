import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function Post() {
    return (
        <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src="/assets/person/1.jpeg" alt=""/>
              <span className="postUsername">
              <span className="postUsername">Faaiz</span>
              </span>
              <span className="postDate">5 Mins Ago</span>
            </div>
            <div className="postTopRight">
              <MoreVertIcon />
            </div>
          </div>
          <div className="postCenter">
          <span className="postText">Hey! Its my First Post</span>
            <img className="postImg" src="assets/post/1.jpeg" alt=""/>
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" alt=""/>
            <img className ="heartIcon" src="assets/heart.png" alt=""/>
            <span className="postlikeCounter">32 People like it</span>
            </div>
            <div className="postBottomRight">
            <span className="postCommentText">9 Comments</span>
            </div>
          </div>
        </div>
      </div>
    )
}
