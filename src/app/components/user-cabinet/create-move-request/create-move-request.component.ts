import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-move-request',
  templateUrl: './create-move-request.component.html',
  styleUrls: ['./create-move-request.component.scss']
})
export class CreateMoveRequestComponent implements OnInit {

  public createRequestForm: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.createRequestForm = this.formBuilder.group({
      applicant_info: this.formBuilder.group({
        name: ["", Validators.required],
        address: ["", Validators.required],
        phone: ["", [Validators.required, Validators.pattern("^[\\d+]+$")]],
        email: ["", [Validators.required, Validators.email]],
        passport: ["", [Validators.required, Validators.pattern("^\\d+$")]]
      }),
      owner_info: this.formBuilder.group({
        name: ["", Validators.required],
        address: ["", Validators.required],
        phone: ["", [Validators.required, Validators.pattern("^[\\d+]+$")]],
        email: ["", [Validators.required, Validators.email]],
        passport: ["", [Validators.required, Validators.pattern("^\\d+$")]]
      }),
      move_info: this.formBuilder.group({
        type: "permanent",
        start_date: "",
        end_date: "",
        purpose: ["", Validators.required],
        country: ["", Validators.required],
        count: [1, Validators.required]
      })
    });
  }

  public createRequest() {

  }
}