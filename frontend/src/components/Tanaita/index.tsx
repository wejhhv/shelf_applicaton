import React from "react";
import { BookListItem } from "../../models/BookListItem";
import { BookSpine } from "../BookSpine";
import "./style.scss";

type Prop = {
  bookList: BookListItem[];
  onBookSpineClick: (book: BookListItem) => void;
};

export const Tanaita: React.FC<Prop> = ({ bookList, onBookSpineClick }) => {
  return (
    <div className="tanaita">
      <div className="tanaita--container">
        {bookList.map((book) => {
          return (
            <BookSpine
              key={book.id}
              book={book}
              onBookSpineClick={onBookSpineClick}
            ></BookSpine>
          );
        })}
      </div>
      <div className="tanaita--ita">
        <div className="tanaita--ita-1"></div>
        <div className="tanaita--ita-2"></div>
      </div>
    </div>
  );
};
