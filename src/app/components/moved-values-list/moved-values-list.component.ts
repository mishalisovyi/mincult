import { Component, OnInit, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatPaginator, MatSort } from "@angular/material";
import { of, merge } from "rxjs";
import { tap, debounceTime } from "rxjs/operators";
import * as moment from "moment";
import { MovedValuesService, MovedValuesDataSource } from "../../services/api/moved-values.service";
import { GeneralDataService } from "../../services/api/general-data.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { User } from "../../models/User";

@Component({
  selector: 'app-moved-values-list',
  templateUrl: './moved-values-list.component.html',
  styleUrls: ['./moved-values-list.component.scss', '../shared.scss']
})
export class MovedValuesListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() goToStartPageEvent = new EventEmitter<string>();

  public dataSource: MovedValuesDataSource;

  public criterionsForm: FormGroup;
  public additionalCriterionsForm: FormGroup;

  public years: number[];
  public firstLoadingPerformed = false;

  public startPageRoute: string;
  public displayedColumns: string[] = ['name', 'creator', 'create_time', 'create_place', 'move_time', 'move_type', 'material', 'technique', 'size', 'keywords'];

  public monthes: any;
  public regions: any;
  public cities: any;
  public units: any;
  public createTimes: any;
  public materials: any;
  public techniques: any;
  public sizes: any;

  constructor(public formBuilder: FormBuilder, public values: MovedValuesService, public generalData: GeneralDataService, public storage: LocalStorageService) { }

  ngOnInit() {
    this.dataSource = new MovedValuesDataSource(this.values);
    this.initForms();
    this.getStartPageRoute();
    this.years = this.generalData.getYears();
    this.monthes = this.generalData.getMonthes();
    this.regions = this.generalData.getRegions();
    this.createTimes = this.generalData.getCreationTimes();
    this.materials = this.generalData.getMaterials();
    this.techniques = this.generalData.getTechniques();
    this.sizes = this.generalData.getSizes();

    this.criterionsForm.get("region").valueChanges.subscribe(() => {
      this.criterionsForm.get("city").setValue(null);
      this.criterionsForm.get("city").markAsUntouched();
      this.criterionsForm.get("unit").setValue(null);
      this.criterionsForm.get("unit").markAsUntouched();
      this.cities = this.generalData.getCities(this.criterionsForm.get("region").value);
      this.units = of([]);
    });
    this.criterionsForm.get("city").valueChanges.subscribe(() => {
      this.criterionsForm.get("unit").setValue(null);
      this.criterionsForm.get("unit").markAsUntouched();
      this.units = this.generalData.getUnits(this.criterionsForm.get("city").value);
    });
  }

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        debounceTime(200),
        tap(() => this.search(true))
      )
      .subscribe();
  }

  public validateDates() {
    if (this.criterionsForm.get("move_time_from").hasError("tooBig")) this.criterionsForm.get("move_time_from").setErrors(null);
    if (this.criterionsForm.get("move_time_from").value && this.criterionsForm.get("move_time_to").value) {
      if (this.criterionsForm.get("move_time_from").value > this.criterionsForm.get("move_time_to").value) {
        this.criterionsForm.get("move_time_from").setErrors({ tooBig: true });
      }
    }
  }

  public initForms() {
    this.criterionsForm = this.formBuilder.group({
      year: [moment().year(), Validators.required],
      month: [moment().month(), Validators.required],
      region: [null, Validators.required],
      city: [null, Validators.required],
      unit: [null, Validators.required],
      move_time_from: [null, Validators.required],
      move_time_to: [null, Validators.required],
      move_target: [null, Validators.required],
      keywords: "",
      name: "",
      creator: "",
      create_time: null,
      create_place: "",
      material: null,
      technique: null,
      size: null
    });
  }

  public getStartPageRoute() {
    this.storage.get<User>("authorization").subscribe(user => {
      if (!user) this.startPageRoute = "start-page-guest";
      else {
        const role = user.role;
        switch (role) {
          case "user":
            this.startPageRoute = "user-cabinet";
            break;
          case "expert":
            this.startPageRoute = "expert-requests-list";
            break;
          case "other":
            this.startPageRoute = "start-page-other";
            break;
          default:
            break;
        };
      };
    });
  }

  search(withoutValidation: boolean = false) {
    if (this.criterionsForm.valid || withoutValidation) {
      const ordering: string[] = [];
      if (this.sort.active && this.sort.direction) ordering.push(`${this.sort.direction === "asc" ? "-" : ""}${this.sort.active}`);
      const pagination = { page: this.paginator.pageIndex + 1, page_size: this.paginator.pageSize };
      this.dataSource.loadMovedValues(this.criterionsForm.value, pagination, ordering);
      this.firstLoadingPerformed = true;
    }
  }

  goToStartPage() {
    this.goToStartPageEvent.emit(this.startPageRoute);
  }
}