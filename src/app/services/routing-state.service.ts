import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RoutingStateService {
  private _navigateBackUrl: string = "";

  constructor() {}

  set navigateBackUrl(url: string) {
    setTimeout(() => (this._navigateBackUrl = url));
  }

  get navigateBackUrl(): string {
    return this._navigateBackUrl;
  }

  get canNavigateBack(): boolean {
    return this._navigateBackUrl ? true : false;
  }
}