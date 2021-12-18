import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/users/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");
    } catch (error) {
      const errorMsg = error.response.data.error;
      if (errorMsg === "Invalid Password") {
        setInvalidPassword(true);
        setInvalidEmail(false);
      } else if (errorMsg === "User does not exist") {
        setInvalidEmail(true);
        setInvalidPassword(false);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FriendFinity</h3>
          <span className="loginDesc">Doorway To Infinite Friends</span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleSubmit} className="loginBox">
            <input
              placeholder="Email"
              className="loginInput"
              type="text"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            {invalidEmail && (
              <span className="incorrect-msg">No user with this email</span>
            )}
            {invalidPassword && (
              <span className="incorrect-msg">Incorrect Password</span>
            )}
            <button className="loginButton" type="submit">
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/register")}
            >
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
