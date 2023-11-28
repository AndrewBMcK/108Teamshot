from flask import Flask, request
from config import me
from mock_data import catalog
import json

app = Flask(__name__)

@app.get("/")
def home():
    return "Hello from Flask!!"

@app.get("/test")
def test():
    return "This is a test page"


########################################
#########  API - Products  #############
########################################

@app.get("/api/about")
def about():
    return json.dumps({"version": 1.03, "name": 'stable3'})


@app.get("/api/about/me")
def about_me():
    return json.dumps(me)


@app.get("/api/product")
def get_products():
    return json.dumps(catalog)


@app.post("/api/product")
def save_product():
    product = request.get_json()
    #todo: save to db instead of in-memory array
    catalog.append(product)
    return json.dumps({"status":"saved"})


@app.get("/api/product/count")
def product_count():
    total = len(catalog)
    return json.dumps({"total": total})


@app.get("/api/reports/total")
def get_total():
    total = 0
    for product in catalog:
        total += product["price"]

    return json.dumps({"value": total})


@app.get("/api/categories")
def get_catergories():
    results = []
    for product in catalog:
        category = product["category"]

        if category not in results:
            results.append(category)

    return json.dumps(results)


@app.get("/api/product/category/<category>")
def product_by_category(category):
    results = []
    for product in catalog:
        if product["category"].lower() == category.lower():
            results.append(product)

    return json.dumps(results)        


@app.get("/api/product/search/<term>")
def search_product(term):
    results = []
    for product in catalog:
        if term.lower() in product["title"].lower():
            results.append(product)

    return json.dumps(results)        


app.run(debug=True)