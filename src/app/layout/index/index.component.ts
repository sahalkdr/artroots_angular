import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  categories: any[] = [];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    const page = 1; // Example page number
    const itemsPerPage = 10; // Example items per page

    this.userService.getCategories(page, itemsPerPage)
      .then((response: any) => {
        if (response && response.length) {
          this.categories = response;
        } else {
          console.error('Failed to fetch categories:', response);
        }
      })
      .catch((error: any) => {
        console.error('Error fetching categories:', error);
      });
  }

  
}