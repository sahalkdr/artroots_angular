import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { from } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  product: any = {
    product_name: '',
    description: '',
    price: '',
    qty: '',
    categories: ''
  };
  selectedFile: File | null = null;

  constructor(private userService: UserService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('product_name', this.product.product_name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price);
    formData.append('qty', this.product.qty);
    formData.append('categories', JSON.stringify(this.product.categories.split(',').map((id: string) => id.trim())));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    from(this.userService.addProduct(formData)).subscribe(
      (response: any) => {
        console.log('Product added successfully:', response);
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding product:', error);
      }
    );
  }
}
