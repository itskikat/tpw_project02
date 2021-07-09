import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from "@angular/common/http";
import {LoginService} from '../services/login/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  error: boolean = false;

  constructor(
    private service: LoginService,
    private form_builder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.form_builder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  setCookie(name: string, val: number): void {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";

  }

  onSubmit(): void {
    this.submitted = true;
    // @ts-ignore
    if (this.loginForm.invalid) {

      return;
    }
    // @ts-ignore
    this.service.login(this.loginForm.value)
      .subscribe((res: any) => {
          console.log(res);
          this.setCookie('jwt', res['jwt'])

          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
        });
  }
}


