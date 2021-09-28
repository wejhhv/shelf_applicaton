import axios from "axios";
import { BookListItem } from "../models/BookListItem";
import { Book } from "../models/Book";
import { PurchasedShop } from "../models/PurchasedShop";
require("dotenv").config();

type BookListResponse = [
  {
    title: string;
    id: string; // ISBN?
  }
];

type PurchasedShopResponse = {
  url: string;
  purchasedDate: Date;
};

type BookResponse = {
  title: string;
  id: string; // ISBN
  purchasedShops: PurchasedShopResponse[];
  image?: string;
  author: string; // 著者
  page: number;
  hasRead: boolean;
  description: string;
};

export const getBookList = (uid: string) => {
  return axios
    .get<BookListResponse>(
      `${process.env.REACT_APP_BASE_URL}/user/${uid}/booklist`
    )
    .then((res) => res.data.map((item) => new BookListItem(item)));
};

export const __mockGetBookList: typeof getBookList = async (uid: string) => {
  const sleep = (msec: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, msec));

  await sleep(3000);
  return [
    new BookListItem({
      id: "hogehoge",
      title: "fugafuga",
    }),
  ];
};

export const getBookByID = (uid: string, bookId: string) => {
  return axios
    .get<BookResponse>(
      `${process.env.REACT_APP_BASE_URL}/user/${uid}/book/${bookId}`
    )
    .then(
      (res) =>
        new Book({
          ...res.data,
          purchasedShops: res.data.purchasedShops.map(
            (purchasedShop) => new PurchasedShop(purchasedShop)
          ),
        })
    );
};
