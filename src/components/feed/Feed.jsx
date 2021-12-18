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
        setPosts(res.data);
      });
  }, []);

  const onChange = (posts) => {
    setPosts([...posts]);
  };

  const deleteHandler = (id) => {
    const newPosts = [];
    for (let i in Posts) {
      if (Posts[i]._id !== id) newPosts.push(Posts[i]);
    }
    setPosts(newPosts);
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share posts={Posts} onChange={onChange} />
        {Posts.map((p) => (
          <Post key={p._id} post={p} deleteHandler={deleteHandler} />
        ))}
      </div>
    </div>
  );
}
