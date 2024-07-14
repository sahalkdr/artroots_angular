import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  currentUser: any = null;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  openLoginDialog(): void {
    this.dialog.open(LoginComponent);
  }

  onSearch(): void {
    this.userService.setSearchQuery(this.searchQuery);
  }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.userService.logout();
    this.currentUser = null;
    this.openLoginDialog();
  }
}
