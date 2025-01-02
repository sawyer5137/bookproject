import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utilities/data-access";
import { CurrentUserContext } from "../CurrentUserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);

  const [showBadLogin, setShowBadLogin] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(CurrentUserContext);

  function handleLogin() {
    login(username, password)
      .then((resp) => {
        if (resp && resp.data.success) {
          setUser(resp.data.user);
          navigate("/");
        } else {
          setShowBadLogin(true);
          console.log("Login failed");
        }
      })
      .catch(() => {
        setShowBadLogin(true);
      });
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
        <div className="border-2 flex-col items-center justify-center flex p-5 rounded-md bg-slate-50">
          <h1 className="text-2xl m-1">Login</h1>
          <form className="flex flex-col items-stretch p-3 max-w-1/4">
            <div className="justify-stretch">
              <input
                type="text"
                placeholder="Username"
                className="border mb-3 p-2 bg-slate-200  placeholder-slate-600 w-full rounded-sm"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 bg-slate-200 rounded-sm">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="border mt-0 mb-0 p-2 bg-slate-200  placeholder-slate-600 flex-grow rounded-sm"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPass ? (
                <FaEye
                  onClick={() => setShowPass((prev) => !prev)}
                  className="inline size-6 pr-1 cursor-pointer "
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPass((prev) => !prev)}
                  className="inline size-6 pr-1 cursor-pointer"
                />
              )}
            </div>

            <button
              type="button"
              className="text-white bg-blue-500 py-1 px-3 mt-5 rounded-sm w-full"
              value={password}
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
          {showBadLogin && (
            <h3 className="text-red-600">Incorrect Username or Password</h3>
          )}
          <div className="flex flex-col items-center m-3">
            <p className="">Don't have an account?</p>
            <Link to="/register">Sign up now!</Link>
          </div>
        </div>
        <div className="h-1/6"></div>
      </div>
    </>
  );
};
