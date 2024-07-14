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
  filteredCategories: any[] = [];
  searchQuery: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.userService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.onSearch();
    });
  }

  fetchCategories(): void {
    const page = 1;
    const itemsPerPage = 10;

    this.userService.getCategories(page, itemsPerPage).then(
      (response: any) => {
        if (response && Array.isArray(response)) {
          this.categories = response.filter((category: any) => category.category_id !== undefined && category.category_id !== null);
          this.filteredCategories = this.categories; // Initially show all categories
        } else {
          console.error('Failed to fetch categories:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter(category =>
        category.category_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  navigateToProductPage(categoryId: number): void {
    if (categoryId === undefined || categoryId === null) {
      console.error('Invalid category ID:', categoryId);
      return;
    }
    this.router.navigate(['/product', categoryId]).catch(error => {
      console.error('Navigation error:', error);
    });
  }
}
