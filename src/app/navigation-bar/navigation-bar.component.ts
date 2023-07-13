import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing the navigation bar.
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  /**
   * Constructs the NavigationBarComponent.
   * @param router - The router service for navigating to different routes.
   * @param snackBar - The notification service for displaying messages.
   */
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  /**
   * Logs out the current user.
   */
  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/welcome']); // Redirect to login page or any other appropriate page
    this.snackBar.open('User successfully logged out', 'OK', {
      duration: 2000,
    });
  }
}
