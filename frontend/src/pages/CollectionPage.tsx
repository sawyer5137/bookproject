import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getAllBooks } from "../utilities/data-access";
import { Book } from "../interfaces/Book";
import BookTable from "../components/BookTable";
import { SearchInput } from "../components/SearchInput";

export const CollectionPage = () => {
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
        <h3 className="text-2xl mt-3">My Book Collection</h3>
        <SearchInput handleChange={handleSearch} value={searchString} />
        {data ? <BookTable data={data}></BookTable> : <h3>Loading...</h3>}
      </div>
    </MainLayout>
  );
};
