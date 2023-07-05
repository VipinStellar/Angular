import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { AuthUser } from '../_models/authuser';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const loader = Array.from(document.getElementsByClassName('loader-main-page'));
      loader.forEach((element) => {element['style'].display = 'block';});
      if (this.accountService.getJwtToken()) {
        request = this.addToken(request, this.accountService.getJwtToken());
      }
  
      return next.handle(request).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 500 || error.status === 409)) {
          return this.handle401Error(request, next,error);
        } else {
          return throwError(error);
        }
      }),
      finalize(()=>{
        loader.forEach((element) => {element['style'].display = 'none';});
      }));
    }
  
    private addToken(request: HttpRequest<any>, token: string) {
      return request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
  
    private handle401Error(request: HttpRequest<any>, next: HttpHandler,error ) {
      if(error.status === 401)
      {
        this.accountService.logout();
       // window.location.reload();
      }
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
  
        return this.accountService.refreshToken().pipe(
          switchMap((user: AuthUser) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(user.token);
            return next.handle(this.addToken(request, user.token));
          }));
  
      } else {
        return this.refreshTokenSubject.pipe(
          filter(user => user != null),
          take(1),
          switchMap(accessToken => {
            return next.handle(this.addToken(request, accessToken));
          }));
      }
    }    

}