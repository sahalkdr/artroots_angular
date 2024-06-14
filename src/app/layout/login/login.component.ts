import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { SignupComponent } from '../signup/signup.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string = '';
  successMessage: string = '';

  constructor(public dialog: MatDialog, private userService: UserService, private router: Router,public dialogRef: MatDialogRef<LoginComponent>,) {}

  async onSubmit(username: string, password: string): Promise<void> {
    try {
      const response = await this.userService.login(username, password);

      if (response.success) {
        this.errorMessage = '';
        window.alert('Login successful!');
        this.dialogRef.close('loggedIn'); // Close dialog with 'loggedIn'
      } else {
        this.errorMessage = response.error || 'Login failed. Please try again.';
      }
    } catch (error) {
      console.error('Login error:', error);
      this.errorMessage = 'An error occurred during login. Please try again later.';
    }
  }

  openSignUp() {
    this.dialog.closeAll();
    this.dialog.open(SignupComponent);
  }
}
