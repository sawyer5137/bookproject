import { Book } from "../interfaces/Book";
import { Row } from "./Row";

interface Props {
  data: Array<Book>;
}

const BookTable = (Props: Props) => {
  return (
    <table className="w-full max-w-[60%] m-3">
      <thead className="">
        <tr>
          <th className="">Title</th>
          <th className="">Year</th>
          <th className="">Pages</th>
          <th className="">Type</th>
          <th className="">Publisher</th>
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

export default BookTable;
