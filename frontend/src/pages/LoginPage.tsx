import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utilities/data-access";
import { CurrentUserContext } from "../CurrentUserContext";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(CurrentUserContext);

  function handleLogin() {
    login(username, password)
      .then((resp) => {
        if (resp && resp.data.success) {
          setUser(resp.data.user);
          navigate("/");
        } else {
          console.log("Login failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl m-1">Login</h1>
      <form className="border flex flex-col items-center p-3 w-1/4">
        <div className="flex space-x-5">
          <label className="text-center">Username </label>
          <input
            type="text"
            className="border m-3 mt-0"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex space-x-5">
          <label className="text-center">Password</label>
          <input
            type={showPass ? "text" : "password"}
            className="border m-3 mt-0 mb-0"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p
          className="text-xs text-slate-500 cursor-pointer select-none"
          onClick={() => setShowPass((prev) => !prev)}
        >
          {showPass ? "Hide" : "Show"} Password
        </p>
        <button
          type="button"
          className="text-white bg-blue-500 py-1 px-3 m-1 mt-5 rounded-sm"
          value={password}
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      <div className="flex flex-col items-center m-3">
        <p className="">Don't have an account?</p>
        <Link to="/register">Sign up now!</Link>
      </div>
      <div className="h-1/6"></div>
    </div>
  );
};
