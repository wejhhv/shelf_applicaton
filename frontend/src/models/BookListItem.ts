type Args = {
  title: string;
  id: string; // ISBN?
};

export class BookListItem {
  constructor(args: Args) {
    this.title = args.title;
    this.id = args.id;
  }
  title: string;
  id: string;
}
