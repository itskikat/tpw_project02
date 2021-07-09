import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private http: HttpClient) {
  }

  getOrders(username: string): Observable<any> {
    const url = environment.API_BASE_URL + 'myorders?username=' + username;
    return this.http.get<string>(url);
  }

  getOrderItem(order_item_id: string) {
    const url = environment.API_BASE_URL + 'order_item?id=' + order_item_id;
    return this.http.get<string>(url);
  }
}
