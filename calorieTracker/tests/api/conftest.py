import pytest
from django.test import Client
from trackerApp.models import Meal, Product, MealProduct, DailySumup, ProductSumup, MealSumup, CalorieGoal

@pytest.fixture
def client():
    return Client()

@pytest.fixture
def meal():
    return Meal.objects.create(name="test", ingredients=[])
    
@pytest.fixture
def product():
    Product.objects.create(name="test", kcal=100, protein=10, carbs=10, fat=10)
    Product.objects.create(name="test2", kcal=100, protein=10, carbs=10, fat=10)
    Product.objects.create(name="test3", kcal=100, protein=10, carbs=10, fat=10)
    
    return Product.objects.all()

@pytest.fixture
def mealProduct(product, meal):
    return MealProduct.objects.create(meal=meal, product=product[0], amount=1)

@pytest.fixture
def dailySumup():
    return DailySumup.objects.create(date="2021-01-01", meals=[], products=[], user=1)

@pytest.fixture
def productSumup(product):
    return ProductSumup.objects.create(product=product[0], sumup=1, amount=1)

@pytest.fixture
def mealSumup(meal):
    return MealSumup.objects.create(meal=meal, sumup=1, amount=1)

@pytest.fixture
def calorieGoal():
    return CalorieGoal.objects.create(goal=2500, protein_percentage=25, carbs_percentage=25, fat_percentage=50, user=1)