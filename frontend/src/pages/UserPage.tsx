import { useParams } from "react-router";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { getUserById, getUsersBooksById } from "../utilities/data-access";
import { User, UserBook } from "../models";
import { UserBooksTable } from "../components/UserBooksTable";

export const UserPage = () => {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [userBooks, setUserBooks] = useState<UserBook[] | null>(null);

  //fetches users and user's books. dependant on userId param
  useEffect(() => {
    if (params.userId) {
      getUserById(parseInt(params.userId))
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
        });

      getUsersBooksById(parseInt(params.userId))
        .then((books) => {
          setUserBooks(books);
        })
        .catch((error) => {
          console.log("Failed to find user's books", error);
        });
    }
  }, [params.userId]);

  return (
    <>
      <MainLayout>
        {user ? (
          <div className="flex flex-col items-center">
            <h3 className="text-2xl mt-3">{user.username}'s books</h3>
            {userBooks && <UserBooksTable data={userBooks} />}
          </div>
        ) : (
          <h2 className="flex flex-col item-center">User not found</h2>
        )}
      </MainLayout>
    </>
  );
};
