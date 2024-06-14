import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { Lightbox } from 'ngx-lightbox';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  selectedQty: number = 1;
  _albums: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private _lightbox: Lightbox,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = Number(params.get('productId'));
      console.log('Product ID from route:', productId); // Debug log
      if (!isNaN(productId)) {
        this.fetchProduct(productId);
      } else {
        console.error('Invalid product ID from route');
      }
    });
  }

  fetchProduct(productId: number): void {
    this.userService.getProductById(productId).then(
      (response: any) => {
        console.log('Product fetched:', response); // Debug log
        this.product = response; // Assuming response structure includes product details
        this.createAlbums();
      },
      (error: any) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  createAlbums(): void {
    if (this.product && Array.isArray(this.product.image_urls)) {
      this._albums = this.product.image_urls.map((url: string) => ({
        src: url,
        caption: this.product.product_name,
        thumb: url
      }));
    }
  }

  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    this._lightbox.close();
  }

  addToCart(): void {
    const userId = this.userService.getUserId();
    console.log('Current user ID:', userId); // Debug log
    console.log('Product ID:', this.product.product_id); // Debug log
    if (userId !== null) {
      this.addProductToCart(userId, this.product.product_id, this.selectedQty);
    } else {
      const dialogRef = this.dialog.open(LoginComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'loggedIn') {
          const loggedInUserId = this.userService.getUserId();
          console.log('Logged in user ID:', loggedInUserId); // Debug log
          if (loggedInUserId !== null) {
            this.addProductToCart(loggedInUserId, this.product.product_id, this.selectedQty);
          } else {
            console.error('User ID is null after logging in.');
          }
        }
      });
    }
  }

  addProductToCart(userId: number, productId: number, quantity: number): void {
    console.log('Parameters before adding to cart:', { userId, productId, quantity });
    if (userId !== undefined && productId !== undefined) {
      this.userService.addProductToCart(userId, productId, quantity)
        .then(response => {
          debugger;
          if (response.success) {
            window.alert('Product added to cart successfully!');
            this.router.navigate(['/cart']); // Navigate to cart page
          } else {
            window.alert('Failed to add product to cart: ' + response.message);
          }
        })
        .catch(error => {
          console.error('Error adding product to cart:', error);
          window.alert('Failed to add product to cart: ' + error.message);
        });
    } else {
      console.error('userId or productId is undefined:', { userId, productId });
    }
  }
}
