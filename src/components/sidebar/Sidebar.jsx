import "./sidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";

import AddFriend from "../addFriend/AddFriend";
export default function Sidebar() {
  const [users, setUsers] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:8000/friends/notUser/" + loggedInUser._id)
      .then((res) => {
        setUsers(res.data);
      });
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <h4 className="sidebarHeader">Add New Friends</h4>
        <ul className="sidebarFriendList">
          {users.map((u) => (
            <AddFriend key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
