from django.urls import path
from . import views

urlpatterns = [
    path('place_order/', views.place_order, name='place_order'),
    path('payments/', views.payments, name='payments'),
    path('order_complete/', views.order_complete, name='order_complete'),

    path('orders/mpesa_payment/<int:order_id>/', views.mpesa_initiate_payment, name='mpesa_payment'),
    path('orders/mpesa_payment_success/', views.mpesa_payment_success, name='mpesa_payment_success'),
    path('orders/mpesa_payment_failed/', views.mpesa_payment_failed, name='mpesa_payment_failed'),
   
]
