 // product.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  page: number = 1;
  itemsPerPage: number = 10;
  categoryId: number | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    // Get the categoryId from the route parameters
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));
    console.log('Loaded with category ID:', this.categoryId); // Debug log
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      const data = await this.userService.getProducts(this.page, this.itemsPerPage, this.categoryId);
      console.log('Product API Response:', data); // Debug log
      if (Array.isArray(data)) {
        this.products = data;
      } else {
        console.error('Unexpected data format:', data);
      }
      console.log('Products fetched:', this.products); // Debug log
    } catch (error) {
      console.error('Error fetching products:', error);
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
