import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import {Posts} from "../../dummyData"
import axios from 'axios'
import { useState } from 'react'
export default function Feed() {
    const [Posts, setPosts] = useState([])
    axios.get("http://localhost:8000/posts").then((res) => {
      console.log(res.data)
      setPosts(res.data);
    })
    return (
        <div className ="feed">
          <div className="feedWrapper">
            <Share/>
           {Posts.map(p=>(
             <Post key={p.id} post = {p}/>
           ))}
          </div>
        </div>
    )
}
