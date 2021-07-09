import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from "@angular/common/http";

// SERVICES
import { BrandService } from '../services/brand/brand.service';
import { CategoryService } from '../services/category/category.service';
import { ProductService } from '../services/product/product.service';
// MODELS
import { Product } from '../models/Product';
import { Brand } from '../models/Brand';
import { Category } from '../models/Category';

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {

  editForm: FormGroup;
  categories: Category[];
  brands: Brand[];
  success: boolean = false;
  submitted: boolean = false;
  error: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {product: Product}
  ) 
  { }

  ngOnInit(): void {
    this.getCategories();
    this.getBrands();

    this.editForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      quantity: ['', [Validators.required,Validators.pattern(/\d/), Validators.min(0)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0)]],
      image: ['', [ Validators.required, Validators.pattern(urlRegex)]]
    })
  }

  // Handle compare logic (eg check if unique ids are the same)
  compator(a: any, b: any): boolean {
    if (a === undefined || b === undefined){
      return false;
    }
    return a.id === b.id;
  }

  // This does nothing, just closes the dialog and doesn't submit anything
  close(): void {
    this.dialogRef.close();
  }

  // This DOES edit the product effectively
  edit(): void {
    this.submitted = true;
    console.log(this.editForm.value);
    // @ts-ignore
    if (this.editForm.invalid) {
      console.log("invalido");
      return;
    }
    this.success = true;
    // @ts-ignore
    this.productService.editProduct(this.editForm.value)
      .subscribe((res: any) => {
          this.success = true;
          this.dialogRef.close(this.success);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
        });
  }

  
  getCategories(): void {
    this.categoryService.getCategories().subscribe(res => (this.categories = res));
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe(res => (this.brands = res));
  }

}
