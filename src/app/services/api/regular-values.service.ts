import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Subject, BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, delay } from "rxjs/operators";
import * as _ from "lodash";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class RegularValuesService {

  constructor() { }
}

export class RegularValuesDataSource implements DataSource<any> {
  private regularValueSubject = new BehaviorSubject<any>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private emptySubject = new BehaviorSubject<boolean>(false);
  private dataLengthSubject = new Subject<number>();

  public loading$ = this.loadingSubject.asObservable();
  public empty$ = this.emptySubject.asObservable();
  public length$ = this.dataLengthSubject.asObservable();

  constructor(private regularValueService: RegularValuesService) { }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.regularValueSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.regularValueSubject.complete();
    this.loadingSubject.complete();
    this.emptySubject.complete();
    this.dataLengthSubject.complete();
  }

  loadRegularValues(data: any) {
    this.loadingSubject.next(true);
    this.emptySubject.next(false);

    of(data)
      .pipe(
        delay(400),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((values: any) => {
        [values].length ? this.regularValueSubject.next((() => {
          const data: any = [];
          for (let i = 0; i < _.random(5, 20); ++i) {
            data.push({
              name: `name ${i + 1}`,
              creator: `creator ${i + 1}`,
              create_time: moment(),
              create_place: `place ${i + 1}`,
              material: `material ${i + 1}`,
              technique: `technique ${i + 1}`,
              size: `size ${i + 1}`,
              keywords: `keywords ${i + 1}`
            })
          }
          return data;
        })()) : this.emptySubject.next(true);
      });
  }
}