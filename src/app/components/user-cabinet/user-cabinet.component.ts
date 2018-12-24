import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatDialog } from "@angular/material";
import { merge } from "rxjs";
import { CreateRegularRequestComponent } from "./create-regular-request/create-regular-request.component";
import { CreateMoveRequestComponent } from "./create-move-request/create-move-request.component";
import { UserService, UserDataSource } from "../../services/api/user.service";
import { ValuesFiltersDataService } from "../../services/api/values-filters-data.service"
import { LocalStorageService } from "../../services/local-storage.service";
import { User } from "../../models/User";

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.scss']
})
export class UserCabinetComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: UserDataSource;

  public filterByTypeControl: AbstractControl;
  public filterByExpertControl: AbstractControl;
  public filterByStatusControl: AbstractControl;

  public user: User;
  public experts: any;
  public displayedColumns: string[] = ['type', 'name', 'date', 'expert', 'status', 'view_request', 'view_response'];

  constructor(public dialog: MatDialog, public userService: UserService, public storage: LocalStorageService, public filters: ValuesFiltersDataService) { }

  ngOnInit() {
    this.initControls();
    this.dataSource = new UserDataSource(this.userService);
    this.storage.get<User>("authorization").subscribe((user: User) => this.user = user);
    this.experts = this.filters.getExperts();
    this.getRequestsList();
  }

  ngAfterViewInit() {
    merge(
      this.filterByTypeControl.valueChanges,
      this.filterByExpertControl.valueChanges,
      this.filterByStatusControl.valueChanges,
      this.sort.sortChange,
      this.paginator.page
    )
      .subscribe(() => this.getRequestsList());
  }

  initControls() {
    this.filterByTypeControl = new FormControl("");
    this.filterByExpertControl = new FormControl("");
    this.filterByStatusControl = new FormControl("");
  }

  getRequestsList() {
    const filters = [];
    const ordering: string[] = [];
    if (this.filterByTypeControl.value) filters.push({ key: "type", value: this.filterByTypeControl.value });
    if (this.filterByExpertControl.value) filters.push({ key: "expert_id", value: this.filterByExpertControl.value });
    if (this.filterByStatusControl.value) filters.push({ key: "status", value: this.filterByStatusControl.value });
    if (this.sort.active && this.sort.direction) ordering.push(`${this.sort.direction === "asc" ? "-" : ""}${this.sort.active}`);
    const pagination = { page: this.paginator.pageIndex + 1, page_size: this.paginator.pageSize };
    this.dataSource.loadUserRequests(filters, pagination, ordering);
  }

  openRegularRequestDialog() {
    const dialogRef = this.dialog.open(CreateRegularRequestComponent, {
      width: "50%"
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');
    });
  }

  openMoveRequestDialog() {
    const dialogRef = this.dialog.open(CreateMoveRequestComponent, {
      width: "50%"
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');
    });
  }
}