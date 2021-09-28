import React from "react";
import { useBookList } from "./hooks/useBookList";
import { Tanaita } from "./Tanaita";

export const BookShelf: React.FC = () => {
  const bookList = useBookList();

  return (
    <>
      {/* tanaita に booklist を渡す */}
      <div>
        <Tanaita bookList={bookList} />
      </div>
    </>
  );
};
