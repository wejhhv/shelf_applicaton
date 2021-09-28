from dataclasses import dataclass
import datetime
from typing import List


@dataclass
class BookTitle(object):
    title: str
    id: str


@dataclass
class PurchasedShop(object):
    url: str
    purchasedDate: datetime.datetime


@dataclass
class Book(object):
    title: str
    id: str
    purchased_shops: List[PurchasedShop]
    image: str
    author: str
    page: int
    has_read: bool
    description: str = None
