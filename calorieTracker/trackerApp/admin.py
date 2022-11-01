from django.contrib import admin
from .models import Product

# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'kcal', 'protein', 'carbs', 'fat') 
admin.site.register(Product, ProductAdmin)