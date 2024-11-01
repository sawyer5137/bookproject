import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CollectionPage } from "./pages/CollectionPage";
import { AllBooksPage } from "./pages/AllBooksPage";
import { UserPage } from "./pages/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/all" element={<AllBooksPage />} />
      <Route path="/user/:userId" element={<UserPage />} />
    </Routes>
  );
}

export default App;
