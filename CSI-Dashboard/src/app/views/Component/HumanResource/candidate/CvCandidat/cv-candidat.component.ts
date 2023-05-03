import { Experience } from 'app/shared/models/Experience';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Employee, MaritalSituation } from '../../../../../shared/models/Employee';
import {  Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Fruit } from 'assets/examples/material/input-chip/input-chip.component';
import { CompanyStatus, LegalStatus, Provenance, Country } from 'app/shared/models/Partner';
import {  Civility, Service } from 'app/shared/models/contact';
import { WorkField, Availability, RequirementStatus, RequirementType } from 'app/shared/models/req';
import { Title } from 'app/shared/models/Employee';
import { CvCandidatService } from './cv-candidat.service';
import { LanguageLevel, Languages } from 'app/shared/models/Language';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-basic-form',
  templateUrl: './cv-candidat.component.html',
  styleUrls: ['./cv-candidat.component.scss'],
})


export class cvcandidatComponent implements OnInit {
  formData = {}
  console = console;
  repeatForm: FormGroup;
  myForm: FormGroup;
  techFileForm: FormGroup;
  cvForm: FormGroup;
  step1:FormGroup;
  step2:FormGroup;
  step3:FormGroup;
  step4:FormGroup;
  stepIG:FormGroup;
  stepTechFile:FormGroup;
  stepOffres:FormGroup;
  lastEmployee: Employee;
  selectedEmplyee= {firstName :'', id:null};
  selectedTechFile= { id:null};
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
  employee: Employee;
  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];
  isPageReloaded = false;
  
 constructor(private _formBuilder: FormBuilder,
  private cvCandidatService: CvCandidatService,
  private formBuilder: FormBuilder,
  private router:Router,
   private http: HttpClient)
   {  this.countries = this.cvCandidatService.getCountries();}


  ngOnInit() {
    this.repeatForm= new FormGroup({
      repeatArray: new FormArray([])
    });
   this.cvCandidatService.getLastEmployee().subscribe(employee => {
      this.lastEmployee = employee;
    });

  
    this.myForm = new UntypedFormGroup({
      firstName: new UntypedFormControl('', [
        //Validators.required,
        //Validators.minLength(2),
        //Validators.maxLength(15),
        //this.capitalLetterValidator
      ]),
      lastName: new UntypedFormControl('', [
       // Validators.required,
       // Validators.minLength(2),
       // Validators.maxLength(20),
        //this.capitalLetterValidator
      ]),
      birthDate: new UntypedFormControl('', ),
      title: new UntypedFormControl('', ),
     /* address: new UntypedFormControl(''),
      emailOne: new UntypedFormControl('', ),
      phoneNumberOne: new UntypedFormControl('', ),
      civility: new UntypedFormControl('', []),
      maritalSituation: new UntypedFormControl('', []),
      country: new UntypedFormControl('', ),
     /* city: new UntypedFormControl('', []),
      postCode: new UntypedFormControl('', []),
      emailTwo: new UntypedFormControl('', ),
      phoneNumberTwo: new UntypedFormControl('', []),*/

    })
      this.cvForm = new UntypedFormGroup({
      institution: new UntypedFormControl('', []),
      diploma: new UntypedFormControl('', []),
      score: new UntypedFormControl('', []),
      startYear: new UntypedFormControl('', []),
      obtainedDate: new UntypedFormControl('', []),
      actualEmployment : new UntypedFormControl('',[]),
      experienceCompany: new UntypedFormControl('', []),
      experiencePost: new UntypedFormControl('', []),
      experienceTitle: new UntypedFormControl('', []),
      experienceRole : new UntypedFormControl('', []),
      experienceStartYear: new UntypedFormControl('', []),
      experienceStartMonth: new UntypedFormControl('', []),
      experienceEndYear: new UntypedFormControl('', []),
      experienceEndMonth: new UntypedFormControl('', []),
      technology: new UntypedFormControl('', []),
      certification: new UntypedFormControl('', []),
      certifDate: new UntypedFormControl('', []),
     // language: new UntypedFormControl('', []),
      //languageLevel: new UntypedFormControl('', []),
      additionalInformation: new UntypedFormControl('', []),
      skillTitle : new UntypedFormControl('', []),
      skillCategoryTitle: new UntypedFormControl('', []),
    })

      this.techFileForm = new UntypedFormGroup({
      reference: new UntypedFormControl('', []),
      description: new UntypedFormControl('', []),
      objective: new UntypedFormControl('', []),
      //driverLicense: new UntypedFormControl('', []),
      //nationality: new UntypedFormControl('', []),
    })


    /////FormDuplicate///
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
   
  }

  /////Make first letter capital//////
  capitalLetterValidator(control: FormControl): { [key: string]: boolean } | null {
    const firstLetter = control.value.charAt(0);
    if (firstLetter && firstLetter !== firstLetter.toUpperCase()) {
      return { 'capitalLetter': true };
    }
    return null;
  }

  /*ngAfterViewInit() {
    if (!this.isPageReloaded) {
      this.isPageReloaded = true;
      window.location.reload();
    }
  }*/


  saveCandidate(): void {
    console.log('Submitting form...');
  //  if (this.myForm.valid) {
      console.log('Form is valid, submitting...');
      this.cvCandidatService.addItem(this.myForm.value).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          this.selectedEmplyee = res;
          console.log('Selected candidat ID:', this.selectedEmplyee.id);
          console.log('Form value', this.myForm.value);
          this.submitted = true;
        },
        error: (e) => console.error('Error adding item', e)
      });
    }

    saveTechFile(): void {
      console.log('Submitting form...');
      this.cvCandidatService.addTechFile({...this.techFileForm.value, employeeId:this.selectedEmplyee.id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          this.selectedTechFile = res;
          console.log('Selected technical file ID:', this.selectedTechFile.id);
         console.log('Form value', this.techFileForm.value);
          this.submitted = true;
        },
        error: (e) => {
          console.error('Error adding item', e);
          console.log('Form is invalid');
          console.log(this.techFileForm.errors);
        }
      });
    }
  

    saveFormation(): void {
      console.log('Submitting cv form...');
      this.cvCandidatService.addEducation({...this.cvForm.value, technicalFileId:this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },   
        error: (e) => {
          console.error('Error adding item', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
    }

    saveExperience(): void {
      console.log('Submitting cv form...');
      this.cvCandidatService.addExperience({...this.cvForm.value, technicalFileId:this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },   
        error: (e) => {
          console.error('Error adding item', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
    }



    saveRest(): void {
      console.log('Submitting cv form...');
    
      // Save language
      this.cvCandidatService.addLanguage({...this.cvForm.value, technicalFileId: this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('Language added successfully', res);
          console.log('Form value', this.cvForm.value);
        },
        error: (e) => {
          console.error('Error adding Language', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
    
      // Save certif
      this.cvCandidatService.addCertif({...this.cvForm.value, technicalFileId: this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('certif added successfully', res);
          console.log('Form value', this.cvForm.value);
        },
        error: (e) => {
          console.error('Error adding certif', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
    
      // Save skills
      this.cvCandidatService.addSkill({...this.cvForm.value, technicalFileId: this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('skill added successfully', res);
          console.log('Form value', this.cvForm.value);
        },
        error: (e) => {
          console.error('Error adding skill', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
      // Save skills category
      this.cvCandidatService.addSkillCategory({...this.cvForm.value, technicalFileId: this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('skill cat added successfully', res);
          console.log('Form value', this.cvForm.value);
        },
        error: (e) => {
          console.error('Error adding skill cat', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
    }
    


/*
  saveTechFile(): void {
    console.log('saveTechFile() called');
    if (this.techFileForm.valid) {
      console.log('Form is valid, submitting...');
      this.cvCandidatService.addTechFile(this.techFileForm.value).subscribe({
        next: (res) => {
          this.submitted = true;
          // Retrieve the last added employee
          this.cvCandidatService.getLastEmployee().subscribe(employee => {
            this.lastEmployee = employee;
          });
        },

        error: (err) => {
          console.error('Error adding item', err);
        }
      });
    }
  }
  */


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
    const formData = this.myForm.value;
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
    institution: new UntypedFormControl('', []),
      diploma: new UntypedFormControl('', []),
      score: new UntypedFormControl('', []),
      startYear: new UntypedFormControl('', []),
      obtainedDate: new UntypedFormControl('', []),
      actual : new UntypedFormControl('',[])
  });
}


get repeatFormGroup() : FormArray {
  return this.repeatForm.get('repeatArray') as FormArray;
}

handleAddRepeatForm() {
  this.repeatFormGroup.push(this.createRepeatForm());
}

handleRemoveRepeatForm(index: number) {
  this.repeatFormGroup.removeAt(index);
 /* if (index > 0) { // check if the index is greater than 0
    const repeatArray = this.repeatForm.get('repeatArray') as FormArray;
    repeatArray.removeAt(index);
}*/
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