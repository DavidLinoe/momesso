import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../utils/types/apiResponse';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl = 'http://localhost:3000/'; // todo criar environment

  get<T>(path: string): Observable<ResponseApi<T>> {
    return this.httpClient.get<ResponseApi<T>>(this.apiUrl + path);
  }
  post<T>(path: string, body: Partial<T>): Observable<ResponseApi<T>> {
    return this.httpClient.post<ResponseApi<T>>(this.apiUrl + path, body);
  }
  put<T>(path: string, body: Partial<T>): Observable<ResponseApi<T>> {
    return this.httpClient.put<ResponseApi<T>>(this.apiUrl + path, body);
  }
  patch<T>(path: string, body: Partial<T>): Observable<ResponseApi<T>> {
    return this.httpClient.patch<ResponseApi<T>>(this.apiUrl + path, body);
  }
  delete<T>(path: string): Observable<ResponseApi<T>> {
    return this.httpClient.delete<ResponseApi<T>>(this.apiUrl + path);
  }
}
