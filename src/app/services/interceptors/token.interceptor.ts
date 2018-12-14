import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../api/auth.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { mergeMap, catchError } from "rxjs/operators";
import { UserLoginResponse } from "../../models/User";
import { Router } from "@angular/router";

import * as _ from "lodash";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private http: HttpClient;

  constructor(
    private injector: Injector,
    private authService: AuthService,
    private router: Router,
    private storage: LocalStorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getCurrentUser().pipe(
      mergeMap((user: UserLoginResponse) => {
        const token = _.get(user, "token");
        const newRequest = token ? request.clone({ url: request.url + "/", setHeaders: { Authorization: `Token ${token}` } }) : request.clone({ url: request.url + "/" });
        if (!token) this.router.navigateByUrl("/login");
        return next.handle(newRequest).pipe(
          catchError(error => {
            if (error.status === 401 || error.status === 403) {
              this.storage.remove("authorization").subscribe(() => {
                this.router.navigateByUrl("/login");
              })
            }
            return throwError(error);
          })
        );
      })
    );
  }
}