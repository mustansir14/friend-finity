import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Feed({ profile = false }) {
  const [Posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(
        profile
          ? "http://localhost:8000/posts/user/" + user._id
          : "http://localhost:8000/posts/"
      )
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      });
  }, [profile, user]);

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
