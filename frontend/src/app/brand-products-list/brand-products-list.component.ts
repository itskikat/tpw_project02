import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Emitters } from '../emitters/emitters';
// MODEL
import { Brand } from '../models/Brand';
import { Product } from '../models/Product';
// SERVICES
import { BrandService } from '../services/brand/brand.service';


@Component({
  selector: 'app-brand-products-list',
  templateUrl: './brand-products-list.component.html',
  styleUrls: ['./brand-products-list.component.css']
})
export class BrandProductsListComponent implements OnInit {

  @Input() brand: Brand;
  products: Product[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private brandService: BrandService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap['id']);
    this.getBrand(id);
  }

  addToShoppingCart(product: Product): void {
    var key = "cart_item/" + product.id;
    Emitters.newCartItemEmitter.emit(JSON.stringify(product));
  }

  getBrand(id: number): void {
    this.brandService.getBrandId(id).subscribe(brand => this.brand = brand);
    this.getBrandProducts(id);
  }

  getBrandProducts(id: number): void {
    this.brandService.getBrandProducts(id).subscribe(products => this.products = products);
  }

  goBack(): void {
		this.location.back();

  }


}
