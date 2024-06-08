import { Component, importProvidersFrom } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(public dialog: MatDialog) {}
  onSubmit(form: any): void {
    if (form.valid) {
      // Handle the form submission logic here
      console.log('Form Submitted', form.value);
    }
  }
  openSignIn() {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent);
  }
}
