import React from "react";
import { BookListItem } from "../models/BookListItem";
import { BookSpine } from "./BookSpine";

type Prop = {
  bookList: BookListItem[];
};

export const Tanaita: React.FC<Prop> = ({ bookList }) => {
  return (
    <>
      {bookList.map((book) => {
        return <BookSpine key={book.id} title={book.title}></BookSpine>;
      })}
    </>
  );
};
