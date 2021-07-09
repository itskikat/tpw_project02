import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";


import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

// SERVICES
import { CheckAuthUserService } from '../services/check-auth-user/check-auth-user.service';
import { Emitters } from '../emitters/emitters';
import { CategoryService } from '../services/category/category.service';
import { BrandService } from '../services/brand/brand.service';
import { ProductService } from '../services/product/product.service';
// MODEL
import { Category } from '../models/Category';
import { Brand } from '../models/Brand';
import { Product } from '../models/Product';


const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  authenticated: boolean | undefined;
  submitted: boolean = false;
  error: boolean = false;
  success: boolean = false;
  categories: Category[];
  brands: Brand[];
  newProductForm: FormGroup;
  @Input() newproduct: Product = new Product();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private checkAuthUserService: CheckAuthUserService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private productService: ProductService,
    public fb: FormBuilder,
    ) 
    {
      this.newProductForm = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        category: ['', [Validators.required]],
        brand: ['', [Validators.required]],
        quantity: ['', [Validators.required, Validators.pattern(/\d/), Validators.min(0)]],
        price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0)]],
        image: ['', [Validators.required, Validators.pattern(urlRegex)]]
      });
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
    this.checkAuthUserService.check();
    this.getCategories();
    this.getBrands();

  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.newProductForm.value);
    this.newProductForm.value.category = [this.newProductForm.value.category]
    // @ts-ignore
    if (this.newProductForm.invalid) {
      return;
    }
    this.success = true;
    // @ts-ignore
    this.productService.createProduct(this.newProductForm.value)
      .subscribe((res: any) => {
          this.success = true;
          this.router.navigate(['/admin/stock']);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
        });
  }

  goBack(): void {
		this.location.back();
  }


  getCategories(): void {
    this.categoryService.getCategories().subscribe(res => (this.categories = res));
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe(res => (this.brands = res));
  }

}
