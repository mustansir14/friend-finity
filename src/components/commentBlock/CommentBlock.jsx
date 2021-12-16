export default function CommentBlock({ comments }) {
  return (
    <div>
      {comments.map((comment) => {
        <div>{comment._id}</div>;
      })}
    </div>
  );
}
