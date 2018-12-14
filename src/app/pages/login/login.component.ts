import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { switchMap } from "rxjs/operators";
import { AuthService } from "../../services/api/auth.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { RoutingStateService } from "../../services/routing-state.service";
import { UserLoginRequest, UserLoginResponse } from "../../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public authService: AuthService,
    public storage: LocalStorageService,
    public routing: RoutingStateService
  ) { }

  ngOnInit() {
    this.routing.navigateBackUrl = "/user";
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value as UserLoginRequest)
        .pipe(switchMap((response: UserLoginResponse) => this.storage.set<UserLoginResponse>("authorization", response)))
        .subscribe(
          // (user) => { user.content.role === "user" ? this.router.navigateByUrl("/user") : this.router.navigateByUrl("/expert"); },
          user =>  this.router.navigateByUrl(`/${user.content.role}`),
          e => { this.snackBar.open(e, "Close", { duration: 2000 }); }
        );
    }
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}