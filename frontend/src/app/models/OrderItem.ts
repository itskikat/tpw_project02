import {ProductService} from "../services/product/product.service";
import { Category } from "./Category";
import {Product} from "./Product";

export class OrderItem {
  product: Product;
  quantity: number;
  productService: ProductService;

  constructor(product: any, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }


}
