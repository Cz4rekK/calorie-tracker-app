
from django.shortcuts import render
from .serializers import ProductSerializer, MealSerializer, CalorieGoalSerializer, MealProductSerializer, DailySumupSerializer, ProductSumupSerializer, MealSumupSerializer
from rest_framework import viewsets
from .models import Product, Meal, CalorieGoal, MealProduct, DailySumup, ProductSumup, MealSumup
from rest_framework import generics, permissions
from rest_framework.response import Response


class DailySumupPermission(permissions.BasePermission):
    """ check if user is owner of the object"""
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class ProductView(viewsets.ModelViewSet):
    """ View for Product model"""
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    
class MealView(viewsets.ModelViewSet):
    """ View for Meal model"""
    serializer_class = MealSerializer
    queryset = Meal.objects.all()
    
        
class CalorieGoalView(viewsets.ModelViewSet, DailySumupPermission):
    """ View for CalorieGoal model"""
    permission_classes = [DailySumupPermission]
    serializer_class = CalorieGoalSerializer
    queryset = CalorieGoal.objects.all()
    
class MealProductView(viewsets.ModelViewSet):
    """ View for MealProduct model"""
    serializer_class = MealProductSerializer
    queryset = MealProduct.objects.all()
    
class DailySumupView(viewsets.ModelViewSet, DailySumupPermission):
    """ View for DailySumup model"""
    permission_classes = [DailySumupPermission]
    serializer_class = DailySumupSerializer
    queryset = DailySumup.objects.all()
    
class ProductSumupView(viewsets.ModelViewSet):
    """ View for ProductSumup model"""
    serializer_class = ProductSumupSerializer
    queryset = ProductSumup.objects.all()
    
class MealSumupView(viewsets.ModelViewSet):
    """ View for MealSumup model"""
    serializer_class = MealSumupSerializer
    queryset = MealSumup.objects.all()
    
