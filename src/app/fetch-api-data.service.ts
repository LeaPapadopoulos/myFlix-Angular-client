import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://mymovieapp.herokuapp.com/';

/**
 * Service for making API calls to the backend.
 */
@Injectable({
  providedIn: 'root',
})
export class apiService {
  /**
   * Constructs the ApiService.
   * @param http - The HttpClient module for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Makes an API call for user registration.
   * @param userDetails - The user details to be registered.
   * @returns An Observable with the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call for user login.
   * @param userDetails - The user details for login.
   * @returns An Observable with the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(
        apiUrl +
          'login?username=' +
          userDetails.Username +
          '&password=' +
          userDetails.Password,
        null
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get all movies.
   * @returns An Observable with the API response.
   */
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get a single movie by title.
   * @param title - The title of the movie to retrieve.
   * @returns An Observable with the API response.
   */
  getOneMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get movies by director.
   * @param directorName - The name of the director.
   * @returns An Observable with the API response.
   */
  getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/director/' + directorName)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get movies by genre.
   * @param genreName - The name of the genre.
   * @returns An Observable with the API response.
   */
  getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get a user by username.
   * @param userName - The username of the user to retrieve.
   * @returns An Observable with the API response.
   */
  getUser(userName: string): Observable<any> {
    console.log(userName);
    const token = localStorage.getItem('token');
    console.log(token);

    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get favorite movies for a user.
   * @param userName - The username of the user.
   * @returns An Observable with the API response.
   */
  getFavoriteMovies(userName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + userName)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to add a movie to favorite movies.
   * @param movieId - The ID of the movie to add.
   * @returns An Observable with the API response.
   */
  addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http
      .post(
        apiUrl + 'users/favorites/' + userName.username + '/' + movieId,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
          responseType: 'text',
        }
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to edit a user.
   * @param user - The username of the user to edit.
   * @param updatedUser - The updated user data.
   * @returns An Observable with the API response.
   */
  editUser(user: string, updatedUser: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + user, updatedUser)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to delete a user.
   * @param userName - The username of the user to delete.
   * @returns An Observable with the API response.
   */
  deleteUser(userName: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + userName)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to delete a movie from the favorite movies.
   * @param movieId - The ID of the movie to delete.
   * @returns An Observable with the API response.
   */
  deleteFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http
      .delete(apiUrl + 'users/favorites/' + userName.username + '/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles HTTP error responses.
   * @param error - The HttpErrorResponse.
   * @returns An Observable with the error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
