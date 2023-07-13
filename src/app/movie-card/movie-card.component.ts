import { Component, OnInit } from '@angular/core';
import { apiService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  openGenre(name: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: 'Genre Type',
        content: name,
      },
    });
  }

  openDirector(name: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: 'Director Name',
        content: name,
      },
    });
  }

  openSynopsis(description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: 'Synopsis',
        content: description,
      },
    });
  }

  addToFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000,
      });
      this.updateFavoriteMovies(id, true); // Update the favorite movies in localStorage
    });
  }

  removeFromFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000,
      });
      this.updateFavoriteMovies(id, false); // Update the favorite movies in localStorage
    });
  }

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

  isFavorite(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies && user.FavoriteMovies.includes(movieId);
  }
}
