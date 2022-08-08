import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { AuthUser } from './../_models/authuser';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<AuthUser>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    const user = localStorage.getItem('user');
    if (user != null)
      this.userSubject = new BehaviorSubject<AuthUser>(JSON.parse(user));
    else
      this.userSubject = new BehaviorSubject<AuthUser>(null as any);
  }

  public get userValue(): AuthUser {
    return this.userSubject.value;
  }

  login(email, password) {
    return this.http.post<AuthUser>(environment.apiUrl + 'auth/login', { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.storeAuthUser(user);
        return user;
      }));
  }

  storeAuthUser(user: AuthUser) {
    user.storageTime = new Date().getTime();
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null as any);
    this.router.navigate(['/login']);
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}auth/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((user: AuthUser) => {
      this.storeAuthUser(user);
    }));
  }

  getJwtToken() {
    if (this.userSubject.value)
      return this.userSubject.value.token;
    else
      return '';
  }

  private getRefreshToken() {
    if (this.userSubject.value != null && this.isRefreshTokenValid()) {
      return this.userSubject.value.refreshToken;
    }
    return false;

  }

  isAccessTokenValid() {
    if (this.userSubject.value != null) {
      const user = this.userSubject.value;
      return (new Date().getTime() - user.storageTime) < ((user.token_validity) * (60 * 1000));
    }
    return false;

  }

  isRefreshTokenValid() {

    if (this.userSubject.value != null) {
      const user = this.userSubject.value;
      return (new Date().getTime() - user.storageTime) < ((user.token_validity) * (60 * 1000));
    }

    return false;
  }

  forgotPassword(data)
  {
    return this.http.post(environment.apiUrl + 'auth/forgot_password',data);
  }

}