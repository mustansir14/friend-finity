import Comment from "../comment/Comment";
import "./commentBlock.css";

export default function CommentBlock({ comments }) {
  return (
    <div className="commentBlock">
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
}
