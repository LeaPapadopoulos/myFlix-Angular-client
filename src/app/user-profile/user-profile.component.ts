import { Component, OnInit } from '@angular/core';
import { apiService } from '../fetch-api-data.service';
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * Component representing the user profile page.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  /**
   * Object representing the user profile.
   */
  users: any = {};

  /**
   * Constructs the UserProfileComponent.
   * @param fetchApiData - The API service for making requests to the backend.
   * @param snackBar - The notification service for displaying messages.
   * @param dialog - The dialog service for displaying the user profile edit form.
   * @param router - The router service for navigating to different routes.
   */
  constructor(
    public fetchApiData: apiService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();

    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to movies page if a valid token exists
      this.router.navigate(['/welcome']);
    }
  }

  /**
   * Retrieves the user profile from the backend.
   */
  getUserProfile(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.fetchApiData.getUser(user.username).subscribe(
      (response) => {
        console.log(response); // Log the response to the console
        this.users = response;
      },
      (error) => {
        console.error(error); // Log any errors to the console
      }
    );
  }

  /**
   * Opens the user profile edit dialog.
   */
  openUserProfileEdit(): void {
    this.dialog.open(UserProfileEditComponent, {
      width: '280px',
    });
  }
}
