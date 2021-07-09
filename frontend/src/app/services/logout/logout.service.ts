import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) {
  }

  logout(): Observable<any> {
    const url = environment.API_BASE_URL + 'logout';
    return this.http.post(url, environment.HTTP_OPTIONS);
  }
}
