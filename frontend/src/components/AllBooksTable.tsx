import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import { Book } from "../models";
import { getUsersBooksById } from "../utilities/data-access";
import { addUserBook, removeUserBook } from "../utilities/data-access";

interface Props {
  data: Array<Book>;
}

export const AllBooksTable = (Props: Props) => {
  const { user } = useContext(CurrentUserContext);
  const [usersBooks, setUsersBooks] = useState<number[]>([]);

  console.log("CURRENT USER", user);

  useEffect(() => {
    if (user) {
      getUsersBooksById(user?.userId)
        .then((data) => {
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
  const defaultClasses: string = "border-y-2 p-3";

  const Row = ({ book, index }: RowProps) => {
    const [bookOwned, setBookOwned] = useState(usersBooks.includes(book.id));
    let rowClasses = "";

    // alternates background color for each row
    if (index % 2 === 0) {
      rowClasses = defaultClasses + " bg-gray-200";
    } else {
      rowClasses = defaultClasses;
    }

    function handleClick() {
      if (user && book) {
        if (bookOwned) {
          removeUserBook(user?.userId, book.id);
          setBookOwned(false);
        } else {
          addUserBook(user?.userId, book.id);
          setBookOwned(true);
        }
      }
    }

    return (
      <tr className="border">
        <td className={rowClasses}>{book.title}</td>
        <td className={rowClasses}>{book.author}</td>
        <td className={rowClasses}>{book.year}</td>
        <td className={rowClasses}>{book.genre}</td>
        <td className={rowClasses}>{book.pages}</td>
        <td className={rowClasses}>{book.publisher}</td>
        {null != user && (
          <td className={rowClasses + " text-center"} onClick={handleClick}>
            <button
              className={
                "px-2 py-1 rounded-md " +
                (bookOwned ? "bg-white " : "bg-yellow-400")
              }
            >
              {bookOwned ? "Remove" : "Add"}
            </button>
          </td>
        )}
      </tr>
    );
  };
  //----------- Row Component -----------

  return (
    <table className="w-full max-w-[60%] m-3 whitespace-nowrap">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Genre</th>
          <th>Pages</th>
          <th>Publisher</th>
          {null != user && <th>Your Collection</th>}
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
