import {HttpHeaders} from '@angular/common/http';

export const environment = {
  API_BASE_URL: "http://94.60.22.100/ws/",
  HTTP_OPTIONS: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  },
  production: false
};
