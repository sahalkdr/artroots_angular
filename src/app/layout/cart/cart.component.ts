import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

interface CartItem {
  image_urls: string[];
  price: number;
  product_id: number;
  product_name: string;
  quantity: number;
  cart_id: number; // Add cart_id to interface
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userId: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    if (this.userId !== null) {
      this.fetchCartItems(this.userId);
    } else {
      console.error('User ID is null in CartComponent');
    }
  }

  fetchCartItems(userId: number): void {
    this.userService.getCartItems(userId).then(
      (response: any) => {
        console.log('Cart items fetched:', response); // Debug log
        if (Array.isArray(response)) {
          this.cartItems = response.map((item: any) => ({
            image_urls: item.image_urls,
            price: item.price,
            product_id: item.product_id,
            product_name: item.product_name,
            quantity: item.quantity,
            cart_id: item.cart_id // Assuming the cart_id is part of the response
          }));
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTotal(): number {
    return this.getSubtotal(); // Assuming delivery is free
  }

  removeFromCart(item: CartItem): void {
    if (this.userId !== null) {
      this.userService.removeCartItem(this.userId, item.cart_id).then(
        (response: any) => {
          console.log('Item removed from cart:', response); // Debug log
          if (response && response.success) {
            this.cartItems = this.cartItems.filter(cartItem => cartItem.cart_id !== item.cart_id);
            window.alert('Item removed from cart successfully!');
          } else {
            window.alert('Failed to remove item from cart: ' + response.message);
          }
        },
        (error: any) => {
          console.error('Error removing item from cart:', error);
          window.alert('Failed to remove item from cart: ' + error.message);
        }
      );
    } else {
      console.error('User ID is null when trying to remove item from cart');
    }
  }

  checkout(): void {
    // Handle checkout logic here
    console.log('Proceed to checkout');
  }
}
