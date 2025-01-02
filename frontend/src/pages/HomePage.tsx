import { useContext } from "react";
import { Helmet } from "react-helmet";
import { CurrentUserContext } from "../CurrentUserContext";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router";

export const HomePage = () => {
  const { user } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Sawyer's Book Site</title>
      </Helmet>
      <MainLayout>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl m-5">
            Welcome {user ? user.username : ""} to Sawyer's book website.
          </h1>
          <h2 className="m-3 text-lg max-w-[40%] text-center">
            Welcome to Sawyer's Book Website – your personal library companion!
            Here, you can explore our extensive database of books, track your
            collection, and add new favorites to your shelves. Discover,
            collect, and mark your reads – all in one place!
          </h2>
          {!user && (
            <button
              className="border p-3 m-3 bg-slate-300 rounded-md text-lg"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login to get started
            </button>
          )}
        </div>
      </MainLayout>
    </>
  );
};
