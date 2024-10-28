from django.contrib import admin
from .models import Cars, Variation, ReviewRating , Contact

# Register your models here.

class CarsAdmin(admin.ModelAdmin):
    list_display = ('car_name', 'price', 'stock', 'category', 'modified_date', 'is_available')
    prepopulated_fields = {'slug': ('car_name',)}
    list_filter = ('category', 'is_available')
    search_fields = ('car_name', 'category__category_name')
    list_editable = ('is_available', 'price', 'stock')

class VariationAdmin(admin.ModelAdmin):
    list_display = ('car', 'variation_category', 'variation_value', 'is_active')
    list_editable = ('is_active',)
    list_filter = ('car', 'variation_category', 'variation_value')

class ReviewRatingAdmin(admin.ModelAdmin):
    list_display = ('car', 'user', 'subject', 'rating', 'status', 'created_at')
    list_filter = ('status', 'created_at', 'rating')
    search_fields = ('car__car_name', 'user__username', 'subject')

admin.site.register(Cars, CarsAdmin)
admin.site.register(Variation, VariationAdmin)
admin.site.register(ReviewRating, ReviewRatingAdmin)
admin.site.register(Contact)

