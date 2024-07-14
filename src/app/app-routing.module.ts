import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { ProductComponent } from './layout/product/product.component';
import { HeaderComponent } from './layout/header/header.component';
import { ProductDetailComponent } from './layout/product-detail/product-detail.component';
import { CartComponent } from './layout/cart/cart.component';
 import { AdminComponent } from './layout/admin/admin.component';


import { Component } from '@angular/core';
 
const routes: Routes = [
  {path:'index',component:IndexComponent },
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent },
    { path: 'product/:categoryId', component: ProductComponent },
    {path:'header',component:HeaderComponent},
    {path:'product-detail/:productId',component:ProductDetailComponent},
    {path:'cart',component:CartComponent},
    {path:'admin',component:AdminComponent}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
