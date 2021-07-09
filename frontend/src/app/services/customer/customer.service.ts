import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Customer } from 'src/app/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomerId(id: number): Observable<Customer> {
    const url = environment.API_BASE_URL + 'customer?id=' + id;
    return this.http.get<Customer>(url);
  }
}
