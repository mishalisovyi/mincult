import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { LocalStorageService } from "../services/local-storage.service";
import { UserLoginResponse } from '../models/User';

@Injectable({
  providedIn: "root"
})
export class GuestGuard implements CanActivate {
  constructor(private storage: LocalStorageService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.storage.get<UserLoginResponse>("authorization").pipe(
      switchMap(data => {
        const allowed = data ? false : true;
        if (!allowed) data.content.role === "user" ? this.router.navigateByUrl("/user") : this.router.navigateByUrl("/expert");
        return of(allowed);
      })
    );
  }
}