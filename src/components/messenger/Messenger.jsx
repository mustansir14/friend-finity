import "./messenger.css"
import Message from "../message/Message"

export default function Messenger() {
    return (
        <div className="messenger">
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message/>
                        <Message own={true}/>
                        <Message/>
                        <Message/>
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="Enter Message"></textarea>
                        <button className="chatSubmitButton">Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
