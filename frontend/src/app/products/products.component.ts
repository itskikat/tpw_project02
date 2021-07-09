import {Component, Input, OnInit} from '@angular/core';
import {Emitters} from '../emitters/emitters';
// MODEL
import {Product} from '../models/Product';
// SERVICES
import {ProductService} from '../services/product/product.service';
import {SearchService} from '../services/search/search.service';

let category = <any>{};

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(
    private productService: ProductService, 
    private searchService: SearchService
  ) 
  { }


  ngOnInit(): void {
    console.log("oi")

    this.productService.getProducts().subscribe(
      products => {
        this.products = products;

      }
    );


    Emitters.searchEmitter.subscribe(
      (query: string) => {
        this.searchService.getProducts({'query': query}).subscribe(products => this.products = products);
      }
    );
  }

  addToShoppingCart(product: Product) {
    var key = "cart_item/" + product.id;
    Emitters.newCartItemEmitter.emit(JSON.stringify(product));
  }

}
