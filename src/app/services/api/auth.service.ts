import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import * as _ from "lodash";
import { LocalStorageService } from "../local-storage.service";
import { UserRegisterRequest, UserRegisterResponse, UserLoginRequest, UserLoginResponse, UserLogoutResponse } from "../../models/User";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  public register(data: UserRegisterRequest): Observable<UserRegisterResponse> {
    // return this.http.post<UserRegisterResponse>(`${environment.api}/registration`, data);
    return of({ content: { email: "aaa@gmail.com", password: "sdsfds", first_name: "Misha", last_name: "Lisovyi" } }).pipe(delay(300));
  }

  public login(data: UserLoginRequest): Observable<UserLoginResponse> {
    // return this.http.post<UserLoginResponse>(`${environment.api}/login`, data);
    const roles: string[] = ["user", "expert", "other"];
    return of({ content: { id: 0, token: "some_token", email: "aaa@gmail.com", role: roles[_.random(0, 2)], name: "Олег", surname: "Петренко" } }).pipe(delay(300));
  }

  public logout(): Observable<UserLogoutResponse> {
    // return this.http.get<UserLogoutResponse>(`${environment.api}/logout`);
    return of({ content: { detail: "success" } }).pipe(delay(300));
  }

  public getCurrentUser(): Observable<UserLoginResponse> {
    return this.storage.get<UserLoginResponse>("authorization");
  }
}