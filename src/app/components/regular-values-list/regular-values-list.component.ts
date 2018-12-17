import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { of, EMPTY } from "rxjs";
import * as moment from "moment";
import { RegularValuesService, RegularValuesDataSource } from "../../services/api/regular-values.service";
import { ValuesFiltersDataService } from "../../services/api/values-filters-data.service";

@Component({
  selector: 'app-regular-values-list',
  templateUrl: './regular-values-list.component.html',
  styleUrls: ['./regular-values-list.component.scss']
})
export class RegularValuesListComponent implements OnInit {

  public dataSource: RegularValuesDataSource;
  public requiredCriterionsForm: FormGroup;
  public additionalCriterionsForm: FormGroup;
  public years: number[];
  public monthes: any;
  public regions: any;
  public cities: any;
  public units: any;
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(public formBuilder: FormBuilder, public values: RegularValuesService, public filtersData: ValuesFiltersDataService) { }

  ngOnInit() {
    this.dataSource = new RegularValuesDataSource(this.values);
    this.initForms();
    this.years = this.filtersData.getYears();
    this.monthes = this.filtersData.getMonthes();
    this.regions = this.filtersData.getRegions();

    this.requiredCriterionsForm.get("region").valueChanges.subscribe(() => {
      this.requiredCriterionsForm.get("city").setValue(null);
      this.requiredCriterionsForm.get("city").markAsUntouched();
      this.requiredCriterionsForm.get("unit").setValue(null);
      this.requiredCriterionsForm.get("unit").markAsUntouched();
      this.cities = this.filtersData.getCities(this.requiredCriterionsForm.get("region").value);
      this.units = of([]);
    });
    this.requiredCriterionsForm.get("city").valueChanges.subscribe(() => {
      this.requiredCriterionsForm.get("unit").setValue(null);
      this.requiredCriterionsForm.get("unit").markAsUntouched();
      this.units = this.filtersData.getUnits(this.requiredCriterionsForm.get("city").value);
    });
  }

  public initForms() {
    this.requiredCriterionsForm = this.formBuilder.group({
      year: [moment().year(), Validators.required],
      month: [moment().month(), Validators.required],
      region: [null, Validators.required],
      city: [null, Validators.required],
      unit: [null, Validators.required]
    });
  }

  search() {
    console.log(this.requiredCriterionsForm.value());
  }
}