import { useState } from "react";
import { UserBook } from "../models";
import { Modal } from "./Modal";
import { changeUsersBook } from "../utilities/data-access";

interface Props {
  data: Array<UserBook> | null;
  isCurrentUser: boolean;
  userId: number;
}

export const UserBooksTable = (Props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBook, setModalBook] = useState<UserBook | null>(null);

  const [modalBookRating, setModalBookRating] = useState(0);
  const [modalBookRead, setModalBookRead] = useState(false);
  const [modalBookHardCover, setModalBookHardCover] = useState(false);

  function handleApply() {
    if (modalBook) {
      changeUsersBook(
        Props.userId,
        modalBook.id,
        modalBookRating,
        modalBookRead,
        modalBookHardCover
      );
      setModalOpen(false);
      setModalBook(null);
    }
  }

  interface RowProps {
    book: UserBook;
    index: number;
  }
  const defaultClasses: string = "border-y-2 p-1 py-3";

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
        <td className={rowClasses}>
          {/* Edit button for when the user is logged into the current user's book page */}
          {Props.isCurrentUser && (
            <button
              className="px-2 py-1 rounded-md bg-white"
              onClick={() => {
                setModalBook(book);
                setModalOpen(true);

                setModalBookRating(book.rating);
                setModalBookHardCover(book.hard_cover);
                setModalBookRead(book.have_read);
              }}
            >
              Edit
            </button>
          )}
        </td>
      </tr>
    );
  };

  return (
    <>
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

      {/* modal window for editting books */}
      {modalBook && (
        <Modal isOpen={modalOpen}>
          <div className="flex flex-col items-center text-lg gap-5">
            <h1 className="text-xl">{modalBook.title}</h1>
            <form className="flex flex-col items-center gap-2">
              <div className="flex gap-3">
                <label>Rating:</label>{" "}
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="0.0 - 5.0"
                  name="rating"
                  value={modalBookRating}
                  onChange={(e) => {
                    setModalBookRating(Number(e.target.value));
                  }}
                />
              </div>

              <div>
                <label>Have Read:</label>{" "}
                <input
                  type="checkbox"
                  name="haveRead"
                  checked={modalBookRead}
                  onChange={(evt) => {
                    setModalBookRead(evt.target.checked);
                  }}
                />
              </div>

              <div>
                <label>Hard Cover:</label>{" "}
                <input
                  type="checkbox"
                  name="hardCover"
                  checked={modalBookHardCover}
                  onChange={(evt) => {
                    setModalBookHardCover(evt.target.checked);
                  }}
                />
              </div>

              <div className="flex gap-1 mt-3">
                <button
                  type="button"
                  onClick={handleApply}
                  className="bg-blue-300 px-3 p-1 round-sm"
                >
                  Apply
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModalBook(null);
                    setModalOpen(false);
                  }}
                  className="bg-red-300 px-3 p-1 rounded-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};
