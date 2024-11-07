import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getAllBooks } from "../utilities/data-access";
import { Book } from "../models";
import { AllBooksTable } from "../components/AllBooksTable";
import { SearchInput } from "../components/SearchInput";

export const AllBooksPage = () => {
  const [data, setData] = useState<Book[] | null>(null);
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
      setData(() => {
        return allBooks.filter((book) => {
          return book.title.toLowerCase().includes(searchString.toLowerCase());
        });
      });
    } else {
      setData(allBooks);
    }
  }, [searchString, allBooks]);

  function handleSearch(searchString: string) {
    setSearchString(searchString);
  }

  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <h3 className="text-2xl mt-3">All Books</h3>
        <SearchInput handleChange={handleSearch} value={searchString} />
        {data ? <AllBooksTable data={data} /> : <h3>Loading...</h3>}
      </div>
    </MainLayout>
  );
};
