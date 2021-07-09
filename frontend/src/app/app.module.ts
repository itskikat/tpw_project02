import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MainContentComponent } from './main-content/main-content.component';
import { MatDividerModule } from "@angular/material/divider";
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule }   from '@angular/forms';

import { BrandsComponent } from './brands/brands.component';
import { CarouselDirective } from './brands/carousel.directive';
import { BrandProductsListComponent } from './brand-products-list/brand-products-list.component';

import { CategoriesComponent } from './categories/categories.component';
import { CarouselDirective2 } from './categories/carousel.directive';
import { CategoryProductsListComponent } from './category-products-list/category-products-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogBodyAccountComponent } from './dialog-body-account/dialog-body-account.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    SearchBarComponent,
    CheckoutComponent, 
    BrandsComponent,
    CarouselDirective,
    BrandProductsListComponent,
    CategoriesComponent,
    CarouselDirective2,
    CategoryProductsListComponent,
    NewProductComponent,
    AdminProductsComponent,
    DialogBodyComponent,
    DialogBodyAccountComponent,
    OrdersComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    MatDividerModule,
    AppRoutingModule,
    MatTabsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
