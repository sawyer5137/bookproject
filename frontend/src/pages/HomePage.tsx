import MainLayout from "../layouts/MainLayout";
import { Helmet } from "react-helmet";

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>All Books</title>
      </Helmet>
      <MainLayout>
        <h1 className="">this is the main page!</h1>
      </MainLayout>
    </>
  );
};
