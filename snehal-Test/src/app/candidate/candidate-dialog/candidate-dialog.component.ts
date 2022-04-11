import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ICandidateModel } from 'src/app/model/ICandidateModel';
import { CandidateServiceService } from 'src/app/services/candidate-service.service';

@Component({
  selector: 'app-candidate-dialog',
  templateUrl: './candidate-dialog.component.html',
  styleUrls: ['./candidate-dialog.component.css']
})
export class CandidateDialogComponent implements OnInit {
  submitted = false;
  public phoneErrorMessage: any;
  public identityErrorMessage: any;
  candidateDetails = {} as ICandidateModel;
  userAddress: string = '';

  candidateForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
    mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
    identityNumber: new FormControl('', [Validators.required, Validators.pattern('^(?<Year>[0-9][0-9])(?<Month>([0][1-9])|([1][0-2]))(?<Day>([0][1-9])|([1-2][0-9])|([3][0-1]))(?<Gender>[0-9])(?<Series>[0-9]{3})(?<Citizenship>[0-9])(?<Uniform>[0-9])(?<Control>[0-9])')]),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    linkedinProfile: new FormControl(''),
    facebookProfile: new FormControl(''),
    twitterProfile: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<CandidateDialogComponent>,
    private candidateService: CandidateServiceService
  ) { }

  ngOnInit(): void {
    this.candidateForm.get("mobileNumber")?.valueChanges.subscribe((value) => {
      if (value) {
        const x = value.replace(/\D/g, "");
        if (x && x.length < 10) {
          this.phoneErrorMessage = "Invalid phone number.";
        } else {
          this.phoneErrorMessage = null;
        }
      } else {
        this.phoneErrorMessage = null;
      }
    });
    this.candidateForm.get("identityNumber")?.valueChanges.subscribe((value) => {
      if (value) {
        this.identityErrorMessage = "null";
      } else {
        this.identityErrorMessage = null;
      }
    })
    this.candidateForm.get("linkedinProfile")?.valueChanges.subscribe((value) => {
      if(value) {
        const x = value.substring(value.lastIndexOf("/") + 1, value.length);
        this.candidateForm.get('linkedinProfile')?.setValue(x);
        console.log(x);
      }
    })
    this.candidateForm.get("facebookProfile")?.valueChanges.subscribe((value) => {
      if(value) {
        const x = value.substring(value.lastIndexOf("/") + 1, value.length);
        this.candidateForm.get('facebookProfile')?.setValue(x);
        console.log(x);
      }
    })
    this.candidateForm.get("twitterProfile")?.valueChanges.subscribe((value) => {
      if(value) {
        const x = value.substring(value.lastIndexOf("/") + 1, value.length);
        this.candidateForm.get('twitterProfile')?.setValue(x);
        console.log(x);
      }
    })
  }


  get myForm() {
    return this.candidateForm.controls;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  saveCandidateDetails() {
    this.submitted = true;
    if(!this.candidateForm.valid) {
      return false;
    }else {
      this.candidateDetails.firstName = this.candidateForm.get('firstName')?.value;
      this.candidateDetails.lastName = this.candidateForm.get('lastName')?.value;
      this.candidateDetails.email = this.candidateForm.get('email')?.value;
      this.candidateDetails.mobileNumber = this.candidateForm.get('mobileNumber')?.value;
      this.candidateDetails.identityNumber = this.candidateForm.get('identityNumber')?.value;
      this.candidateDetails.addressLine1 = this.candidateForm.get('addressLine1')?.value;
      this.candidateDetails.addressLine2 = this.candidateForm.get('addressLine2')?.value;
      this.candidateDetails.country = this.candidateForm.get('country')?.value;
      this.candidateDetails.city = this.candidateForm.get('city')?.value;
      this.candidateDetails.province = this.candidateForm.get('province')?.value;
      this.candidateDetails.postalCode = this.candidateForm.get('postalCode')?.value;
      this.candidateDetails.linkedinProfile = this.candidateForm.get('linkedinProfile')?.value;
      this.candidateDetails.facebookProfile = this.candidateForm.get('facebookProfile')?.value;
      this.candidateDetails.twitterProfile = this.candidateForm.get('twitterProfile')?.value;

      this.candidateService.addCandidate(this.candidateDetails).subscribe(data => {
        alert('Candidate has been created successfully');
      });
      this.dialogRef.close();
      return true;
    }
  }
}
