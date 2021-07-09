import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) {
  }


  checkout(data: {}): Observable<any> {
    const url = environment.API_BASE_URL + 'ordercre';
    return this.http.post(url, data, {withCredentials: true})
  }

}
