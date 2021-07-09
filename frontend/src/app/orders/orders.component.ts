import {Component, OnInit} from '@angular/core';
import {Emitters} from '../emitters/emitters';
import {Location} from '@angular/common';
// SERVICES
import {CheckAuthUserService} from '../services/check-auth-user/check-auth-user.service';
import {OrdersService} from '../services/orders/orders.service';
import {ProductService} from '../services/product/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  authenticated: boolean;
  username: string;
  orders: any[];

  constructor(
    private checkAuthUserService: CheckAuthUserService,
    private ordersService: OrdersService,
    private productService: ProductService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.subscribeToEmitters();
    this.checkAuthUserService.check();
  }

  subscribeToEmitters() {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );

    Emitters.userEmitter.subscribe(
      (username: string) => {
        this.username = username;
        this.ordersService.getOrders(this.username).subscribe(
          (res: any) => {
            this.orders = res;
            console.log(res)
          }
        )
      }
    );
  }


  goBack(): void {
    this.location.back();
  }


}
