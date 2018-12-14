import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from "rxjs/operators";
import { LocalStorageService } from './services/local-storage.service';
import { UserLoginResponse } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public authorizedUser: string = "";

  constructor(public router: Router, public storage: LocalStorageService) { }

  ngOnInit() {
    this.router.events.pipe(filter(item => item instanceof NavigationEnd)).subscribe((item: NavigationEnd) => {
      if (["/user", "/expert", "/other"].includes(item.url)) this.storage.get<UserLoginResponse>("authorization").subscribe(res => this.authorizedUser = res.content.email);
      else this.authorizedUser = "";
    });
  }
}