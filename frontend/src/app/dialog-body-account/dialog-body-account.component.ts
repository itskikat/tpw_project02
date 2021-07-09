import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from "@angular/common/http";

//MODEL
import { Customer } from '../models/Customer';
import { CustomerService } from '../services/customer/customer.service';


@Component({
  selector: 'app-dialog-body-account',
  templateUrl: './dialog-body-account.component.html',
  styleUrls: ['./dialog-body-account.component.css']
})
export class DialogBodyAccountComponent implements OnInit {

  editAccountForm: FormGroup;
  success: boolean = false;
  submitted: boolean = false;
  error: boolean = false;

  user_id: number;
  username: string;
  customer: Customer;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<DialogBodyAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {"username": string, "id": number}
  ) 
  { 
    this.user_id = data.id;
    this.username = data.username;
  }

  ngOnInit(): void {
    this.getCustomerData();

    this.editAccountForm = this.fb.group({
      id: ['', [Validators.required]],
      username: ['', [Validators.required]],
      old_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      new_password1: ['', [Validators.required, Validators.maxLength(20)]],
      new_password2: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  // This does nothing, just closes the dialog and doesn't submit anything
  close(): void {
    this.dialogRef.close();
  }

/*   // This DOES edit the product effectively
  edit(): void {
    this.submitted = true;
    console.log(this.editAccountForm.value);
    // @ts-ignore
    if (this.editAccountForm.invalid) {
      console.log("invalido");
      return;
    }
    this.success = true;
    // @ts-ignore
    this.customerService.editProfile(this.editAccountForm.value)
      .subscribe((res: any) => {
          this.success = true;
          this.dialogRef.close(this.success);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
        });
  } */

  getCustomerData(): void {
    this.customerService.getCustomerId(this.user_id).subscribe(customer => this.customer = customer );
  }

}
