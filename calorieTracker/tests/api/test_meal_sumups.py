import pytest
from rest_framework.test import APIClient

client = APIClient()

@pytest.mark.django_db
def test_get_product_sumups():
    response = client.get("/api/productSumups")
    
    assert response.status_code == 301
    
def test_post_meal_sumups():
    data = {
       "meal": 1,
       "sumup": 1,
       "amount": 100
    }
    response = client.post("/api/mealSumups", data)
    
    assert response.status_code == 301