import { Component, OnInit, Input } from '@angular/core';

// This import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { apiService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css'],
})
export class UserProfileEditComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: apiService,
    public dialogRef: MatDialogRef<UserProfileEditComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  updateUserProfile(): void {
    this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe(
      (response) => {
        // Logic for a successful user registration goes here! (To be implemented)
        console.log(response);
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('User successfully updated', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('user', JSON.stringify(response)); //update user data
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
