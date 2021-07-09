import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Emitters} from '../emitters/emitters';
import {CheckAuthUserService} from '../services/check-auth-user/check-auth-user.service';
import {CheckoutService} from '../services/checkout/checkout.service';
import {LogoutService} from '../services/logout/logout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  authenticated: boolean | undefined;
  error: boolean | undefined;

  items: Array<any>;
  total = 0;
  username: string;

  constructor(
    private http: HttpClient,
    private logoutService: LogoutService,
    private checkAuthUserService: CheckAuthUserService,
    private checkoutService: CheckoutService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.checkAuthUserService.check()

  }

  ngOnInit(): void {
    this.items = this.findLocalItems("cart_item/");
    this.subscribeToEmitters();
    this.calcTotalPrice();
    console.log(this.items);
  }

  subscribeToEmitters() {
    Emitters.userEmitter.subscribe(
      (username: string) => {
        this.username = username;
      }
    );

    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }

  findLocalItems(query) {
    var i, results = [];
    var count = 0;
    for (i in localStorage) {
      if (localStorage.hasOwnProperty(i)) {
        if (i.match(query) || (!query && typeof i === 'string')) {
          var item_obj = JSON.parse(localStorage.getItem(i));
          results.push(item_obj);
          count++;
        }
      }
    }
    return results;
  }

  removeProduct(product_id: number) {
    for (var _i = 0; _i < this.items.length; _i++) {
      if (this.items[_i]["id"] == product_id) {
        localStorage.removeItem("cart_item/" + product_id);
        this.total -= Number(this.items[_i]["price"]);
        this.items = this.findLocalItems("cart_item/");
      }
    }
  }

  calcTotalPrice() {
    this.total = 0;
    for (var _i = 0; _i < this.items.length; _i++) {
      this.total += Number(this.items[_i]["price"])
    }
  }

  checkout(): void {
    console.log("we in");
    this.checkoutService.checkout({'username': this.username, 'products': this.items})
      .subscribe((res: any) => {
          localStorage.clear();
          this.total = 0;
          this.router.navigate(['']);
          this.items.length = 0;
        },
        (err: HttpErrorResponse) => {
          console.log("Error checking out");
        });
  }


  deleteCookie(name: string) {
    console.log("deleting cookies");
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
  }

  logout(): void {
    this.logoutService.logout()
      .subscribe((res: any) => {
          this.deleteCookie('jwt');
          this.authenticated = false
          localStorage.clear();
          this.router.navigate(['']);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
        });
  }
}
