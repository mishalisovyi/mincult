import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Subject, BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, delay } from "rxjs/operators";
import * as _ from "lodash";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class MovedValuesService {

  constructor() { }
}

export class MovedValuesDataSource implements DataSource<any> {
  private movedValueSubject = new BehaviorSubject<any>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private emptySubject = new BehaviorSubject<boolean>(false);
  private dataLengthSubject = new Subject<number>();

  public loading$ = this.loadingSubject.asObservable();
  public empty$ = this.emptySubject.asObservable();
  public length$ = this.dataLengthSubject.asObservable();

  constructor(private movedValueService: MovedValuesService) { }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.movedValueSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.movedValueSubject.complete();
    this.loadingSubject.complete();
    this.emptySubject.complete();
    this.dataLengthSubject.complete();
  }

  loadMovedValues(data: any, pagination: { page: number, page_size: number }, ordering?: string[]) {
    this.loadingSubject.next(true);
    this.emptySubject.next(false);

    data.move_time_from = new Date(data.move_time_from).toISOString();
    data.move_time_to = new Date(data.move_time_to).toISOString();

    of(data)
      .pipe(
        delay(400),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((values: any) => {
        const length: number = _.random(5, 20);
        if ([values].length) {
          this.movedValueSubject.next((() => {
            const data: any = [];
            for (let i = 0; i < length; ++i) {
              data.push({
                name: `name ${i + 1}`,
                creator: `creator ${i + 1}`,
                create_time: `time ${i + 1}`,
                create_place: `place ${i + 1}`,
                move_time: moment(),
                move_type: new Array("inner", "outer")[_.random(0, 1)],
                material: `material ${i + 1}`,
                technique: `technique ${i + 1}`,
                size: `size ${i + 1}`,
                keywords: `keywords ${i + 1}`
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