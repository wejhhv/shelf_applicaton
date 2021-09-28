import { PurchasedShop } from "./PurchasedShop";

type Args = {
  title: string;
  id: string; // ISBN
  purchasedShops: PurchasedShop[];
  image?: string;
  author: string; // 著者
  page: number;
  hasRead: boolean;
  description: string;
};

export class Book {
  constructor(args: Args) {
    this.title = args.title;
    this.id = args.id;
    this.purchasedShops = args.purchasedShops;
    this.image = args.image || null;
    this.author = args.author;
    this.page = args.page;
    this.hasRead = args.hasRead;
    this.description = args.description;
  }
  title: string;
  id: string;
  purchasedShops: PurchasedShop[];
  image: string | null;
  author: string;
  page: number;
  hasRead: boolean;
  description: string;
}
