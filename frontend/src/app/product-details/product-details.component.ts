import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/Product';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  @Input() product: Product;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductId(id).subscribe(product => this.product = product);
  }

  goBack(): void {
		this.location.back();
  }

}
