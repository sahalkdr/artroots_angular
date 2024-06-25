import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { IndexComponent } from './layout/index/index.component';
import { HeaderComponent } from './layout/header/header.component';
<<<<<<< HEAD
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
=======
import { ProductDetailComponent } from './layout/product-detail/product-detail.component';
import { LightboxModule } from 'ngx-lightbox';
import { CartComponent } from './layout/cart/cart.component';
import { AdminComponent } from './layout/admin/admin.component';
 
>>>>>>> c200fd21f9bf6ac0269de17c635b52f673f73140

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    IndexComponent,
<<<<<<< HEAD
    HeaderComponent
=======
    ProductComponent,
    HeaderComponent,
    ProductDetailComponent,
    CartComponent,
    AdminComponent,
     
>>>>>>> c200fd21f9bf6ac0269de17c635b52f673f73140
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,  
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    LightboxModule,RouterModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
