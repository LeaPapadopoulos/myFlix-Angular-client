import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://mymovieapp.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class apiService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the user login endpoint
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

  // Making the api call for the get all movies endpoint
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(catchError(this.handleError));
  }

  // Making the api call for the get one movie endpoint
  getOneMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the get one director endpoint
  getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/director/' + directorName)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the get one genre endpoint
  getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the get one user endpoint
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

  // Making the api call for the get favourite movies for a user endpoint
  getFavoriteMovies(userName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + userName)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the add a movie to favourite Movies endpoint
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

  // Making the api call for the edit user endpoint
  editUser(user: string, updatedUser: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + user, updatedUser)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the delete user endpoint
  deleteUser(userName: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + userName)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the elete a movie from the favorite movies endpoint
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
