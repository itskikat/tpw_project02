import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SignupComponent } from './signup/signup.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
// ADMIN
import { NewProductComponent } from './new-product/new-product.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';


const routes: Routes = [
  {path: '', component: MainContentComponent, pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  // IF CLIENT LOGGED IN
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orders', component: OrdersComponent },
  // ADMIN
  { path: 'admin/addproduct', component: NewProductComponent },
  { path: 'admin/stock', component: AdminProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
