import { useEffect, useState } from "react";
import { getBookList } from "../../api";
import { BookListItem } from "../../models/BookListItem";

export const useBookList = () => {
  const [bookList, setBookList] = useState<BookListItem[]>([]);

  const _getBookList = async () => {
    setBookList(await getBookList("1"));
  };

  useEffect(() => {
    _getBookList();
  }, []);

  return bookList;
};
