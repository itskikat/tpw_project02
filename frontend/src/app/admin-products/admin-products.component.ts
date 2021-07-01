import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// CHILD - DIALOG
import { MatDialog  } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
// SERVICES
import { CheckAuthUserService } from '../services/check-auth-user/check-auth-user.service';
import { Emitters } from '../emitters/emitters';
import { ProductService } from '../services/product/product.service';
// MODEL
import { Product } from '../models/Product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  authenticated: boolean | undefined;
  success: boolean = false;
  products: Product[] = [];
  @Input()
  product_to_ediit: Product;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private checkAuthUserService: CheckAuthUserService,
    private dialog: MatDialog
  )
  {
    /*
    if (!checkAuthUserService.check()) {
      this.location.replaceState('/'); // clears browser history so they can't navigate with back button
      this.router.navigate(['']);
    }
    */
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
    this.checkAuthUserService.check();
    this.getProducts();
  }

  openDialog(product: Product): void {
    this.product_to_ediit = product;
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      data: {product: this.product_to_ediit}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log('The dialog was closed');
      this.success = true;
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  goBack(): void {
		this.location.back();
  }

  remove(product: Product) {
    this.productService.deleteProduct(product).subscribe(res => window.location.reload());

  }
}
