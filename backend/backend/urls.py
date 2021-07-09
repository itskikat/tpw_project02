"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.urls import path
from rest_framework.authtoken import views as auth_views
from rest_api import views
from rest_api.views import LoginView, LogoutView, UserView

urlpatterns = [
    path('admin/', admin.site.urls),

    # web services
    path('ws/product', views.get_product),
    path('ws/products', views.get_products),
    path('ws/productcre', views.create_product),
    path('ws/productupd', views.update_product),
    path('ws/productdel', views.del_product),

    path('ws/category', views.get_category),
    path('ws/categories', views.get_categories),
    path('ws/productsofcategory', views.get_categoryproducts),
    path('ws/categorycre', views.create_category),
    path('ws/categoryupd', views.update_category),
    path('ws/categorydel/<int:id>', views.del_category),

    path('ws/brand', views.get_brand),
    path('ws/brands', views.get_brands),
    path('ws/productsofbrand', views.get_brandproducts),
    path('ws/brandcre', views.create_brand),
    path('ws/brandupd', views.update_brand),
    path('ws/branddel/<int:id>', views.del_brand),

    path('ws/order', views.get_order),
    path('ws/myorders', views.get_userorders),
    path('ws/ordercre', views.create_order),
    path('ws/orderupd', views.update_order),
    path('ws/orderdel/<int:id>', views.del_order),

    path('ws/signup', views.signup),
    path('ws/login', LoginView.as_view()),
    path('ws/logout', LogoutView.as_view()),
    path('ws/user', UserView.as_view()),
    path('ws/user/type', views.get_user_type),

    path('ws/search-products', views.search_products),

    path('ws/customer', views.get_customer),

]
