import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICandidateModel } from '../model/ICandidateModel';

@Injectable({
  providedIn: 'root'
})
export class CandidateServiceService {

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  addCandidate(candidate: ICandidateModel): Observable<ICandidateModel> {
    const url = 'http://localhost:3000/api/candidates';
    return this.http.post<ICandidateModel>(url, candidate, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
