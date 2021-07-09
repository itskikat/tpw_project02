import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Brand } from 'src/app/models/Brand';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrands(): Observable<any[]> {
    const url = environment.API_BASE_URL + 'brands';
    return this.http.get<any[]>(url);
  }

  getBrandId(id: number): Observable<Brand> {
    const url = environment.API_BASE_URL + 'brand?id=' + id;
    return this.http.get<Brand>(url);
  }

  getBrandProducts(id: number): Observable<Product[]> {
    const url = environment.API_BASE_URL + 'productsofbrand?id=' + id;
    return this.http.get<Product[]>(url);
  }

}
