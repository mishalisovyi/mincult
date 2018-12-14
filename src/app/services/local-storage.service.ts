import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  set<T>(key: string, value: any): Observable<T> {
    if (!key) throw Error('argument "key" is required');
    if (!value) throw Error('argument "value" is required');

    localStorage.setItem(this.key(key), JSON.stringify(value));
    return this.get(key);
  }

  get<T>(key: string): Observable<T> {
    if (!key) throw Error('argument "key" is required');
    return of(JSON.parse(localStorage.getItem(this.key(key))));
  }

  remove<T>(key: string): Observable<any> {
    if (!key) throw Error('argument "key" is required');
    localStorage.removeItem(this.key(key));
    return of({});
  }

  key(key: string): string {
    return `${environment.storage}_${key}`;
  }
}
