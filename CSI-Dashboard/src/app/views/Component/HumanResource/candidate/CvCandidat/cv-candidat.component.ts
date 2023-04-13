import { HttpClient } from '@angular/common/http';
import { MaritalSituation } from '../../../../../shared/models/Employee';
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
import { Title } from 'app/shared/models/Employee';
import { CvCandidatService } from './cv-candidat.service';
import { LanguageLevel, Languages } from 'app/shared/models/Language';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-basic-form',
  templateUrl: './cv-candidat.component.html',
  styleUrls: ['./cv-candidat.component.css'],
  
})
 
export class cvcandidatComponent implements OnInit {
  formData = {}
  console = console;
  repeatForm: FormGroup;
  parentForm: FormGroup;
  form1: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  form4: FormGroup;
  step1:FormGroup;
  step2:FormGroup;
  step3:FormGroup;
  step4:FormGroup;

//////////////Ajout Candidat///////////////
  public itemForm: FormGroup;;
  CompanyStatus = Object.values(CompanyStatus);
  WorkField :string []= Object.values(WorkField);
  LegalStatus = Object.values(LegalStatus);
  Provenance = Object.values(Provenance);
  countries: Country[];
  states: string[];
  selectedFile: File;
  title :string[]= Object.values(Title);
  Civility :string []= Object.values(Civility);
  MaritalSituation :string []= Object.values(MaritalSituation);
  Service :string []= Object.values(Service);
  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property
  Availability : string [] = Object.values(Availability);
  RequirementStatus  :string []= Object.values(RequirementStatus);
  RequirementType : string[] = Object.values(RequirementType);
  Languages : string[] = Object.values(Languages);
  LanguageLevel : string[] = Object.values(LanguageLevel);

  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];

 constructor(private _formBuilder: FormBuilder,
  private cvCandidatService: CvCandidatService,
  private formBuilder: FormBuilder,
   private http: HttpClient) 
   {  this.countries = this.cvCandidatService.getCountries();

    /*this.form1 = new FormGroup({

      firstName: new FormControl(''),
      birthdate: new FormControl(''),
      title: new FormControl(''),
      country: new FormControl(''),
      adress: new FormControl(''),
      email1: new FormControl(''),
      phoneNumber1: new FormControl(''),
      lasttName: new FormControl(''),
      civility: new FormControl(''),
      maritalSituation: new FormControl(''),
      postCode: new FormControl(''),
      email2: new FormControl(''),
      phoneNumber2: new FormControl(''),
      city: new FormControl('')

    });

    this.form2 = new FormGroup({
      institution: new FormControl(''),
      diploma: new FormControl(''),
      score: new FormControl(''),
      educationStartYear: new FormControl(''),
      obtainedYear: new FormControl('')
    });

      this.form3 = new FormGroup({
      company: new FormControl(''),
      experiencePost: new FormControl(''),
      experienceTitle: new FormControl(''),
      experienceRole: new FormControl(''),
      experienceStartYear: new FormControl(''),
      experienceStartMonth: new FormControl(''),
      experienceEndtYear: new FormControl(''),
      experienceEndMonth: new FormControl('')

    }); 
    this.form4 = new FormGroup({
      certification: new FormControl(''),
      certifDate: new FormControl(''),
      language: new FormControl(''),
      languageLevel: new FormControl(''),
      languageInfo: new FormControl(''),
      skillsCategory: new FormControl(''),
      skills: new FormControl(''),
    });
    this.form4.addControl('language', new FormControl(''));*/
  }


  ////////////////////Ajout Candidat///////////////
  buildItemForm(item){
    this.parentForm = this._formBuilder.group({

      firstName : [item.firstName || '', Validators.required],
      lastName : [item.lastName || '', Validators.required],
      birthDate : [item.birthDate || '', Validators.required],
      country : [item.country || '', Validators.required],
      title : [item.postName || '', Validators.required],
      adress : [item.adress || '', Validators.required],
      email1 : [item.email1 || '', Validators.required],
      phoneNumber1 : [item.phoneNumber1 || '', Validators.required],
      civility : [item.civility || '', Validators.required],
      maritalSitation : [item.maritalSitation || '', Validators.required],
      city : [item.city || '', Validators.required],
      postCode : [item.postCode || '', Validators.required],
      email2 : [item.email2 || '', Validators.required],
      phoneNumber2 : [item.phoneNumber2 || '', Validators.required],
      institution : [item.institution || '', Validators.required],
      diploma : [item.diploma || '', Validators.required],
      score : [item.score || '', Validators.required],
      educationStartYear: [item.educationStartYear || '', Validators.required],
      obtainedYear : [item.obtainedYear || '', Validators.required],
      company : [item.company || '', Validators.required],
      experiencePost : [item.experiencePost || '', Validators.required],
      experienceTitle : [item.experienceTitle || '', Validators.required],
      experienceRole : [item.experienceRole || '', Validators.required],
      ExperienceStartYear : [item.ExperienceStartYear || '', Validators.required],
      ExperienceStartMonth: [item.ExperienceStartMonth || '', Validators.required],
      ExperienceEndYear : [item.ExperienceEndYear || '', Validators.required],
      ExperienceEndMonth : [item.ExperienceEndMonth || '', Validators.required],
      certification : [item.certification || '', Validators.required],
      certifDate : [item.certifDate || '', Validators.required],
      language : [item.language || '', Validators.required],
      languageLevel : [item.languageLevel || '', Validators.required],
      languageInfo: [item.languageInfo || '', Validators.required],
      skills : [item.skills || '', Validators.required],
    });

  }
  

  ngOnInit() {
    
    let password = new UntypedFormControl('', Validators.required);
    let confirmPassword = new UntypedFormControl('');
    
    this.parentForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [
        Validators.minLength(4),
        Validators.maxLength(9)
      ]),
      
    })
  
    this.repeatForm = this._formBuilder.group({
      repeatArray: this._formBuilder.array([this.createRepeatForm()])
    });

    /////Countries////
    this.itemForm.get("country").valueChanges.subscribe((country) => {
      this.itemForm.get("city").reset();
      if (country) {
        this.states = this.cvCandidatService.getStatesByCountry(country);
   
      }
    });

    ///form submit
   
  }


  //////////////fonction ghada///////
  saveCandidate(): void {
    console.log('saveCandidat() called');
    if (this.parentForm.valid) {
      console.log('Form is valid, submitting...');
      this.cvCandidatService.addItem(this.parentForm.value).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          console.log('Form value', this.parentForm.value);
          this.submitted = true;
        },
        error: (e) => console.error('Error adding item', e)
      });
    } else {
      console.warn('Form is invalid');
    }
  }
  public confirmer(){}

   ///////Skills chips//////////
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

  // Remove skill
  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


  ///// Form Submit///// 
  onSubmit() {
    // Get the values of each form
    const formData = this.parentForm.value;

    this.http.post('http://localhost:8080/rh/employee', formData)
  .pipe(
    catchError(error => {
      console.log(error);
      return of(error);
    })
  )
  .subscribe(response => {
    console.log(response);
    // Handle the response, such as displaying a success message
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
  onCountryChange(countryShotName: string) {
    this.states = this.cvCandidatService.getStatesByCountry(countryShotName);
  }
}

