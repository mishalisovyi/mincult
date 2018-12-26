import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar, MatDialogRef } from "@angular/material";
import { merge } from "rxjs";
import { GeneralDataService } from "../../../services/api/general-data.service";

@Component({
  selector: 'app-create-regular-request',
  templateUrl: './create-regular-request.component.html',
  styleUrls: ['./create-regular-request.component.scss']
})
export class CreateRegularRequestComponent implements OnInit, AfterViewInit {

  public createRequestForm: FormGroup;
  public regions: any;
  public categories: any;
  public experts: any;

  constructor(
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public dialog: MatDialogRef<CreateRegularRequestComponent>,
    public generalData: GeneralDataService
  ) { }

  ngOnInit() {
    this.createForm();
    this.regions = this.generalData.getRegions();
    this.categories = this.generalData.getCategories();
  }

  ngAfterViewInit() {
    merge(this.createRequestForm.get("region").valueChanges, this.createRequestForm.get("category").valueChanges).subscribe(() => {
      if (this.createRequestForm.get("region").valid && this.createRequestForm.get("category").valid) {
        this.experts = this.generalData.getExperts();
        this.createRequestForm.get("expert").enable();
      }
    })
  }

  public createForm() {
    this.createRequestForm = this.formBuilder.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
      phone: ["", [Validators.required, Validators.pattern("^[\\d+]+$")]],
      email: ["", [Validators.required, Validators.email]],
      passport: ["", [Validators.required, Validators.pattern("^\\d+$")]],
      region: [null, Validators.required],
      category: [null, Validators.required],
      expert: [{ value: null, disabled: true }, Validators.required],
      description: ""
    });
  }

  public createRequest() {
    if (this.createRequestForm.valid) {
      this.dialog.close();
      this.snackBar.open("Ваша заявка успішно створена. Результат прийде вам на пошту впродовж 20 календарних днів", "Close", {
        duration: 4000
      });
    }
  }
}