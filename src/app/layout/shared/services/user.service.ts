import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  constructor(private apiService: ApiService) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
      console.log('UserService initialized with user:', JSON.parse(storedUser)); // Debug log
    } else {
      console.log('No stored user found during UserService initialization'); // Debug log
    }
  }

  async login(username: string, password: string): Promise<any> {
    const response = await this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/login.php',
      data: { username, password }
    });

    if (response.success) {
      this.currentUserSubject.next(response.user);
      localStorage.setItem('currentUser', JSON.stringify(response.user)); // Store user in localStorage
      console.log('User logged in and stored:', response.user); // Debug log
    }

    return response;
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser'); // Remove user from localStorage
    console.log('User logged out'); // Debug log
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getUserId(): number | null {
    const currentUser = this.currentUserSubject.value;
    console.log('Current user in getUserId:', currentUser); // Debug log
    return currentUser ? currentUser.user_id : null;
  }

  async addNewCategory(categoryData: { category_name: string; image: string; description: string }): Promise<any> {
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/addnewcategory.php',
      data: categoryData
    });
  }

  getCategories(page: number, itemsPerPage: number): Promise<any> {
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/getcategories.php',
      data: { page, itemsPerPage }
    });
  }

  getProducts(page: number, itemsPerPage: number, categoryId: number | null = null): Promise<any> {
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/getproducts.php',
      data: { page, itemsPerPage, category_id: categoryId }
    });
  }

  getProductById(productId: number): Promise<any> {
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/getoneproduct.php',
      data: { product_id: productId }
    });
  }

  addProductToCart(userId: number, productId: number, quantity: number): Promise<any> {
    console.log('Adding to cart with parameters:', { userId, productId, quantity }); // Debug log
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/addtocart.php',
      data: { user_id: userId, product_id: productId, quantity: quantity }
    });
  }

  getCartItems(userId: number): Promise<any> {
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/getcartdetails.php',
      data: { user_id: userId }
    });
  }

  updateCartItem(userId: number, cartId: number, quantity: number): Promise<any> {
    console.log('Updating cart item with parameters:', { userId, cartId, quantity }); // Debug log
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/updatecartitemquantity.php',
      data: { user_id: userId, cart_id: cartId, quantity: quantity }
    });
  }

  removeCartItem(userId: number, cartId: number): Promise<any> {
    console.log('Removing cart item with parameters:', { userId, cartId }); // Debug log
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/removecartitem.php',
      data: { user_id: userId, cart_id: cartId }
    });
  }

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery(): string {
    return this.searchQuerySubject.value;
  }
  async addProduct(productData: FormData): Promise<any> {
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/addproduct.php',
      data: productData
    });
  }
}

