from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_customer = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)


class Customer(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.user.username


class Manager(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.user.username


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return str(self.name)


class Brand(models.Model):
    name = models.CharField(max_length=70)
    category = models.ManyToManyField(Category)

    def __str__(self):
        return str(self.name)


class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    category = models.ManyToManyField(Category)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    image = models.URLField(max_length=1000)
    quantity = models.DecimalField(max_digits=3, default=0, decimal_places=0)

    def __str__(self):
        return str(self.name)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    order_items = models.ManyToManyField(OrderItem)
    #total_cost = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)

    def total(self):
        return sum([o.product.price * o.quantity for o in self.order.all()])
