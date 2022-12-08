import "./register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function Register() {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [fileInput, setFileInput] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^ ]+$");
    if (password.length >= 8 && pattern.test(password)) {
      if (password === repPassword) {
        setErrorMsg("");
        try {
          const res = await axios.post("http://" + process.env.URL + "/users", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            gender: gender,
            dateOfBirth: dob,
            profilePicURL: previewSource,
            city: city,
            country: country,
          });
          console.log(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/home");
        } catch (e) {
          setErrorMsg(e.error);
        }
      } else {
        setErrorMsg("Passwords do not match.");
      }
    } else {
      setErrorMsg(
        "Password should include minimum 8 characters, lowercase character, uppercase character, number and not include spaces."
      );
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
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">FriendFinity</h3>
          <span className="registerDesc">A Doorway To Infinite Friends</span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <img
              src={previewSource ? previewSource : "/assets/no-profile-pic.png"}
              className="userImg"
              alt="userImg"
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="registerInput"
              required={true}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="registerInput"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select
              placeholder="Gender"
              className="registerInput"
              required={true}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled selected>
                Select Gender
              </option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="o">Other</option>
            </select>
            <input
              placeholder="Date of Birth"
              className="registerInput"
              type="text"
              onFocus={(e) => {
                e.currentTarget.type = "date";
                e.currentTarget.max = "2010-12-31";
                e.currentTarget.focus();
              }}
              onBlur={(e) => {
                e.currentTarget.type = "text";
                e.currentTarget.blur();
              }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              id="date"
            />
            <input
              placeholder="City"
              className="registerInput"
              required={true}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="Country"
              className="registerInput"
              required={true}
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              placeholder="Password"
              className="registerInput"
              required={true}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Repeat Password"
              className="registerInput"
              required={true}
              type="password"
              value={repPassword}
              onChange={(e) => setRepPassword(e.target.value)}
            />
            {errorMsg && <span className="errorMsg">{errorMsg}</span>}
            <button type="submit" className="registerButton">
              {uploading ? (
                <ClipLoader color="#6699CC" loading={true} size={14} />
              ) : (
                "Sign Up"
              )}
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
