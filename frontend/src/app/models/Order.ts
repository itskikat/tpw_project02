import {OrdersService} from "../services/orders/orders.service";
import {Customer} from "./Customer";
import {OrderItem} from "./OrderItem";

export class Order {
  customer: Customer;
  order_date: string;
  order_items: OrderItem[];

  constructor(order_date: string, order_items: OrderItem[]) {
    this.order_date = order_date;
    this.order_items = order_items;
  }




}
