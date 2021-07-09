from django.contrib import admin
from rest_api.models import *

# Register your models here.
admin.site.register(User)
admin.site.register(Customer)
admin.site.register(Manager)
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(OrderItem)
admin.site.register(Order)
