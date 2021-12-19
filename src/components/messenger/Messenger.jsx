import "./messenger.css";
import Message from "../message/Message";

export default function Messenger() {
  return (
    <div className="messenger">
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message />
            <Message own={true} />
            <Message />
            <Message />
            <Message />
            <Message own={true} />
            <Message />
            <Message />
          </div>
          <hr />
          <div className="chatBoxBottom">
            <input
              className="chatMessageInput"
              placeholder="Enter Message"
            ></input>
            <button className="chatSubmitButton">Send</button>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}
