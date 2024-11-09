import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getAllBooks } from "../utilities/data-access";
import { Book } from "../models";
import { AllBooksTable } from "../components/AllBooksTable";
import { SearchInput } from "../components/SearchInput";
import { Helmet } from "react-helmet";

export const AllBooksPage = () => {
  const [tableData, setTableData] = useState<Book[] | null>(null);
  const [searchString, setSearchString] = useState<string>("");
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  //initially sets allBooks
  useEffect(() => {
    getAllBooks().then((resp) => {
      return setAllBooks(resp);
    });
  }, []);

  //changes data whenever the searchString is changed
  useEffect(() => {
    if (searchString) {
      setTableData(() => {
        return allBooks.filter((book) =>
          book.title.toLowerCase().includes(searchString.toLowerCase())
        );
      });
    } else {
      setTableData(allBooks);
    }
  }, [searchString, allBooks]);

  function handleSearch(searchString: string) {
    setSearchString(searchString);
  }

  return (
    <>
      <Helmet>
        <title>Sawyer's Book Site</title>
      </Helmet>
      <MainLayout>
        <div className="flex flex-col items-center">
          <div className="flex max-w-[60%] w-full justify-between m-5">
            <h3 className="text-3xl mt-3">All Books</h3>
            <SearchInput handleChange={handleSearch} value={searchString} />
          </div>
          {tableData ? <AllBooksTable data={tableData} /> : <h3>Loading...</h3>}
        </div>
      </MainLayout>
    </>
  );
};
