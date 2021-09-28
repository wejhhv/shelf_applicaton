import os
import psycopg2
import psycopg2.extras
from urllib.parse import urlparse


DATABASE_URL = os.environ.get("DATABASE_URL")


def connect_DB():
    db_info = urlparse(DATABASE_URL)

    conn = psycopg2.connect(
        database=db_info.path[1:],
        user=db_info.username,
        password=db_info.password,
        host=db_info.hostname,
        port=db_info.port
    )
    return conn


def booklist_query(user_id: int) -> list:
    """
    引数: user_id, 返り値: user_idが持つ本のリスト
    """
    with connect_DB() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
            query = "SELECT book.title, book.ISBN FROM purchasedBook, book WHERE purchasedBook.userid = %s AND book.ISBN = purchasedBook.ISBN;"
            cur.execute(query, str(user_id))
            result = cur.fetchall()
    return result


def bookdata_query(user_id: int, book_id: str) -> list:
    """
    引数: user_id, book_id, 返り値: user_idが持つ本book_idの情報
    """
    with connect_DB() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
            query = "SELECT title, book.ISBN, image, author, page, description, hasRead, purchased_store, purchased_date FROM book INNER JOIN purchasedbook ON (purchasedBook.ISBN = book.ISBN AND purchasedBook.userid = %s AND book.ISBN = %s);"
            cur.execute(query, (str(user_id), book_id))
            result = cur.fetchall()
    return result


if __name__ == "__main__":
    arr = booklist_query(1)
    print("---book list---")
    print(arr)
    print()

    d = bookdata_query(1, "9784780802047")
    print("---book info---")
    print(d)
