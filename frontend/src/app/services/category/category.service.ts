import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    const url = environment.API_BASE_URL + 'categories';
    return this.http.get<Category[]>(url);
  }

  getCategoryId(id: number): Observable<Category> {
    const url = environment.API_BASE_URL + 'category?id=' + id;
    return this.http.get<Category>(url);
  }

  getCategoryProducts(id: number): Observable<Product[]> {
    const url = environment.API_BASE_URL + 'productsofcategory?id=' + id;
    return this.http.get<Product[]>(url);
  }
}
