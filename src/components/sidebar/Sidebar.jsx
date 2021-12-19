import "./sidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AddFriend from "../addFriend/AddFriend";
import SearchIcon from "@mui/icons-material/Search";

export default function Sidebar() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/friends/notUser/" + loggedInUser._id)
      .then((res) => {
        setAllUsers([...res.data]);
        setUsers([...res.data]);
      });
  }, []);

  const queryOnChange = (e) => {
    setQuery(e.target.value);
    const newQuery = e.target.value;
    if (newQuery === "") {
      setUsers([...allUsers]);
      return;
    }
    console.log("here");
    const newUsers = [];
    for (let i in users) {
      const fullName = users[i].firstName + " " + users[i].lastName;
      console.log(fullName, newQuery);
      if (fullName.toLowerCase().includes(newQuery.toLowerCase()))
        newUsers.push(users[i]);
    }
    setUsers([...newUsers]);
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <h4 className="sidebarHeader">Add New Friends</h4>
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for Friend"
            className="searchInput"
            value={query}
            onChange={queryOnChange}
          />
        </div>
        <ul className="sidebarFriendList">
          {users.map((u) => (
            <AddFriend key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
