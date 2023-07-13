import { Component, OnInit } from '@angular/core';
import { apiService } from '../fetch-api-data.service';
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

// User notification
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  users: any = {};
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

  // Call to get user profile
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

  openUserProfileEdit(): void {
    this.dialog.open(UserProfileEditComponent, {
      width: '280px',
    });
  }
}
