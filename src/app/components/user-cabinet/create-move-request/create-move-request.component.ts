import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatRadioChange, MatSnackBar, MatDialogRef } from '@angular/material';
import { UserService } from "../../../services/api/user.service";
import { NumberValidator } from "../../../validators/number.validator";

@Component({
  selector: 'app-create-move-request',
  templateUrl: './create-move-request.component.html',
  styleUrls: ['./create-move-request.component.scss']
})
export class CreateMoveRequestComponent implements OnInit {

  public createRequestForm: FormGroup;
  public selectedIndex: number = 0;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialogRef<CreateMoveRequestComponent>, private userService: UserService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
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
        count: [1, [Validators.required, NumberValidator.count]]
      })
    });
  }

  private checkFormIsValid(): boolean {
    if (this.createRequestForm.controls.applicant_info.invalid) {
      this.selectedIndex = 0;
      return false;
    }
    if (this.createRequestForm.controls.owner_info.invalid) {
      this.selectedIndex = 1;
      return false;
    };
    if (this.createRequestForm.controls.move_info.invalid) {
      this.selectedIndex = 2;
      return false;
    };
    return true;
  }

  public handleTypeControlValueChange(e: MatRadioChange) {
    if (e.value === "current") {
      this.validateDates();
      this.createRequestForm.controls.move_info.get("start_date").setValidators(Validators.required);
      this.createRequestForm.controls.move_info.get("end_date").setValidators(Validators.required);
    } else {
      this.createRequestForm.controls.move_info.get("start_date").clearValidators();
      this.createRequestForm.controls.move_info.get("end_date").clearValidators();
      this.createRequestForm.controls.move_info.get("start_date").setErrors(null);
      this.createRequestForm.controls.move_info.get("end_date").setErrors(null);
      this.createRequestForm.controls.move_info.get("start_date").setValue("");
      this.createRequestForm.controls.move_info.get("end_date").setValue("");
    }
  }

  public validateDates() {
    if (this.createRequestForm.controls.move_info.get("start_date").hasError("tooBig")) this.createRequestForm.controls.move_info.get("start_date").setErrors(null);
    if (this.createRequestForm.controls.move_info.get("start_date").value && this.createRequestForm.controls.move_info.get("end_date").value) {
      if (this.createRequestForm.controls.move_info.get("start_date").value > this.createRequestForm.controls.move_info.get("end_date").value) {
        this.createRequestForm.controls.move_info.get("start_date").setErrors({ tooBig: true });
      }
    }
  }

  public createRequest() {
    if (this.checkFormIsValid()) {
      this.userService.createMoveRequest(this.createRequestForm.value).subscribe(
        res => {
          console.log(res);
          this.dialog.close();
          this.snackBar.open("Ваша заявка успішно створена. Результат прийде вам на електронну пошту впродовж 20 календарних днів", "Close", {
            duration: 4000
          });
        },
        err => {
          console.log(err);
          this.dialog.close();
          this.snackBar.open("Трапилася помилка під час створення запиту. Повторіть, будь ласка, ще раз", "Close", {
            duration: 4000
          });
        }
      );
    };
  }
}