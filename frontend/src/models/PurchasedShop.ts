type Args = {
  url: string;
  purchasedDate: Date;
};

export class PurchasedShop {
  constructor(args: Args) {
    this.url = args.url;
    this.purchasedDate = args.purchasedDate;
  }
  url: string;
  purchasedDate: Date;

  static fromJSON(url: string, date: number) {
    // purchase date を Date 型に変換する処理
  }
}
