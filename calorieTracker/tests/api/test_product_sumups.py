import pytest
from rest_framework.test import APIClient

client = APIClient()

@pytest.mark.django_db
def test_get_product_sumups():
    response = client.get("/api/productSumups")
    
    assert response.status_code == 301
    
    
@pytest.mark.django_db
def test_post_product_sumups():
    data = {
        "product": 1,
        "amount": 100,
        "meal": 1
    }
    response = client.post("/api/productSumups", data)
    
    assert response.status_code == 301