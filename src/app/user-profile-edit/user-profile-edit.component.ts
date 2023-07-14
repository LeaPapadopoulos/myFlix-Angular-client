import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { apiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing the user profile edit form.
 */
@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css'],
})
export class UserProfileEditComponent implements OnInit {
  /**
   * Input data for user profile edit.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birth: '' };

  /**
   * Constructs the UserProfileEditComponent.
   * @param fetchApiData - The API service for making requests to the backend.
   * @param dialogRef - Reference to the dialog component.
   * @param snackBar - The notification service for displaying messages.
   */
  constructor(
    public fetchApiData: apiService,
    public dialogRef: MatDialogRef<UserProfileEditComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Updates the user profile by sending the form inputs to the backend.
   */
  updateUserProfile(): void {
    const oldUserUserName = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).username;

    this.fetchApiData.editUser(oldUserUserName, this.userData).subscribe(
      (response) => {
        // Logic for a successful user registration goes here! (To be implemented)
        console.log(response);
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('User successfully updated', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('user', JSON.stringify(response)); //update user data

        window.location.reload(); // reload page with new data
      },
      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
