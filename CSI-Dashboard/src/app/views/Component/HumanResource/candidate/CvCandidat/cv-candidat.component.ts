import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms'; 
import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
  selector: 'app-basic-form',
  templateUrl: './cv-candidat.component.html',
  styleUrls: ['./cv-candidat.component.css'],
  
})



export class cvcandidatComponent implements OnInit {
  formData = {}
  console = console;
  basicForm: UntypedFormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


    let password = new UntypedFormControl('', Validators.required);
    let confirmPassword = new UntypedFormControl('');
    
    this.basicForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [
        Validators.minLength(4),
        Validators.maxLength(9)
      ]),
      firstname: new UntypedFormControl('', [
        Validators.required
      ]),
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email
      ]),
      website: new UntypedFormControl(''),
      date: new UntypedFormControl(),
      cardno: new UntypedFormControl(''),
      password: password,
      confirmPassword: confirmPassword,
      gender: new UntypedFormControl(''),
      agreed: new UntypedFormControl('', (control: UntypedFormControl) => {
        const agreed = control.value;
        if(!agreed) {
          return { agreed: true }
        }
        return null;
      })
    })
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}

