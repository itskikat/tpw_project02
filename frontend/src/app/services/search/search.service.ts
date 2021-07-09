import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Emitters} from 'src/app/emitters/emitters';
import { Product } from 'src/app/models/Product';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  constructor(private http: HttpClient) {
  }

  getProducts(data: {}): Observable<any> {
    const url = environment.API_BASE_URL + 'search-products?query=' + data['query'];
    return this.http.get<Product[]>(url);
  }

}
