import { Injectable } from '@angular/core';
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class GeneralDataService {

  constructor() { }

  public getYears(): number[] {
    const years: number[] = [];
    for (let i = moment().subtract(10, "year").year(); i <= moment().year(); ++i) years.push(i);
    return years;
  }

  public getMonthes(): any[] {
    return [
      { value: 0, title: "Січень" },
      { value: 1, title: "Лютий" },
      { value: 2, title: "Березень" },
      { value: 3, title: "Квітень" },
      { value: 4, title: "Травень" },
      { value: 5, title: "Червень" },
      { value: 6, title: "Липень" },
      { value: 7, title: "Серпень" },
      { value: 8, title: "Вересень" },
      { value: 9, title: "Жовтень" },
      { value: 10, title: "Листопад" },
      { value: 11, title: "Грудень" }
    ];
  }

  public getRegions() {
    return of([
      { id: 0, title: "Вінницька" },
      { id: 1, title: "Київська" },
      { id: 2, title: "Львівська" }
    ]).pipe(delay(200));
  }

  public getCategories() {
    return of([
      { id: 0, title: "Предмети образотворчого мистецтва" },
      { id: 1, title: "Предмети декоративно-ужиткового мистецтва" },
      { id: 2, title: "Меморіальні пам'ятки" }
    ]).pipe(delay(200));
  }

  public getCities(regionId: number) {
    return of([
      { id: 0, title: "Вінниця" },
      { id: 1, title: "Київ" },
      { id: 2, title: "Львів" }
    ]).pipe(delay(200));
  }

  public getUnits(cityId: number) {
    return of([
      { id: 0, title: "Орган 1" },
      { id: 1, title: "Орган 2" },
      { id: 2, title: "Орган 3" }
    ]).pipe(delay(200));
  }

  public getCreationTimes() {
    return of([
      { id: 0, title: "XVI століття" },
      { id: 1, title: "XVIII століття" },
      { id: 2, title: "XX століття" }
    ]).pipe(delay(200));
  }

  public getMaterials() {
    return of([
      { id: 0, title: "Мармур" },
      { id: 1, title: "Дерево" },
      { id: 2, title: "Олійні фарби" }
    ]).pipe(delay(200));
  }

  public getTechniques() {
    return of([
      { id: 0, title: "Барельєф" },
      { id: 1, title: "Різьба по дереву" },
      { id: 2, title: "Графіка" }
    ]).pipe(delay(200));
  }

  public getSizes() {
    return of([
      { id: 0, title: "Малий" },
      { id: 1, title: "Середній" },
      { id: 2, title: "Великий" }
    ]).pipe(delay(200));
  }

  public getMissingTimes() {
    return of([
      { id: 0, title: "Перша світова війна" },
      { id: 1, title: "Друга світова війна" },
      { id: 2, title: "XXI століття" },
    ]).pipe(delay(200));
  }

  public getExperts() {
    return of([
      { id: 0, title: "Експерт 1" },
      { id: 1, title: "Експерт 2" },
      { id: 2, title: "Експерт 3" },
      { id: 3, title: "Експерт 4" },
      { id: 4, title: "Експерт 5" },
      { id: 5, title: "Експерт 6" },
      { id: 6, title: "Експерт 7" },
    ]).pipe(delay(200));
  }
}