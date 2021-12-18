import "./register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function Register() {
  let navigate = useNavigate();
  const [fileInput, setFileInput] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">FriendFinity</h3>
          <span className="registerDesc">Doorway To Infinite Friends</span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <img
              src={previewSource ? previewSource : "/assets/no-profile-pic.png"}
              className="userImg"
            />
            <label htmlFor="files" className="selectDisplayBtn">
              Browse Picture
            </label>
            <input
              style={{ display: "none" }}
              id="files"
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              value={fileInput}
            />
            <input
              type="text"
              placeholder="First Name"
              className="registerInput"
              required={true}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="registerInput"
              required={true}
            />
            <input
              type="email"
              placeholder="Email"
              className="registerInput"
              required={true}
            />
            <select
              placeholder="Gender"
              className="registerInput"
              required={true}
            >
              <option value="" disabled selected>
                Select Gender
              </option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="o">Other</option>
            </select>
            <input
              type="date"
              className="registerInput"
              placeholder="Date of Birth"
            />
            <input
              placeholder="City"
              className="registerInput"
              required={true}
              type="text"
            />
            <input
              placeholder="Country"
              className="registerInput"
              required={true}
              type="text"
            />
            <input
              placeholder="Password"
              className="registerInput"
              required={true}
              type="password"
            />
            <input
              placeholder="Repeat Password"
              className="registerInput"
              required={true}
              type="password"
            />
            <button type="submit" className="registerButton">
              Sign Up
            </button>
            <button
              className="registerRegisterButton"
              onClick={() => navigate("/login")}
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
