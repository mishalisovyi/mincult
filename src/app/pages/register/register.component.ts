import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as _ from "lodash";
import { AuthService } from "../../services/api/auth.service";
import { RoutingStateService } from "../../services/routing-state.service";
import { UserRegisterRequest } from "../../models/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(public router: Router, public formBuilder: FormBuilder, public authService: AuthService, public routing: RoutingStateService) { }

  ngOnInit() {
    this.routing.navigateBackUrl = "/login";
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirm_password: ["", Validators.required],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(_.omit(this.registerForm.value, "confirm_password") as UserRegisterRequest).subscribe(() => this.router.navigateByUrl("/login"));
    }
  }

  validatePasswordConfirmation() {
    if (this.registerForm.get("confirm_password").hasError("notEqual")) this.registerForm.get("confirm_password").setErrors(null);
    if (this.registerForm.get("confirm_password").value && this.registerForm.get("password").value) {
      if (this.registerForm.get("confirm_password").value !== this.registerForm.get("password").value) {
        this.registerForm.get("confirm_password").setErrors({ notEqual: true });
      }
    }
  }
}