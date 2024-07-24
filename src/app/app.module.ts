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
import { ProductComponent} from './layout/product/product.component';
import { HeaderComponent } from './layout/header/header.component';
// import { ScrollableComponent } from './layout/scroll/scroll.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProductDetailComponent } from './layout/product-detail/product-detail.component';
import { LightboxModule } from 'ngx-lightbox';
import { CartComponent } from './layout/cart/cart.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { AdminComponent } from './layout/admin/admin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
 
 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    IndexComponent,
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailComponent,
    CartComponent,
    AdminComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,  
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    LightboxModule,
    RouterModule, 
    NgxScrollTopModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }