import "./share.css";
import "../post/post.css";
import { PermMedia } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function Share(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [postText, setPostText] = useState("");
  const [fileInput, setFileInput] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(postText || previewSource)) return;
    setUploading(true);
    try {
      const data = {
        userID: user._id,
      };
      if (postText) data["text"] = postText;
      if (previewSource) data["imageURL"] = previewSource;
      const res = await axios.post("http://localhost:8000/posts", data);
      props.posts.unshift(res.data);
      props.onChange(props.posts);
      console.log("uploaded");
      setPostText("");
      setFileInput("");
      setPreviewSource("");
    } catch (error) {
      console.log(error);
    }
    setUploading(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    } else {
      setPreviewSource("");
    }
  };
  return (
    <form className="share" onSubmit={handleSubmit}>
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicURL
                ? user.profilePicURL
                : "/assets/no-profile-pic.png"
            }
            alt=""
          />
          <input
            placeholder="Have something to share with your friends?"
            className="shareInput"
            type="text"
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
          />
        </div>
        {previewSource && (
          <img className="postImg" src={previewSource} alt="" />
        )}
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <input
                className="shareOptionText"
                type="file"
                name="Photo/Video"
                accept="image/*"
                onChange={handleFileInputChange}
                value={fileInput}
              />
            </div>
          </div>
          <button className="shareButton" type="submit">
            {uploading ? (
              <ClipLoader color="#6699CC" loading={true} size={14} />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
