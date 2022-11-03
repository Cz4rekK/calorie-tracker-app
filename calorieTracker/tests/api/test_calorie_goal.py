import pytest
from rest_framework.test import APIClient

client = APIClient()

@pytest.mark.django_db
def test_add_calorie_goal():
    data = {
        "goal": 2500,
        "protein_percentage": 25,
        "carbs_percentage": 25,
        "fat_percentage": 50,
        "user": 1
    }
    response = client.post("/api/calorieGoal/", data)
    
    assert response.status_code == 400