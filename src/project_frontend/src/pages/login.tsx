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
      if (res.message === "Success") {
        cookies.set("token", res.token);
        cookies.set("userType", res.userType);
        cookies.set("userFullName", res.userFullName);
        cookies.set("username", res.username);
        cookies.set("email", res.email);
        cookies.set("id", res.id);

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
    <div className="login-container flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="wrapper bg-white p-8 rounded-lg shadow-md">
        <form>
          <div className="login-text font-semibold text-center mb-4 text-lg text-gray-800">
            Login to your account
          </div>
          <div className="input-box mb-4">
            <input
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              placeholder="Email or Username"
              required
              value={userIdentifier}
              onChange={(e) => setUsername(e.target.value)}
              ref={emailRef}
            />
          </div>
          <div className="input-box mb-4">
            <input
              className="w-full px-3 py-2 border rounded-md"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="remember-forgot mb-4 flex justify-between items-center text-gray-600">
            <label className="mr-4">
              <input type="checkbox" className="mr-2" /> Remember me?
            </label>
            <a href="#" className="text-blue-500">
              Forgot password?
            </a>
          </div>
          <button
            className="login w-full py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
