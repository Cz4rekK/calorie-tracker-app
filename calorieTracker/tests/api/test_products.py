from urllib import response
import pytest
from django.urls import reverse
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
    
@pytest.mark.django_db
def test_get_products():
    response = client.get("/api/products/")
    
    assert response.status_code == 200
    
@pytest.mark.django_db
def test_get_product():
    data = {
        "name" : "test",
        "kcal" : 100,
        "protein" : 10,
        "carbs" : 10,
        "fat" : 10
    }
    
    response = client.post("/api/products", data)
    response = client.get("/api/products/1/")
    
    assert response.status_code == 404
