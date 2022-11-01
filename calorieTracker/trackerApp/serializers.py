from rest_framework import serializers
from .models import Product, Meal, CalorieGoal, MealProduct, DailySumup, ProductSumup, MealSumup

class ProductSerializer(serializers.ModelSerializer):
    """serializer for Product model"""
    class Meta:
        model = Product
        fields = ('id', 'name', 'kcal', 'protein', 'carbs', 'fat')
        
    def create(self, validated_data):
        return Product.objects.create(**validated_data)

class MealSerializer(serializers.ModelSerializer):
    """serializer for Meal model"""
    ingredients = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Meal
        fields = ('id', 'name', 'ingredients')
        
    def create(self, validated_data):
        """create and return a new Meal"""
        return Meal.objects.create(**validated_data)
        
class CalorieGoalSerializer(serializers.ModelSerializer):
    """serializer for CalorieGoal model"""
    class Meta:
        model = CalorieGoal
        fields = ('id', 'goal', 'protein_percentage', 'carbs_percentage', 'fat_percentage', 'user')
        
    def create(self, validated_data):
        """create and return a new CalorieGoal"""
        user = self.context['request'].user
        return CalorieGoal.objects.create(user=user, **validated_data)
        
class MealProductSerializer(serializers.ModelSerializer):
    """serializer for MealProduct model"""
    product = ProductSerializer()
    
    class Meta:
        model = MealProduct
        fields = ('id', 'meal', 'product', 'amount')
        
    def create(self, validated_data):
        """ create and return a new MealProduct"""
        product_data = validated_data.pop('product')
        product = Product.objects.create(**product_data)
        mealproduct = MealProduct.objects.create(product=product, **validated_data)
        return mealproduct
        
    
        
class DailySumupSerializer(serializers.ModelSerializer):
    """ serializer for DailySumup model"""
    meals = MealSerializer(many=True, read_only=True)
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = DailySumup
        fields = ('id', 'date', 'meals', 'products', 'user')
        
class ProductSumupSerializer(serializers.ModelSerializer):
    """ serializer for ProductSumup model"""
    product = ProductSerializer()
    class Meta:
        model = ProductSumup
        fields = ('id', 'product', 'sumup', 'amount')
        
    def create(self, validated_data):
        """ create and return a new ProductSumup"""
        product_data = validated_data.pop('product')
        product = Product.objects.create(**product_data)
        product_sumup = ProductSumup.objects.create(product=product, **validated_data)
        return product_sumup
        
class MealSumupSerializer(serializers.ModelSerializer):
    """ serializer for MealSumup model"""
    meal = MealSerializer()
    class Meta:
        model = MealSumup
        fields = ('id', 'meal', 'sumup', 'amount')
        
    def create(self, validated_data):
        """ create and return a new MealSumup"""
        meal_data = validated_data.pop('meal')
        meal = Meal.objects.create(**meal_data)
        meal_sumup = MealSumup.objects.create(meal=meal, **validated_data)
        return meal_sumup
        
    
        
