import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LocalStorageService } from "../../services/local-storage.service";
import { RoutingStateService } from "../../services/routing-state.service";
import { User } from "../../models/User";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  @ViewChild("sidenav") sidenav: MatSidenav;

  @HostListener("wheel", ["$event"]) disableWheelScroll($event: Event) {
    if (this.sidenav.opened) $event.preventDefault();
  }
  @HostListener("touchmove", ["$event"]) disableMobileScroll($event: Event) {
    if (this.sidenav.opened) $event.preventDefault();
  }
  @HostListener("keydown", ["$event"]) disableKeydownScroll($event: Event) {
    if (this.sidenav.opened) $event.preventDefault();
  }

  public role: string = "guest";
  public showedComponent: string = "start-page-guest";

  constructor(public storage: LocalStorageService, public routing: RoutingStateService) { }

  ngOnInit() {
    this.routing.navigateBackUrl = "";
    this.storage.get<User>("authorization").subscribe(item => {
      item ? this.role = item.role : this.role = "guest";
      switch (this.role) {
        case "guest":
          this.showedComponent = "start-page-guest";
          break;
        case "user":
          this.showedComponent = "user-cabinet";
          break;
        case "expert":
          this.showedComponent = "expert-requests-list";
          break;
        case "other":
          this.showedComponent = "start-page-other";
          break;
        default:
          break;
      }
    });
  }

  changeShowedComponent(showedComponent: string, toggleSidenav: boolean) {
    this.showedComponent = showedComponent;
    if (toggleSidenav) this.sidenav.toggle();
  }
}