import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetUserTypeService {

  constructor(private http: HttpClient) {
  }

  getUserType(username: string): Observable<any> {
    const url = environment.API_BASE_URL + 'user/type?username=' + username;
    return this.http.get<string>(url);
  }

}
