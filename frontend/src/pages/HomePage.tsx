import { useContext } from "react";
import { Helmet } from "react-helmet";
import { CurrentUserContext } from "../CurrentUserContext";
import MainLayout from "../layouts/MainLayout";

export const HomePage = () => {
  const { user } = useContext(CurrentUserContext);

  return (
    <>
      <Helmet>
        <title>All Books</title>
      </Helmet>
      <MainLayout>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl m-5">Welcome {user ? user.username : ""}</h1>
        </div>
      </MainLayout>
    </>
  );
};
