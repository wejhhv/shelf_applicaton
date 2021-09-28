from db import booklist_query, bookdata_query
from response_model import BookTitle, PurchasedShop, Book


class Usecase:
    def get_booklist(self, user_id: int):
        res = booklist_query(user_id)
        return [BookTitle(title=r["title"], id=r["isbn"]) for r in res]

    def get_bookdata(self, user_id: int, book_id: str):
        res = bookdata_query(user_id, book_id)
        purchased_shops = []
        for r in res:
            purchased_shops.append(PurchasedShop(
                url=r["purchased_store"],
                purchasedDate=r["purchased_date"]
            ))
        res = res[0]
        return Book(
            title=res["title"],
            id=res["isbn"],
            purchased_shops=purchased_shops,
            image=res["image"],
            author=res["author"],
            page=res["page"],
            has_read=res["hasread"],
            description=res["description"]
        )


if __name__ == '__main__':
    usecase = Usecase()
    booklist = usecase.get_booklist(1)
    print(booklist[0].title)
    bookdata = usecase.get_bookdata(1, '9784780802047')
    print(bookdata.purchased_shops)
