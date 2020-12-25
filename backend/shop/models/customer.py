from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

from .product import Product


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.IntegerField(null=False)
    # address = models.CharField(max_length=500, null=False)


class Order(models.Model):
    ORDER_STATUS = (
        (1, 'pending'),
        (2, 'accepted'),
        (3, 'shipped'),
        (4, 'delivered')
    )
    quantity = models.IntegerField(null=False, validators=[
                                   MinValueValidator(1), MaxValueValidator(9999999999)])
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='product_orders')
    delivery_address = models.CharField(max_length=500, null=False)
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='customer_orders')
    date_ordered = models.DateTimeField(default=timezone.now)
    status = models.IntegerField(choices=ORDER_STATUS, default=1)
