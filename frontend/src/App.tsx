import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CurrentUserContext } from "./CurrentUserContext";
import { User } from "./models";
import { AllBooksPage } from "./pages/AllBooksPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import { RegisterPage } from "./pages/RegisterPage";
import { checkSession } from "./utilities/data-access";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentUser === null) {
      checkSession().then((resp) => {
        setCurrentUser(resp.user);
      });
    }
  });

  return (
    <CurrentUserContext.Provider
      value={{ user: currentUser, setUser: setCurrentUser }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all" element={<AllBooksPage />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
