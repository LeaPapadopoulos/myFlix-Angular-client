import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { apiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing the user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Input data for user registration.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructs the UserRegistrationFormComponent.
   * @param fetchApiData - The API service for making requests to the backend.
   * @param dialogRef - Reference to the dialog component.
   * @param snackBar - The notification service for displaying messages.
   */
  constructor(
    public fetchApiData: apiService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Registers a new user by sending the form inputs to the backend.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        // Logic for a successful user registration goes here! (To be implemented)
        console.log(response);
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open(
          'User successfully registered, you can now login',
          'OK',
          {
            duration: 2000,
          }
        );
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
