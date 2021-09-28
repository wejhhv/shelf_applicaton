import React, { useContext, useEffect, useState } from "react";
import { BookListItem } from "../../models/BookListItem";
import { BookInfoModal } from "../BookInfoModal";
import { useBookList } from "../hooks/useBookList";
import { Tanaita } from "../Tanaita";
import "./style.scss";

import { authContext } from "../hooks/useAuthContext";
import { useHistory } from "react-router";

export const BookShelf: React.FC = () => {
  const bookList = useBookList();
  // userIdの共有
  const auth = useContext(authContext);
  const history = useHistory();

  const [targetBookId, setTargetBookId] = useState<string | null>(null);

  const handleBookSpineClick = (book: BookListItem) => {
    setTargetBookId(book.id);
  };

  const handleCloseModal = () => {
    setTargetBookId(null);
  };

  // bookListをn分割した配列の生成
  const bookListSplit = (bookList: BookListItem[], n: number) =>
    bookList.reduce<BookListItem[][]>(
      (acc, _, index) =>
        index % n ? acc : [...acc, bookList.slice(index, index + n)],
      []
    );

  useEffect(() => {
    // userIdがnullであれば、ログインへリダイレクト
    if (!auth.userId) {
      history.push("/login");
    }
  }, [auth.userId, history]);

  return (
    <>
      <div className="book-shelf-size book-shelf-bg">
        {/* n=20はマジックナンバー。一旦これぐらいの見積。 */}
        {bookListSplit(bookList, 20).map((books, index) => (
          <Tanaita
            bookList={books}
            onBookSpineClick={handleBookSpineClick}
            key={index}
          />
        ))}
        {targetBookId ? (
          <BookInfoModal
            bookId={targetBookId}
            onCloseModal={handleCloseModal}
          />
        ) : null}
      </div>
    </>
  );
};
