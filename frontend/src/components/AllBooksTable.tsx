import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import { Book } from "../models";
import { getUsersBooksById } from "../utilities/data-access";

interface Props {
  data: Array<Book>;
}

export const AllBooksTable = (Props: Props) => {
  const { user } = useContext(CurrentUserContext);
  const [usersBooks, setUsersBooks] = useState<number[]>([]);

  useEffect(() => {
    if (user) {
      getUsersBooksById(user?.userId)
        .then((data) => {
          console.log("users books", data);

          const bookIds = data.map((book: Book) => book.id);
          setUsersBooks(bookIds);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  //----------- Row Component -----------
  interface RowProps {
    book: Book;
    index: number;
  }
  const defaultClasses: string = "border-2 p-3";

  const Row = ({ book, index }: RowProps) => {
    let bookOwned = false;
    let rowClasses = "";

    // alternates background color for each row
    if (index % 2 === 0) {
      rowClasses = defaultClasses + " bg-gray-100";
    } else {
      rowClasses = defaultClasses;
    }

    if (usersBooks.includes(book.id)) {
      bookOwned = true;
    }

    function handleClick() {
      console.log(`added book ${book.title}`);
    }
    return (
      <tr className="">
        <td className={rowClasses}>{book.title}</td>
        <td className={rowClasses}>{book.author}</td>
        <td className={rowClasses}>{book.year}</td>
        <td className={rowClasses}>{book.genre}</td>
        <td className={rowClasses}>{book.pages}</td>
        <td className={rowClasses}>{book.publisher}</td>
        <td>
          <button
            className={`${
              bookOwned
                ? "bg-red-300 hover:bg-red-600"
                : "bg-green-300 hover:bg-green-600"
            } text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 w-24`}
            onClick={handleClick}
          >
            {bookOwned ? "Remove" : "Add"}
          </button>
        </td>
      </tr>
    );
  };
  //----------- Row Component -----------

  return (
    <table className="w-full max-w-[60%] m-3">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Genre</th>
          <th>Pages</th>
          <th>Publisher</th>
        </tr>
      </thead>
      <tbody>
        {Props.data.map((book, i) => (
          <Row key={i} book={book} index={i} />
        ))}
      </tbody>
    </table>
  );
};
