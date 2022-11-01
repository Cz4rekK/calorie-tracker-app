import pytest
from rest_framework.test import APIClient

client = APIClient()

@pytest.mark.django_db
def test_add_meals():
    data = {
        "name" : "test",
        "ingredients" : []
    }
    response = client.post("/api/meals/", data)
    
    assert response.status_code == 201
    
@pytest.mark.django_db
def test_get_meals():
    response = client.get("/api/meals/")
    
    assert response.status_code == 200
    
@pytest.mark.django_db
def test_get_meal():
    response = client.get("/api/meals/1/")
    
    assert response.status_code == 404