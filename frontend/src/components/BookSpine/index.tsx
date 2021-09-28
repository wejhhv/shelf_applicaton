import { BookListItem } from "../../models/BookListItem";
import "./style.scss";

type Prop = {
  book: BookListItem;
  onBookSpineClick: (book: BookListItem) => void;
};

export const BookSpine: React.FC<Prop> = ({ book, onBookSpineClick }) => {
  return (
    <div
      className="book-spine-wrapper"
      tabIndex={0}
      onClick={() => onBookSpineClick(book)}
      onKeyDown={(event) => {
        // TODO: 他にも多数使うようであれば util 化する
        if (event.key === "Enter" || event.key === " ") onBookSpineClick(book);
      }}
    >
      <p className="book-spine-title">{book.title}</p>
    </div>
  );
};
