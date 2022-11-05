import pytest
from rest_framework.test import APIClient

client = APIClient()

@pytest.mark.django_db
def test_get_daily_sumup():
    response = client.get("/api/dailySumups")
    
    assert response.status_code == 301
    
@pytest.mark.django_db
def test_post_daily_sumup():
    data = {
        "date": "2020-12-12",
        "meals": [],
        "products": [],
        "user": 1
    }
    response = client.post("/api/dailySumups", data)
    
    assert response.status_code == 301