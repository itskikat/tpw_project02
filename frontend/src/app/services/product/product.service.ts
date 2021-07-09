import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Product} from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    const url = environment.API_BASE_URL + 'products';
    return this.http.get<Product[]>(url);
  }

  getProductId(id: number): Observable<Product> {
    const url = environment.API_BASE_URL + 'product?id=' + id;
    return this.http.get<Product>(url);
  }

  createProduct(data: {}): Observable<any> {
    const url = environment.API_BASE_URL + 'productcre';
    return this.http.post(url, data)
  }

  editProduct(data: {}): Observable<any> {
    const url = environment.API_BASE_URL + 'productupd';
    return this.http.put(url, data)
  }

  deleteProduct(product: Product): Observable<any> {
    const url = environment.API_BASE_URL + 'productdel?id=' + product.id;
    return this.http.get<any>(url);
  }
}
