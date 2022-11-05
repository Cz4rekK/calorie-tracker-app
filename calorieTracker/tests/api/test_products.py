import pytest
from rest_framework.test import APIClient
from trackerApp.models import Product


client = APIClient()

@pytest.mark.django_db
def test_add_products():
    data = {
        "name" : "test",
        "kcal" : 100,
        "protein" : 10,
        "carbs" : 10,
        "fat" : 10
    }
    response = client.post("/api/products/", data)
    
    assert response.status_code == 201
    assert response.data["name"] == "test"
    
@pytest.mark.django_db
def test_get_products(product):
    response = client.get("/api/products/")
    
    assert response.status_code == 200
    assert response.data[0]["name"] == "test"
    
@pytest.mark.django_db
def test_get_product():
    product = Product.objects.create(name="test", kcal=100, protein=10, carbs=10, fat=10)
    data = {
        "name" : "test",
        "kcal" : 100,
        "protein" : 10,
        "carbs" : 10,
        "fat" : 10
    }
    
    response = client.get("/api/products", data, format='json')
    
    
    assert response.status_code == 301
    
@pytest.mark.django_db
def test_get_product_by_id(product):
    response = client.get("/api/products/1", format='json')
    assert response.status_code == 301
    
    
