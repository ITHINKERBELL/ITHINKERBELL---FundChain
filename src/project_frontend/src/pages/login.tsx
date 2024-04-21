import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cookies, login } from "../services/entry";

const Login = () => {
    const emailRef = useRef(null);
    const navigate = useNavigate();
    const [userIdentifier, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            const res: any = await login(userIdentifier, password);
            if (res.message === "success") {
                cookies.set('token', res.token);
                cookies.set('userType', res.user.userType);
                cookies.set('userFullName', res.userFullName);
                cookies.set('username', res.user.username);
                cookies.set('email', res.user.email);
                cookies.set('id', res.user.id);

                navigate("/");
                window.location.reload();
            } else {
                // TODO: Show Component about the error
                console.log(res);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="wrapper">
                <form>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Email or Username"
                            required
                            value={userIdentifier}
                            onChange={(e) => setUsername(e.target.value)}
                            ref={emailRef}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="remember-forgot">
                        <label>
                            {/* TODO: fix this */}
                            <input type="checkbox" /> Remember me?
                        </label>
                        <a href="#"> Forgot password?</a>
                    </div>
                    <button className="login" type="button" onClick={handleLogin}>
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;
