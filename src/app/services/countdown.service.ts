import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private apiUrl = '/api/deadline';

  constructor(private http: HttpClient) { }

  getSecondsLeft(): Observable<{ secondsLeft: number }> {
    return this.http.get<{ secondsLeft: number }>(this.apiUrl);
  }
}