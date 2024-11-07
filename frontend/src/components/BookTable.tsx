import { Book } from "../models";
import { Row } from "./Row";

interface Props {
  data: Array<Book>;
}

const BookTable = (Props: Props) => {
  return (
    <table className="w-full max-w-[60%] m-3">
      {/* headers */}
      <thead className="">
        <tr>
          <th className="">Title</th>
          <th className="">Author</th>
          <th className="">Year</th>
          <th className="">Pages</th>
          <th className="">Type</th>
        </tr>
      </thead>
      {/* table body */}
      <tbody>
        {Props.data.map((book, i) => (
          <Row key={i} book={book} index={i} />
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
