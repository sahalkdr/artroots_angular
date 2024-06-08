import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; // Import ApiService

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {} // Inject ApiService

  login(username: string, password: string): Promise<any> {
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/login.php',
      data: { username, password }
    });
  }

  addNewCategory(categoryData: any): Promise<any> {
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/addnewcategory.php', // Adjust URL accordingly
      data: categoryData
    });
  }

  getCategories(page: number, itemsPerPage: number): Promise<any> {
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/getcategories.php', // Adjust URL accordingly
      data: { page, itemsPerPage }
    });
  }

  getProducts(page: number, itemsPerPage: number, categoryId: number | null = null): Promise<any> {
    return this.apiService.httpRequest({
      method: 'POST',
      url: 'http://localhost/artroots/getproducts.php', // Adjust URL accordingly
      data: { page, itemsPerPage, category_id: categoryId }
    });
  }
}
