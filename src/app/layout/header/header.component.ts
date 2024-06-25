import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() searchEvent = new EventEmitter<string>();
  searchQuery: string = '';
  currentUser: any = null;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService // Corrected userService naming convention
  ) {}

  openLoginDialog(): void {
    this.dialog.open(LoginComponent);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.searchEvent.emit(this.searchQuery);
    }
  }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.userService.logout();
    this.currentUser = null; // Clear current user immediately

    // Open login dialog after logout
    this.openLoginDialog();
   // Navigate to login page after logout
  }
}
