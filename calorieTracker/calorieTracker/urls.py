"""calorieTracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from trackerApp import views, models
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# 
router = routers.DefaultRouter()
router.register(r'products', views.ProductView, 'product')
router.register(r'meals', views.MealView, 'meal')
router.register(r'calorieGoal', views.CalorieGoalView, 'calorieGoal')
router.register(r'mealProducts', views.MealProductView, 'mealProduct')
router.register(r'dailySumups', views.DailySumupView, 'dailySumup')
router.register(r'productSumups', views.ProductSumupView, 'productSumup')
router.register(r'mealSumups', views.MealSumupView, 'mealSumup')
admin.site.register(models.Meal)
admin.site.register(models.CalorieGoal)
admin.site.register(models.MealProduct)
admin.site.register(models.DailySumup)
admin.site.register(models.ProductSumup)
admin.site.register(models.MealSumup)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/user/', include('users.urls', namespace='users')),  
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
