import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service'; 

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  categories: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    const page = 1; // Example page number
    const itemsPerPage = 10; // Example items per page
  
    this.userService.getCategories(page, itemsPerPage).then(
      (response: any) => {
        console.log('Categories fetched:', response); // Debug log
        if (response && Array.isArray(response)) {
          this.categories = response.filter((category: any) => category.category_id !== undefined && category.category_id !== null);
          console.log('Filtered categories:', this.categories); // Debug log
        } else {
          console.error('Failed to fetch categories:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  
  

  navigateToProductPage(categoryId: number): void {
    console.log('Attempting to navigate with category ID:', categoryId); // Debug log
    if (categoryId === undefined || categoryId === null) {
      console.error('Invalid category ID:', categoryId);
      return;
    }
  
    console.log('Navigating to product page with category ID:', categoryId);
    this.router.navigate(['/product', categoryId]).catch(error => {
      console.error('Navigation error:', error);
    });
  }
  
}  