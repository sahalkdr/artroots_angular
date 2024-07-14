import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = []; // Initialize with all products
  page: number = 1;
  itemsPerPage: number = 10;
  categoryId: number | null = null;
  searchQuery: string = ''; // Track search query locally

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the categoryId from the route parameters
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));
    console.log('Loaded with category ID:', this.categoryId); // Debug log
    this.loadProducts();

    // Subscribe to search query changes
    this.userService.searchQuery$.subscribe(query => {
      this.searchQuery = query.trim().toLowerCase(); // Update local search query
      this.filterProducts(); // Filter products based on current search query
    });
  }

  async loadProducts(): Promise<void> {
    try {
      const data = await this.userService.getProducts(this.page, this.itemsPerPage, this.categoryId);
      console.log('Product API Response:', data); // Debug log
      if (Array.isArray(data)) {
        this.products = data;
        this.filteredProducts = this.products; // Initially show all products
      } else {
        console.error('Unexpected data format:', data);
      }
      console.log('Products fetched:', this.products); // Debug log
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  filterProducts(): void {
    if (this.searchQuery === '') {
      this.filteredProducts = this.products; // Show all products when search query is empty
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.product_name.toLowerCase().includes(this.searchQuery) ||
        product.description.toLowerCase().includes(this.searchQuery)
      );
    }
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadProducts();
  }

  navigateToProductDetail(productId: number): void {
    this.router.navigate(['/product-detail', productId]);
  }
}
