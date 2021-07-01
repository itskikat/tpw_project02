import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Emitters } from '../emitters/emitters';
// MODEL
import { Category } from '../models/Category';
import { Product } from '../models/Product';
// SERVICES
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-category-products-list',
  templateUrl: './category-products-list.component.html',
  styleUrls: ['./category-products-list.component.css']
})
export class CategoryProductsListComponent implements OnInit {

  @Input() category: Category;
  products: Product[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap['id']);
    this.getCategory(id);
  }

  addToShoppingCart(product: Product): void {
    var key = "cart_item/" + product.id;
    Emitters.newCartItemEmitter.emit(JSON.stringify(product));
  }

  getCategory(id: number): void {
    this.categoryService.getCategoryId(id).subscribe(category => this.category = category);
    this.getCategoryProducts(id);
  }

  getCategoryProducts(id: number): void {
    this.categoryService.getCategoryProducts(id).subscribe(products => this.products = products);
  }

  goBack(): void {
		this.location.back();
    this.router.navigate(['/']);
    window.location.reload();
  }

}
