import { useParams } from "react-router";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { getUserById, getUsersBooksById } from "../utilities/data-access";
import { User, UserBook } from "../models";
import { UserBooksTable } from "../components/UserBooksTable";
import { SearchInput } from "../components/SearchInput";

export const UserPage = () => {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [userBooks, setUserBooks] = useState<UserBook[] | null>(null);
  const [tableData, setTableData] = useState<UserBook[] | null>(null);
  const [searchString, setSearchString] = useState("");

  function handleSearch(searchString: string) {
    setSearchString(searchString);
  }

  //fetches users and user's books. dependent on userId param
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

  //changes data whenever the searchString is changed
  useEffect(() => {
    if (searchString && userBooks) {
      setTableData(() => {
        return userBooks.filter((book) => {
          return book.title.toLowerCase().includes(searchString.toLowerCase());
        });
      });
    } else {
      setTableData(userBooks);
    }
  }, [searchString, userBooks]);

  return (
    <>
      <MainLayout>
        {user ? (
          <div className="flex flex-col items-center">
            <div className="flex max-w-[60%] w-full justify-between m-5">
              <h3 className="text-3xl mt-3">{`${user.username}'s books`}</h3>
              <SearchInput handleChange={handleSearch} value={searchString} />
            </div>
            <UserBooksTable data={tableData} />
          </div>
        ) : (
          <h2 className="flex flex-col item-center">User not found</h2>
        )}
      </MainLayout>
    </>
  );
};
