import React from "react";
import { Book } from "../interfaces/Book";

interface RowProps {
  book: Book;
  index: number;
}

const defaultClasses: string = "border-2 p-3";

export const Row: React.FC<RowProps> = ({ book, index }) => {
  let rowClasses = "";

  // alternates background color for each row
  if (index % 2 === 0) {
    rowClasses = defaultClasses + " bg-gray-100";
  } else {
    rowClasses = defaultClasses;
  }

  return (
    <tr className="border-2">
      <td className={rowClasses}>{book.title}</td>
      <td className={rowClasses}>{book.year}</td>
      <td className={rowClasses}>{book.pages}</td>
      <td className={rowClasses}>{book.type}</td>
      <td className={rowClasses}>{book.publisher}</td>
    </tr>
  );
};
