from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_api.serializers import *
from rest_api.models import *
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
from itertools import chain

# Create your views here.

'''
    PRODUCTS
'''


# web service to get a specific product


@api_view(['GET'])
def get_product(request):
    id = int(request.GET['id'])
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


# web service to get a list of products


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    if 'num' in request.GET:
        num = int(request.GET['num'])
        products = products[:num]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# web service to create a product


@api_view(['POST'])
def create_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# web service to update a product


@api_view(['PUT'])
def update_product(request):
    id = request.data['id']
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# web service to delete a product


@api_view(['DELETE'])
def del_product(request, id):
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


'''
    CATEGORIES
'''


# web service to get a specific category


@api_view(['GET'])
def get_category(request):
    id = int(request.GET['id'])
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CategorySerializer(category)
    return Response(serializer.data)


# web service to get a list of categories


@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    if 'num' in request.GET:
        num = int(request.GET['num'])
        categories = categories[:num]
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# web service to get products of a specific category


@api_view(['GET'])
def get_categoryproducts(request):
    id = int(request.GET['id'])
    try:
        products = Product.objects.filter(category__id=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# web service to create a category


@api_view(['POST'])
def create_category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# web service to update a category


@api_view(['PUT'])
def update_category(request):
    id = request.data['id']
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CategorySerializer(category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# web service to delete a category


@api_view(['DELETE'])
def del_category(request, id):
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


'''
    BRANDS
'''


# web service to get a specific brand


@api_view(['GET'])
def get_brand(request):
    id = int(request.GET['id'])
    try:
        brand = Brand.objects.get(id=id)
    except Brand.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = BrandSerializer(brand)
    return Response(serializer.data)


# web service to get products of a specific brand


@api_view(['GET'])
def get_brandproducts(request):
    id = int(request.GET['id'])
    try:
        products = Product.objects.filter(brand__id=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# web service to get a list of brands


@api_view(['GET'])
def get_brands(request):
    brands = Brand.objects.all()
    if 'num' in request.GET:
        num = int(request.GET['num'])
        brands = brands[:num]
    serializer = BrandSerializer(brands, many=True)
    return Response(serializer.data)


# web service to create a brand


@api_view(['POST'])
def create_brand(request):
    serializer = BrandSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# web service to update a brand


@api_view(['PUT'])
def update_brand(request):
    id = request.data['id']
    try:
        brand = Brand.objects.get(id=id)
    except Brand.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = BrandSerializer(brand, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# web service to delete a brand


@api_view(['DELETE'])
def del_brand(request, id):
    try:
        brand = Brand.objects.get(id=id)
    except Brand.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    brand.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


'''
    ORDERS
'''


# web service to get a specific order


@api_view(['GET'])
def get_order(request):
    id = int(request.GET['id'])
    try:
        order = Order.objects.get(id=id)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = OrderSerializer(order)
    return Response(serializer.data)


# web service to get a list of orders, for a given user


@api_view(['GET'])
def get_userorders(request):
    user_id = int(request.GET['user_id'])
    try:
        orders = Order.objects.get(user_id=user_id)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# web service to create a order
@api_view(['POST'])
def create_order(request):
    print(request.data)

    user = User.objects.get(username=request.data['username'])
    customer = Customer.objects.get(user=user).pk

    if customer is None:
        raise NotAuthenticated('User not valid!');

    products = []
    for prod in request.data['products']:
        product = Product.objects.filter(id=prod['id']).first()
        products.append(product.pk)

    order_data = {'customer': customer, 'products': products}

    serializer = OrderSerializer(data=order_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_order(request):
    id = request.data['id']
    try:
        order = Order.objects.get(id=id)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = OrderSerializer(order, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# web service to delete a order
@api_view(['DELETE'])
def del_order(request, id):
    try:
        order = Order.objects.get(id=id)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    order.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    req_data = request.data
    print(req_data)
    user = User.objects.create(username=req_data['username'], password=req_data['password'], is_customer=True)
    req_data['user'] = user.pk

    if req_data['user_type'] == "customer":
        serializer = CustomerSerializer(data=req_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    if req_data['user_type'] == "manager":
        serializer = ManagerSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
class LoginView(APIView):

    def post(self, request):
        password = request.data['password']
        username = request.data['username']

        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.password == password:
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            'jwt': token,
            # 'user_type': user_type
        }

        return response


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


@permission_classes([AllowAny])
class UserView(APIView):

    def get(self, request):
        token = request.headers['jwt']

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


@api_view(['GET'])
def search_products(request):
    query = request.GET.get('query', '')
    if query:
        prods_by_brand = Product.objects.filter(brand__name__icontains=query)
        prods_by_category = Product.objects.filter(category__name__icontains=query)
        prods_by_name = Product.objects.filter(name__icontains=query)
        all_products = set(chain(prods_by_brand, prods_by_category, prods_by_name))
        serializer = ProductSerializer(all_products, many=True)
    else:
        serializer = ProductSerializer(Product.objects.all(), many=True)
    print(serializer.data)
    return Response(serializer.data)


@api_view(['GET'])
def get_user_type(request):
    username = request.GET.get('username', '')
    user_type = None
    if username:
        if Customer.objects.filter(user__username=username).exists():
            user_type = "customer"
        if Manager.objects.filter(user__username=username).exists():
            user_type = "manager"

    return Response({'user_type': user_type})
