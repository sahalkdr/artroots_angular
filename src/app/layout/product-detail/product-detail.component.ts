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
  cartItems: any[] = []; // Array to hold cart items
  userId: number | null = null; // User ID

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
        // Fetch cart items for the logged-in user
        this.userId = this.userService.getUserId();
        console.log('Current user ID:', this.userId); // Debug log
        if (this.userId !== null) {
          this.fetchCartItems(this.userId);
        }
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
    console.log('Adding product to cart:', this.product); // Debug log
    
    if (this.userId !== null) {
      if (Array.isArray(this.cartItems)) {
        const existingCartItem = this.cartItems.find(item => item.product_id === this.product.product_id);
        if (existingCartItem) {
          this.updateCartItem(this.userId, existingCartItem.cart_id, existingCartItem.quantity + this.selectedQty);
        } else {
          this.addProductToCart(this.userId, this.product.product_id, this.selectedQty);
        }
      } else {
        console.error('cartItems is not an array or is undefined.');
        // Optionally, fetch cart items again or show a message to the user
      }
    } else {
      console.error('User ID is null.');
      this.openLoginDialog();
    }
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        // User has logged in successfully, fetch the user ID and cart items
        this.userId = this.userService.getUserId();
        if (this.userId !== null) {
          this.fetchCartItems(this.userId);
        }
      }
    });
  }

  addProductToCart(userId: number, productId: number, quantity: number): void {
    console.log('Parameters before adding to cart:', { userId, productId, quantity });
    this.userService.addProductToCart(userId, productId, quantity)
      .then(response => {
        console.log('Add to cart API response:', response); // Debug log
        if (response.success) {
          window.alert('Product added to cart successfully!');
          this.router.navigate(['/cart']); // Navigate to cart page
        } else {
          window.alert('Failed to add product to cart: ' + response.message);
        }
      })
      .catch((error: any) => { // Explicitly typing error parameter
        console.error('Error adding product to cart:', error);
        window.alert('Failed to add product to cart: ' + error.message);
      });
  }

  updateCartItem(userId: number, cartId: number, quantity: number): void {
    console.log('Updating cart item:', { cartId, quantity });
    this.userService.updateCartItem(userId, cartId, quantity)
      .then(response => {
        console.log('Update cart item API response:', response);
        if (response && response.success) {
          window.alert('Cart item updated successfully!');
          // Optionally, refresh cart items list after updating
        } else {
          window.alert('Failed to update cart item: ' + response.message);
        }
      })
      .catch((error: any) => {
        console.error('Error updating cart item:', error);
        window.alert('Failed to update cart item: ' + error.message);
      });
  }

  fetchCartItems(userId: number): void {
    this.userService.getCartItems(userId).then(
      (response: any[]) => {
        console.log('Cart items fetched:', response);
        // Assuming response is an array of cart items
        this.cartItems = response.map(item => ({
          cart_id: item.cart_id,
          product_id: item.product_id,
          quantity: item.quantity
        }));
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
        // Handle error appropriately
      }
    );
  }
}
