import { Component, OnInit } from '@angular/core';
import { apiService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component representing the movie card display.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  /**
   * Array of movies.
   */
  movies: any[] = [];

  /**
   * Constructs the MovieCardComponent.
   * @param fetchApiData - The API service for making requests to the backend.
   * @param dialog - The dialog service for displaying movie details.
   * @param snackBar - The notification service for displaying messages.
   * @param router - The router service for navigating to different routes.
   */
  constructor(
    public fetchApiData: apiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();

    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to welcome page if a valid token doesn't exist
      this.router.navigate(['/welcome']);
    }
  }

  /**
   * Retrieves all movies from the backend.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  /**
   * Opens the movie details dialog for a specific genre.
   * @param name - The name of the genre.
   */
  openGenre(name: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: 'Genre Type',
        content: name,
      },
    });
  }

  /**
   * Opens the movie details dialog for a specific director.
   * @param name - The name of the director.
   */
  openDirector(name: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: 'Director Name',
        content: name,
      },
    });
  }

  /**
   * Opens the movie details dialog for a movie's synopsis.
   * @param description - The movie's synopsis.
   */
  openSynopsis(description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: 'Synopsis',
        content: description,
      },
    });
  }

  /**
   * Adds a movie to the user's favorite movies.
   * @param id - The ID of the movie to add.
   */
  addToFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000,
      });
      this.updateFavoriteMovies(id, true); // Update the favorite movies in localStorage
    });
  }

  /**
   * Removes a movie from the user's favorite movies.
   * @param id - The ID of the movie to remove.
   */
  removeFromFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000,
      });
      this.updateFavoriteMovies(id, false); // Update the favorite movies in localStorage
    });
  }

  /**
   * Updates the user's favorite movies in the local storage.
   * @param movieId - The ID of the movie.
   * @param addToFavorites - Boolean indicating whether to add or remove the movie.
   */
  private updateFavoriteMovies(movieId: string, addToFavorites: boolean): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (addToFavorites) {
      user.FavoriteMovies.push(movieId);
    } else {
      user.FavoriteMovies = user.FavoriteMovies.filter(
        (id: string) => id !== movieId
      );
    }
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Checks if a movie is in the user's favorite movies.
   * @param movieId - The ID of the movie.
   * @returns A boolean indicating whether the movie is a favorite.
   */
  isFavorite(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies && user.FavoriteMovies.includes(movieId);
  }
}
