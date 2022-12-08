import "./messenger.css";
import Message from "../message/Message";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Messenger({ toUser }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://" +
          process.env.URL +
          "/chats/" +
          loggedInUser._id +
          "/" +
          toUser._id
      )
      .then((res) => setMessages(res.data))
      .catch((error) => console.log(error));
  }, [toUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMsg = {
      sendUserID: loggedInUser._id,
      recieveUserID: toUser._id,
      messageText: inputMsg,
      sendDateTime: new Date(),
    };
    setMessages([...messages, newMsg]);
    setInputMsg("");
    try {
      await axios.post("http://" + process.env.URL + "/chats", newMsg);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="messenger">
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            {[...messages].reverse().map((message) => (
              <Message
                key={message._id}
                own={message.sendUserID === loggedInUser._id}
                user={toUser}
                message={message}
              />
            ))}
          </div>
          <hr />
          <form className="chatBoxBottom" onSubmit={handleSubmit}>
            <input
              className="chatMessageInput"
              placeholder="Enter Message"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
            ></input>
            <button className="chatSubmitButton" type="submit">
              Send
            </button>
          </form>
          <hr />
        </div>
      </div>
    </div>
  );
}
