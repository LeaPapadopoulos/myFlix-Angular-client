import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { apiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component representing the user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Input data for user login.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Constructs the UserLoginFormComponent.
   * @param fetchApiData - The API service for making requests to the backend.
   * @param dialogRef - Reference to the dialog component.
   * @param snackBar - The notification service for displaying messages.
   * @param router - The router service for navigating to different routes.
   */
  constructor(
    public fetchApiData: apiService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Logs in a user by sending the form inputs to the backend.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Logic for a successful user login goes here! (To be implemented)
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('User successfully logged in', 'OK', {
          duration: 2000,
        });

        // Navigate to movies
        this.router.navigate(['/movies']);
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
