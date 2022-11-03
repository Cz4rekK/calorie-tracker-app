import pytest
from rest_framework.test import APIClient

client = APIClient()

@pytest.mark.django_db
def test_get_meal_products():
    response = client.get("/api/mealProducts")
    
    assert response.status_code == 301
    
@pytest.mark.django_db
def test_add_meal_products():
    data = {
    "meal": 1,
    "product": {
        "name": "test",
        "kcal": 1,
        "protein": 1,
        "carbs": 1,
        "fat": 1
    },
    "amount": 1
}
    response = client.post("/api/mealProducts/", data)
    
    assert response.status_code == 201