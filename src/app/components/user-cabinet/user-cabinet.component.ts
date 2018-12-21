import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from "@angular/material";
import { UserService, UserDataSource } from "../../services/api/user.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { User } from "../../models/User";

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.scss']
})
export class UserCabinetComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: UserDataSource;

  public user: User;
  public displayedColumns: string[] = ['type', 'name', 'date', 'expert', 'status'];
  public firstLoadingPerformed = false;

  constructor(public userService: UserService, public storage: LocalStorageService) { }

  ngOnInit() {
    this.dataSource = new UserDataSource(this.userService);
    this.storage.get<User>("authorization").subscribe((user: User) => this.user = user);
    this.getRequestsList();
  }

  getRequestsList() {
    const ordering: string[] = [];
    if (this.sort.active && this.sort.direction) ordering.push(`${this.sort.direction === "asc" ? "-" : ""}${this.sort.active}`);
    const pagination = { page: this.paginator.pageIndex + 1, page_size: this.paginator.pageSize };
    this.dataSource.loadUserRequests({}, pagination, ordering);
    this.firstLoadingPerformed = true;
  }
}