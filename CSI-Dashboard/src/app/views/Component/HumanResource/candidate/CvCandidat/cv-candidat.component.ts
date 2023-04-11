import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormArray } from '@angular/forms'; 
import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Fruit } from 'assets/examples/material/input-chip/input-chip.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyStatus, LegalStatus, Provenance, Country } from 'app/shared/models/Partner';
import { Privilege, Civility, Service } from 'app/shared/models/contact';
import { WorkField, Availability, RequirementStatus, RequirementType } from 'app/shared/models/req';


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
  thirdFormGroup: FormGroup;
  fourthFormGroup : FormGroup;
  repeatForm: FormGroup;
//////////////Ajout Candidat///////////////
  
  public itemForm: FormGroup;;
  CompanyStatus = Object.values(CompanyStatus);
  WorkField :string []= Object.values(WorkField);
  LegalStatus = Object.values(LegalStatus);
  Provenance = Object.values(Provenance);
  countries: Country[];
  states: string[];
  selectedFile: File;
  Privilege :string []= Object.values(Privilege);
  Civility :string []= Object.values(Civility);
  Service :string []= Object.values(Service);
  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property
  Availability : string [] = Object.values(Availability);
  RequirementStatus  :string []= Object.values(RequirementStatus);
  RequirementType : string[] = Object.values(RequirementType);

  constructor(private _formBuilder: FormBuilder) { }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];

  ////////////////////Ajout Candidat///////////////
  buildItemForm(item){
    this.itemForm = this._formBuilder.group({

      firstName : [item.name || '', Validators.required],
      lastName : [item.name || '', Validators.required],
      birthdate : [item.name || '', Validators.required],
      country : [item.name || '', Validators.required],
      adress : [item.name || '', Validators.required],
      email1 : [item.name || '', Validators.required],
      phoneNumber1 : [item.name || '', Validators.required],
      civility : [item.name || '', Validators.required],
      jobTitle : [item.name || '', Validators.required],
      city : [item.name || '', Validators.required],
      postCode : [item.name || '', Validators.required],
      email2 : [item.name || '', Validators.required],
      phoneNumber2 : [item.name || '', Validators.required],
      institution : [item.name || '', Validators.required],
      diploma : [item.name || '', Validators.required],
      score : [item.name || '', Validators.required],
      educationStartYear: [item.name || '', Validators.required],
      obtainedYear : [item.name || '', Validators.required],
      company : [item.name || '', Validators.required],
      post : [item.name || '', Validators.required],
      title : [item.name || '', Validators.required],
      role : [item.name || '', Validators.required],
      ExperienceStartYear : [item.name || '', Validators.required],
      ExperienceStartMonth: [item.name || '', Validators.required],
      ExperienceEndYear : [item.name || '', Validators.required],
      ExperienceEndMonth : [item.name || '', Validators.required],
      certification : [item.name || '', Validators.required],
      certifDate : [item.name || '', Validators.required],
      language : [item.name || '', Validators.required],
      languageLevel : [item.name || '', Validators.required],
      languageInfo: [item.name || '', Validators.required],
      skills : [item.name || '', Validators.required],
      
    });

  }
/////////////////Fin ajout Candidat///////////////
  

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add skill
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }



  ngOnInit() {

    //this.firstFormGroup = this._formBuilder.group({
     // firstCtrl: ['', Validators.required]
    //});
   //this.secondFormGroup = this._formBuilder.group({
     // secondCtrl: ['', Validators.required]
    //});
    
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
  
    this.repeatForm = this._formBuilder.group({
      repeatArray: this._formBuilder.array([this.createRepeatForm()])
    });
  
  }

  //Section Supplimentaire button
  showInput = false;
 
createRepeatForm(): FormGroup {
  return this._formBuilder.group({
    
  });
}
get repeatFormGroup() {
  return this.repeatForm.get('repeatArray') as FormArray;
}
handleAddRepeatForm() {
  this.repeatFormGroup.push(this.createRepeatForm());
}
handleRemoveRepeatForm(index: number) {
  this.repeatFormGroup.removeAt(index);
  if (index > 0) { // check if the index is greater than 0
    const repeatArray = this.repeatForm.get('repeatArray') as FormArray;
    repeatArray.removeAt(index);
}
}
  


  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}

