import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormArray } from '@angular/forms'; 
import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Fruit } from 'assets/examples/material/input-chip/input-chip.component';


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


  constructor(private _formBuilder: FormBuilder) { }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];

  

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

