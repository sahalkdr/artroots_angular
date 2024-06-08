 import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string = '';
  successMessage: string = '';

  constructor(public dialog: MatDialog, private userService: UserService) {}

 
   
  
    async onSubmit(username: string, password: string): Promise<void> {
      try {
        const response = await this.userService.login(username, password);
  
        if (response.success) {
          this.successMessage = 'Login successful!';
          this.errorMessage = '';
        } else {
          this.errorMessage = response.error || 'Login failed. Please try again.';
          this.successMessage = '';
        }
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = 'An error occurred during login. Please try again later.';
        this.successMessage = '';
      }
    }
    openSignUp() {
      this.dialog.closeAll();
      this.dialog.open(SignupComponent);
    }
  }  