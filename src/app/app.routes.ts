import { Routes } from "@angular/router";
import { ContainerComponent } from "./pages/container/container.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { AuthGuard } from "./guards/auth.guard";
import { GuestGuard } from "./guards/guest.guard";

export const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/guest",
    pathMatch: "full"
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [GuestGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: "guest",
    component: ContainerComponent,
    canActivate: [GuestGuard]
  },
  {
    path: "user",
    component: ContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "expert",
    component: ContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "other",
    component: ContainerComponent,
    canActivate: [AuthGuard]
  }     
];