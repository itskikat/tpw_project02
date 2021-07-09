from rest_api.models import *
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def save(self):
        user = User(username=self.validated_data['username'],
                    is_manager=self.validated_data['is_manager'],
                    is_customer=self.validated_data['is_customer']
                    )
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('user',)

    def to_representation(self, instance):
        self.fields['user'] =  UserSerializer(read_only=True)
        return super(CustomerSerializer, self).to_representation(instance)    


class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = ('user',)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class BrandSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True, many=True)
    class Meta:
        model = Brand
        fields = ('id', 'name', 'category')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'category', 'brand', 'price', 'quantity', 'image')

    def to_representation(self, instance):
        self.fields['brand'] =  BrandSerializer(read_only=True)
        self.fields['category'] =  CategorySerializer(read_only=True, many=True)
        return super(ProductSerializer, self).to_representation(instance)    
    
    def create(self, validated_data):
        category_data = validated_data.pop('category')
        product = Product.objects.create(**validated_data)
        for category_data in category_data:
            cat = Category.objects.get(id=category_data.id)
            product.category.add(cat) 
        return product


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        # fields = ('id', 'client', 'order_date', 'products', 'is_complete')
        fields = ('id', 'customer', 'order_items', 'order_date')
