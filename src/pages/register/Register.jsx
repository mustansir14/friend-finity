import './register.css'

export default function Register() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">FriendFinity</h3>
                    <span className="loginDesc">
                        Doorway To Infinite Friends
                    </span>
                </div>
                <div className="loginRight">
                <div className="loginBox">
                    <input placeholder="First Name" className="loginInput" />
                    <input placeholder="Last Name" className="loginInput" />
                    <input placeholder="Email" className="loginInput" />
                    <input placeholder="Gender" className="loginInput" />
                    <input placeholder="City" className="loginInput" />
                    <input placeholder="Country" className="loginInput" />
                    <input placeholder="Password" className="loginInput" />
                    <input placeholder="Password Again" className="loginInput" />
                    <button className="loginButton">Sign Up</button>
                    <button className="loginRegisterButton">
                    Log into Account
            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
