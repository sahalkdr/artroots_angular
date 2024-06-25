import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { HeaderComponent } from './layout/header/header.component';

import { Component } from '@angular/core';
const routes: Routes = [
  {path:'index',component:IndexComponent },
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent },
    {path:'header',component:HeaderComponent}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
