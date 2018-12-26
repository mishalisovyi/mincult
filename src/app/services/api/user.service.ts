import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Subject, BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, delay } from "rxjs/operators";
import * as _ from "lodash";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  public createRegularRequest() {
    return of("success").pipe(delay(300));
  }
}

export class UserDataSource implements DataSource<any> {
  private userRequestSubject = new BehaviorSubject<any>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private emptySubject = new BehaviorSubject<boolean>(false);
  private dataLengthSubject = new Subject<number>();

  public loading$ = this.loadingSubject.asObservable();
  public empty$ = this.emptySubject.asObservable();
  public length$ = this.dataLengthSubject.asObservable();

  constructor(private userService: UserService) { }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.userRequestSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.userRequestSubject.complete();
    this.loadingSubject.complete();
    this.emptySubject.complete();
    this.dataLengthSubject.complete();
  }

  loadUserRequests(data: any = {}, pagination: { page: number, page_size: number }, ordering?: string[]) {
    this.loadingSubject.next(true);
    this.emptySubject.next(false);

    of("data")
      .pipe(
        delay(1000),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((values: any) => {
        const length: number = _.random(5, 20);
        if ([values].length) {
          this.userRequestSubject.next((() => {
            const data: any = [];
            for (let i = 0; i < length; ++i) {
              data.push({
                type: new Array(
                  { value: "regular", title: "Проведення експертизи" },
                  { value: "moved", title: "Вивезення за кордон" }
                )[_.random(0, 1)],
                date: moment(),
                status: new Array(
                  { value: "pending", title: "Очікується" },
                  { value: "accepted", title: "Підтверджено" },
                  { value: "declined", title: "Відхилено" },
                )[_.random(0, 2)],
                expert: `Експерт ${i + 1}`,
                name: `Цінність ${i + 1}`,
              })
            }
            return data;
          })());
          this.dataLengthSubject.next(length);
          this.emptySubject.next(false);
        } else {
          this.emptySubject.next(true);
        }
      });
  }
}