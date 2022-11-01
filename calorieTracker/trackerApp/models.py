from django.db import models
from django.conf import settings
# Create your models here.



class Product(models.Model):
    """ Product model"""
    name = models.CharField(max_length=200)
    kcal = models.IntegerField()
    protein = models.IntegerField()
    carbs = models.IntegerField()
    fat = models.IntegerField()


class Meal(models.Model):
    """ Meal model"""
    name = models.CharField(max_length=200)
    ingredients = models.ManyToManyField(Product, through='MealProduct')

class MealProduct(models.Model):
    """ MealProduct model connecting Meal and Product"""
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount = models.IntegerField(default=100) # 100g or 100ml
    
class CalorieGoal(models.Model):
    """ CalorieGoal model connected to user"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    goal = models.IntegerField()
    protein_percentage = models.IntegerField()
    carbs_percentage = models.IntegerField()
    fat_percentage = models.IntegerField()

    
class DailySumup(models.Model):
    """ DailySumup model connected to user"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    meals = models.ManyToManyField(Meal, through='MealSumup')
    products = models.ManyToManyField(Product, through='ProductSumup')
    
class ProductSumup(models.Model):
    """ ProductSumup model connecting DailySumup and Product"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    sumup = models.ForeignKey(DailySumup, on_delete=models.CASCADE)
    amount = models.IntegerField(default=100) # 100g or 100ml
    
class MealSumup(models.Model):
    """ MealSumup model connecting DailySumup and Meal"""
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    sumup = models.ForeignKey(DailySumup, on_delete=models.CASCADE)
    amount = models.IntegerField(default=1) # amount of meals
    
