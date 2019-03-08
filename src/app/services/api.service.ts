import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _endpoint = `/api`;
  private _apiKey = ``; // put your api key here and remember it is good practice to keep it in a .env

  constructor(private http: HttpClient) { }

  public fetchImages(page: number = 1, limit: number = 15): Observable<any> {
    const path = `${this._endpoint}?limit=${limit}&page=${page}`;
    const headers: HttpHeaders = new HttpHeaders({ 'x-api-key': this._apiKey });
    return this.http.get(path, {
      headers: headers
    });
  }
}
