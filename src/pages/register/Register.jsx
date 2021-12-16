import './register.css'

export default function Register() {
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">FriendFinity</h3>
                    <span className="registerDesc">
                        Doorway To Infinite Friends
                    </span>
                </div>
                <div className="registerRight">
                <div className="registerBox">
                    <input placeholder="First Name" className="registerInput" />
                    <input placeholder="Last Name" className="registerInput" />
                    <input placeholder="Email" className="registerInput" />
                    <input placeholder="Gender" className="registerInput" />
                    <input placeholder="City" className="registerInput" />
                    <input placeholder="Country" className="registerInput" />
                    <input placeholder="Password" className="registerInput" />
                    <input placeholder="Password Again" className="registerInput" />
                    <button className="registerButton">Sign Up</button>
                    <button className="registerRegisterButton">
                    Log into Account
            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
