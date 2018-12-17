import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Subject, BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, delay } from "rxjs/operators";

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

  loadRegularValues() {
    this.loadingSubject.next(true);
    this.emptySubject.next(false);

    of(["data"])
      .pipe(
        delay(400),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((values: any) => {
        values.length ? this.regularValueSubject.next([
          { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
          { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
          { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
          { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
          { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
          { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
          { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
          { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
          { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
          { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
        ]) : this.emptySubject.next(false);
      });
  }

  // loadRegularValues(pagination: { page: number; page_size: number }, filters?: { key: string; value: string }[], ordering?: string[], searchQuery?: string) {
  //   this.loadingSubject.next(true);
  //   this.emptySubject.next(false);
  //   this.regularValueService
  //     .findOffers(pagination, filters, ordering, searchQuery)
  //     .pipe(
  //       catchError(() => of([])),
  //       finalize(() => this.loadingSubject.next(false))
  //     )
  //     .subscribe((values: any) => {
  //       this.regularValueSubject.next(values.content);
  //       if (values.content) {
  //         if (values.metadata.items_count) this.dataLengthSubject.next(values.metadata.items_count);
  //         this.emptySubject.next(false);
  //       } else {
  //         this.emptySubject.next(true);
  //       }
  //     });
  // }
}