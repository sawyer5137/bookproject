import { useState } from "react";
import { register } from "../utilities/data-access";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);

  const navigate = useNavigate();

  function handleClick() {
    if (password === confirmPassword) {
      register(username, password)
        .then((resp) => {
          if (resp && resp.data.success) {
            navigate("/");
          }
        })
        .catch(() => {
          setUsernameTaken(true);
        });
    } else {
      setPasswordsMatch(true);
    }
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
        <div className="border-2 flex-col items-center justify-center flex p-5 rounded-md bg-slate-50">
          <h1 className="text-2xl m-1">Register</h1>
          <form className="flex flex-col items-stretch p-3 max-w-1/4">
            <div className="justify-stretch">
              <input
                type="text"
                placeholder="Username"
                className="border mb-3 p-2 bg-slate-200  placeholder-slate-600 w-full rounded-sm"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsernameTaken(false);
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="justify-stretch">
              <input
                type="password"
                placeholder="Password"
                className="border mb-3 p-2 bg-slate-200  placeholder-slate-600 w-full rounded-sm"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordsMatch(false);
                }}
              />
            </div>

            <div className="justify-stretch">
              <input
                type="password"
                placeholder="Confirm Password"
                className="border mb-3 p-2 bg-slate-200  placeholder-slate-600 w-full rounded-sm"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordsMatch(false);
                }}
              />
            </div>
            {passwordsMatch && (
              <span className="text-red-600">Passwords must match</span>
            )}
            {usernameTaken && (
              <span className="text-red-600">Username already taken</span>
            )}
            <button
              type="button"
              className="text-white bg-blue-500 py-1 px-3 mt-5 rounded-sm w-full"
              onClick={handleClick}
            >
              Register
            </button>
          </form>
        </div>
        <div className="h-1/6"></div>
      </div>
    </>
  );
};
