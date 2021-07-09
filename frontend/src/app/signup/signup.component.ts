import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupService} from "../services/signup/signup.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ngOnInit(): void {
  }

  signupForm: FormGroup;
  submitted = false;
  error = false;

  constructor(
    private service: SignupService, 
    private form_builder: FormBuilder, 
    private router: Router
  ) 
  {
    this.signupForm = form_builder.group({
        username: ['', Validators.required, Validators.minLength(4)],
        password: ['', [Validators.required, Validators.minLength(5)]],
        user_type: ['', [Validators.required]],

      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.invalid) {

      return;
    }
    this.service.signup(this.signupForm.value)
      .subscribe(res => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
        });
  }

  get formControls(): any {
    return this.signupForm.controls;
  }


}
