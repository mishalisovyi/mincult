import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, transition, animate, style } from "@angular/animations";
import { AuthService } from '../../services/api/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RoutingStateService } from '../../services/routing-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger("arrowBack", [
      state(
        "*",
        style({
          transform: "translateX(0px)",
          width: "*",
          opacity: 1
        })
      ),
      transition("void => *", [style({ transform: "translateX(-12px)", width: 0, opacity: 0 }), animate(200)]),
      transition("* => void", [animate(100, style({ transform: "translateX(-12px)", width: 0, opacity: 0 }))])
    ])
  ]
})

export class HeaderComponent {

  @Input() public authorizedUser: string = "";

  constructor(public router: Router, public authService: AuthService, public storage: LocalStorageService, public routing: RoutingStateService) { }

  logout() {
    this.authService.logout().subscribe(() => {
      this.storage.remove("authorization").subscribe(() => { this.router.navigateByUrl("/guest"); });
    });
  }
}