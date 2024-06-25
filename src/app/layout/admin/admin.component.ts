import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  category = {
    category_name: '',
    description: ''
  };
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('category_name', this.category.category_name);
    formData.append('description', this.category.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.http.post('http://your-api-endpoint/addCategoryImage.php', formData)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
  }
}