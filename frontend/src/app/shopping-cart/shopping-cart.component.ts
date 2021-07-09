import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';
import {Emitters} from '../emitters/emitters';
import {Order} from '../models/Order';
import {Product} from '../models/Product';
import {CheckAuthUserService} from '../services/check-auth-user/check-auth-user.service';
import {CheckoutService} from '../services/checkout/checkout.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items: Array<any>;
  total = 0;
  username: string;
  checkoutConfirmation = false;
  cartEmptyError = false;

  constructor(private checkAuthUserService: CheckAuthUserService,
              private checkoutService: CheckoutService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.items = this.findLocalItems("cart_item/");
    this.subscribeToEmitters();

  }

  subscribeToEmitters() {
    Emitters.newCartItemEmitter.subscribe(
      (item: string) => {
        this.handleNewItem(item);
      }
    );
    Emitters.userEmitter.subscribe(
      (username: string) => {
        this.username = username;
      }
    );
  }

  handleNewItem(item: string) {
    var item_obj = JSON.parse(item);
    var key = "cart_item/" + item_obj["id"];

    if (localStorage.getItem(key) == null) { // aka it doesnt already exist
      localStorage.setItem(key, JSON.stringify({'item': item_obj, 'item_quantity': 1}));
      this.items = this.findLocalItems("cart_item/");
    } else {
      var existing_item = JSON.parse(localStorage.getItem(key))['item'];
      var existing_quantity = JSON.parse(localStorage.getItem(key))['item_quantity'];
      localStorage.setItem(key, JSON.stringify({'item': existing_item, 'item_quantity': existing_quantity + 1}));
      this.items = this.findLocalItems("cart_item/");

    }

  }

  findLocalItems(query) {
    var i, results = [];
    var count = 0;
    this.total = 0;
    for (i in localStorage) {
      if (localStorage.hasOwnProperty(i)) {
        if (i.match(query) || (!query && typeof i === 'string')) {
          var item_obj = JSON.parse(localStorage.getItem(i));
          console.log(JSON.stringify(item_obj))
          this.total += Number(item_obj['item']['price']) * Number(item_obj['item_quantity']);
          results.push(item_obj);
          count++;
        }
      }
    }
    return results;
  }

  removeProduct(product_id: number) {
    for (var _i = 0; _i < this.items.length; _i++) {
      if (this.items[_i]['item']["id"] == product_id) {
        var key = "cart_item/" + product_id;
        var item = JSON.parse(localStorage.getItem(key));
        var item_qnt = item['item_quantity'];


        if (item_qnt > 1) {
          item_qnt--;
          this.total -= Number(item['item']["price"]);
          localStorage.setItem(key, JSON.stringify({'item': item['item'], 'item_quantity': item_qnt}));
          this.items = this.findLocalItems("cart_item/");
        } else {
          localStorage.removeItem(key);
          this.total -= Number(this.items[_i]['item']["price"]);
          this.items = this.findLocalItems("cart_item/");
        }
      }
    }
  }

  checkout(): void {
    this.checkoutService.checkout({'username': this.username, 'products': this.items})
      .subscribe((res: any) => {
          localStorage.clear();
          this.total = 0;
          this.router.navigate(['']);
          this.items.length = 0;
          this.checkoutConfirmation = false;
        },
        (err: HttpErrorResponse) => {
          alert("Error checking out");
        });
  }

  async onConfirmationCheckout() {
    if (this.items.length > 0) {
      this.checkoutConfirmation = true;

    } else {
      this.cartEmptyError = true;
      await timer(3000).pipe(take(1)).toPromise();
      this.cartEmptyError = false;

    }
  }

  offConfirmationCheckout() {
    this.checkoutConfirmation = false;
  }

  increaseCount(item: any) {
    var key = "cart_item/" + item['item']['id'];
    var new_quantity = item['item_quantity'] + 1
    localStorage.setItem(key, JSON.stringify({'item': item['item'], 'item_quantity': new_quantity}));
    this.items = this.findLocalItems("cart_item/");
  }
}
