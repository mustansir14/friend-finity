import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { Posts } from "../../dummyData";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Feed() {
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/posts").then((res) => {
      console.log(res.data);
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
