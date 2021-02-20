# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class GameDetailItem(scrapy.Item):
    appid = scrapy.Field()
    name = scrapy.Field()
    is_free = scrapy.Field()
    header_image = scrapy.Field()
    website = scrapy.Field()
    developers = scrapy.Field()
    publishers = scrapy.Field()
    price_overview = scrapy.Field()
    genres = scrapy.Field()

