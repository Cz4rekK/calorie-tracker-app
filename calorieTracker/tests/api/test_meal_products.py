import pytest
from rest_framework.test import APIClient
from trackerApp.models import Product

client = APIClient()

@pytest.mark.django_db
def test_get_meal_products():
    response = client.get("/api/mealProducts")
    
    assert response.status_code == 301
    
@pytest.mark.django_db
def test_get_meal_products():
    response = client.get("/api/mealProducts/1")
    
    assert response.status_code == 301
    