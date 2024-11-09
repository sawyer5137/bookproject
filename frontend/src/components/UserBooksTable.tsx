import { UserBook } from "../models";

interface Props {
  data: Array<UserBook> | null;
}

export const UserBooksTable = (Props: Props) => {
  interface RowProps {
    book: UserBook;
    index: number;
  }
  const defaultClasses: string = "border-y-2 p-3";
  const Row = ({ book, index }: RowProps) => {
    let rowClasses = "";

    // alternates background color for each row
    if (index % 2 === 0) {
      rowClasses = defaultClasses + " bg-gray-200";
    } else {
      rowClasses = defaultClasses;
    }

    return (
      <tr className="border-2">
        <td className={rowClasses}>{book.title}</td>
        <td className={rowClasses}>{book.author}</td>
        <td className={rowClasses}>{book.rating}</td>
        <td className={rowClasses}>{book.have_read ? "Yes" : "No"}</td>
        <td className={rowClasses}>{book.hard_cover ? "Yes" : "No"}</td>
      </tr>
    );
  };

  return (
    <table className="w-full max-w-[60%] m-3">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Rating</th>
          <th>Have Read</th>
          <th>Hardcover</th>
        </tr>
      </thead>
      <tbody>
        {Props.data &&
          Props.data.map((book, i) => <Row key={i} book={book} index={i} />)}
      </tbody>
    </table>
  );
};
