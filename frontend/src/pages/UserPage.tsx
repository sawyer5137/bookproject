import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { SearchInput } from "../components/SearchInput";
import { UserBooksTable } from "../components/UserBooksTable";
import MainLayout from "../layouts/MainLayout";
import { User, UserBook } from "../models";
import { getUserById, getUsersBooksById } from "../utilities/data-access";
import { CurrentUserContext } from "../CurrentUserContext";
import { Helmet } from "react-helmet";

export const UserPage = () => {
  const params = useParams();
  const [pageUser, setPageUser] = useState<User | null>(null);
  const [userBooks, setUserBooks] = useState<UserBook[] | null>(null);
  const [tableData, setTableData] = useState<UserBook[] | null>(null);
  const [searchString, setSearchString] = useState("");

  const { user: currentUser } = useContext(CurrentUserContext);

  function handleSearch(searchString: string) {
    setSearchString(searchString);
  }

  function formatDate(date: string) {
    const index = date.indexOf("T");
    return date.slice(0, index);
  }

  //fetches users and user's books. dependent on userId param
  useEffect(() => {
    if (params.userId) {
      getUserById(parseInt(params.userId))
        .then((user) => {
          setPageUser(user);
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
      <Helmet>
        <title>{pageUser?.username + "'s Books"}</title>
      </Helmet>
      <MainLayout>
        {pageUser && userBooks && pageUser.roleId ? (
          <div className="flex flex-col items-center">
            <div className="flex max-w-[60%] w-full justify-between m-5">
              <h3 className="text-3xl mt-3">{`${pageUser.username}'s books`}</h3>
              <SearchInput handleChange={handleSearch} value={searchString} />
            </div>
            <div className="border-2 max-w-[60%] w-full flex justify-between px-5 text-lg font-medium bg-slate-50">
              <div className="m-3">Total Books: {userBooks.length}</div>
              <div className="m-3">
                User Since: {formatDate(pageUser.createdAt)}
              </div>
              <div className="m-3">
                User Role: {pageUser.roleId == 1 ? "Admin" : "User"}
              </div>
            </div>

            <UserBooksTable
              data={tableData}
              isCurrentUser={
                currentUser ? pageUser.userId === currentUser.userId : false
              }
              userId={currentUser ? currentUser.userId : null}
            />
          </div>
        ) : (
          <h2 className="flex flex-col item-center">
            <div>User not found</div>
          </h2>
        )}
      </MainLayout>
    </>
  );
};
