import React, { useCallback, useEffect, useState } from "react";
import { getBookByID } from "../../api/BookAPI";
import { Book } from "../../models/Book";
import "./style.scss";

type PanelProp = {
  book: Book;
  onCloseModal?: () => void;
};

const BookInfoModalPanel: React.FC<PanelProp> = ({ book, onCloseModal }) => {
  const modifyNewLine = (text: string) => text.replaceAll("\\n", "\n");

  // TODO: モック時はフロントでURLを見て書店名を切り分ける
  const convertUrlToShopName = (url: string) => {
    if (url.indexOf("amazon") >= 0) return "Amazon";
    else if (url.indexOf("rakuten") >= 0) return "楽天";
    else return "その他の店舗";
  };

  return (
    <div
      className="book-info-panel"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="book-info-panel--close-button"
        onClick={onCloseModal}
        autoFocus={true}
      >
        ✕
      </button>
      <div className="book-info-panel--left">
        <div className="book-info-panel--image">
          {book.image ? <img src={book.image} alt="本の表紙" /> : null}
        </div>
      </div>
      <div className="book-info-panel--right">
        <div className="book-info-panel--title">{book.title}</div>
        <div className="book-info-panel--author">{book.author}</div>
        <div className="book-info-panel--shops">
          {book.purchasedShops.map((shop) => (
            <a
              className="book-info-panel--shop"
              href={shop.url}
              target="_blank"
              rel="noreferrer"
            >
              {convertUrlToShopName(shop.url)}で読む
            </a>
          ))}
        </div>
        <div className="book-info-panel--description">
          {modifyNewLine(book.description)}
        </div>
      </div>
    </div>
  );
};

type Prop = {
  bookId: string;
  onCloseModal: () => void;
};

export const BookInfoModal: React.FC<Prop> = ({ bookId, onCloseModal }) => {
  const [bookInfo, setBookInfo] = useState<Book>();

  const _getBookInfo = async (bookId: string) => {
    setBookInfo(await getBookByID("1", bookId));
  };

  useEffect(() => {
    _getBookInfo(bookId);
  }, [bookId]);

  // escキーが押されたらモーダルを閉じる(リスナの生成)
  const closeModalKeyboardListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  // escキーが押されたらモーダルを閉じる(リスナ登録と解除)
  useEffect(() => {
    document.addEventListener("keydown", closeModalKeyboardListener);

    return document.removeEventListener("keydown", closeModalKeyboardListener);
  }, [closeModalKeyboardListener]);

  return (
    <div className="book-info-modal-wrapper" onClick={onCloseModal}>
      <div className="book-info-modal">
        {bookInfo ? (
          <BookInfoModalPanel book={bookInfo} onCloseModal={onCloseModal} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};
