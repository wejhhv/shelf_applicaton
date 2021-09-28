#!/usr/bin/python3
# coding: utf-8
from flask import Flask, jsonify
from flask_cors import CORS

from usecase import Usecase

app = Flask(__name__)
CORS(app)
usecase = Usecase()


@app.route('/')
def hello():
    name = "test"
    return name + "\n"


@app.route('/user/<int:user_id>/booklist', methods=["GET"])
def booklist(user_id):
    book_titles = usecase.get_booklist(user_id)
    response = [{"title": b.title, "id": b.id} for b in book_titles]

    return jsonify(response)


@app.route('/user/<int:user_id>/book/<int:book_id>', methods=["GET"])
def bookdata(user_id, book_id):
    book = usecase.get_bookdata(user_id, str(book_id))
    response = {
        "title": book.title,
        "id": book.id,
        "purchasedShops": book.purchased_shops,
        "image": book.image,
        "author": book.author,
        "page": book.page,
        "hasRead": book.has_read,
        "description": book.description
    }
    return jsonify(response)


if __name__ == "__main__":
    # デプロイ時にdebug=False
    app.run(debug=True, host='localhost', port=8000)
