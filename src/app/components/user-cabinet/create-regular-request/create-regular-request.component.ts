import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { MatSnackBar, MatDialogRef } from "@angular/material";
import { merge } from "rxjs";
import * as _ from "lodash";
import { UserService } from "../../../services/api/user.service";
import { GeneralDataService } from "../../../services/api/general-data.service";

interface ImageObject {
  id: number,
  base64: SafeStyle,
  file: File
}

@Component({
  selector: 'app-create-regular-request',
  templateUrl: './create-regular-request.component.html',
  styleUrls: ['./create-regular-request.component.scss']
})

export class CreateRegularRequestComponent implements OnInit, AfterViewInit {

  @ViewChild('imageFileInput') public fileInput: any;

  public createRequestForm: FormGroup;
  public regions: any;
  public categories: any;
  public experts: any;

  public images: ImageObject[] = [];

  constructor(
    public formBuilder: FormBuilder,
    public sanitization: DomSanitizer,
    public snackBar: MatSnackBar,
    public dialog: MatDialogRef<CreateRegularRequestComponent>,
    public userService: UserService,
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

  public getImages(e: any) {
    if (this.validateImages(e.target.files)) {
      for (let i = 0; i < e.target.files.length; ++i) {
        const image: ImageObject = { id: Date.now(), file: e.target.files[i], base64: null };
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = () => {
          image.base64 = this.sanitization.bypassSecurityTrustStyle(`url('${reader.result}')`);
          this.images.push(image);
        };
      };
      this.fileInput.nativeElement.value = "";
    } else {
      this.snackBar.open("Один або кілька файлів не є зображенням!", "Close", {
        duration: 2000
      });
    };
  }

  public validateImages(files: FileList): boolean {
    let validImages: boolean = true;
    for (let i = 0; i < files.length; ++i) {
      if (!files[i].type.includes("image")) {
        validImages = false;
        break;
      }
    }
    return validImages;
  }

  public deleteImage(id: number) {
    _.remove(this.images, (image: ImageObject) => image.id === id);
  }

  public createRequest() {
    if (this.createRequestForm.valid) {
      const formData: FormData = new FormData();
      formData.append("name", this.createRequestForm.get("name").value);
      formData.append("address", this.createRequestForm.get("address").value);
      formData.append("phone", this.createRequestForm.get("phone").value);
      formData.append("email", this.createRequestForm.get("email").value);
      formData.append("passport", this.createRequestForm.get("passport").value);
      formData.append("region", this.createRequestForm.get("region").value);
      formData.append("category", this.createRequestForm.get("category").value);
      formData.append("expert", this.createRequestForm.get("expert").value);
      formData.append("description", this.createRequestForm.get("description").value);
      this.images.forEach((image, i) => formData.append(`image${i + 1}`, image.file));
      this.userService.createRegularRequest(formData).subscribe(
        res => {
          this.dialog.close();
          this.snackBar.open("Ваша заявка успішно створена. Результат прийде вам на електронну пошту впродовж 20 календарних днів", "Close", {
            duration: 4000
          });
        },
        err => {
          this.dialog.close();
          this.snackBar.open("Трапилася помилка під час створення запиту. Повторіть, будь ласка, ще раз", "Close", {
            duration: 4000
          });
        }
      );
    }
  }
}