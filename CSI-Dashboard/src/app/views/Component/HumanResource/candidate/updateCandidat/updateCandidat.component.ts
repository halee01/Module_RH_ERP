
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {  Employee, MaritalSituation } from '../../../../../shared/models/Employee';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormArray } from '@angular/forms'; 
import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Privilege, Civility, Service } from 'app/shared/models/contact';
import { Title } from 'app/shared/models/Employee';

import { LanguageLevel, Languages } from 'app/shared/models/Language';
import { Subscription, catchError, of } from 'rxjs';
import { updateCandidatService } from './updateCandidat.service';
import { Skills } from 'app/shared/models/Skills';
import { Offer } from 'app/shared/models/Offer';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Language } from 'highlight.js';
import { TechnicalFile } from 'app/shared/models/TechnicalFile';
import { Certification } from 'app/shared/models/Certification';
import { Experience } from 'app/shared/models/Experience';
import { AssOfferCandidate } from 'app/shared/models/AssOfferCandidate';
import { Education } from 'app/shared/models/Education';
import { employeePopupComponent } from './updateEmployeePopup/employee-popup.component';


@Component({
  selector: 'update-form',
  templateUrl: './updateCandidat.component.html',
  styleUrls: ['./updateCandidat.component.css'],
  
})
 
export class updatecandidatComponent implements OnInit {
  
  popup: MatDialogRef<any>;
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
loader: any;
snack: any;
  employee: Employee;
  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  skills: Skills[] = [];
  offers: Offer[];
  isPageReloaded = false;
  public emplyeeDataSource: any;
  public dataSource: any;

  public displayedColumns: any;
  public getItemSub: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property
  cvHtml = '';
  id: number
  idTechnicalFile:number
  education : Education 
  language: Language
  technicalFile: TechnicalFile
  certification : Certification
  experience : Experience
  candidature : AssOfferCandidate
  private router: Router
  itemForm: any;
  states: any;



 constructor(private _formBuilder: FormBuilder,
  private route:ActivatedRoute,
  private updateCandidatService: updateCandidatService,
  private formBuilder: FormBuilder,
  private http:HttpClient,
  //public dialogRef: MatDialogRef<employeePopupComponent>,
  private dialog: MatDialog
   ) 
   {  

    this.emplyeeDataSource = new MatTableDataSource<Employee>([]);

  }


  ////////////////////Ajout Candidat///////////////
  
  
  

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getemployee();
   console.log(this.id);
   this.getTechnicalFile();
   this.getEducation();
   this.getExperience();
   this.getCertification();
   this.getlanguage();
   this.getSkills();
   this.getCandidature();
   this.displayedColumns = this.getExperienceDisplayedColumns();
    this.getExperience();
   /*const cv = document.getElementById('CV');
    if (cv) {
      this.cvHtml = cv.innerHTML;
    }*/
    
    this.updateCandidatService.getOfferItems().subscribe(
      offers => this.offers = offers,
      error => console.log(error)
    );

    
    this.displayedColumns = this.getDisplayedColumns();
    this.getOfferItems()
    this.repeatForm= new FormGroup({
      repeatArray: new FormArray([])
    });
   this.updateCandidatService.getLastEmployee().subscribe(employee => {
      this.lastEmployee = employee;
    });

  
    this.myForm = new UntypedFormGroup({
      firstName: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        this.capitalLetterValidator
      ]),
      lastName: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        this.capitalLetterValidator
      ]),
      birthDate: new UntypedFormControl('', ),
      title: new UntypedFormControl('', ),
      address: new UntypedFormControl(''),
      emailOne: new UntypedFormControl('',[] ),
      phoneNumberOne: new UntypedFormControl('', []),
      civility: new UntypedFormControl('', []),
      maritalSituation: new UntypedFormControl('', []),
      //country: new UntypedFormControl('', ),
      //city: new UntypedFormControl('', []),
      postCode: new UntypedFormControl('', []),
      emailTwo: new UntypedFormControl('', ),
      phoneNumberTwo: new UntypedFormControl('', [])

    })
      this.cvForm = new UntypedFormGroup({
      institution: new UntypedFormControl('', []),
      diploma: new UntypedFormControl('', []),
      score: new UntypedFormControl('', []),
      startYear: new UntypedFormControl('', []),
      obtainedDate: new UntypedFormControl('', []),
      actual: new UntypedFormControl(false),
      actualEmployment :new UntypedFormControl(false),
      experienceCompany: new UntypedFormControl('', []),
      experiencePost: new UntypedFormControl('', []),
      experienceTitle: new UntypedFormControl('', []),
      experienceRole : new UntypedFormControl('', []),
      experienceStartDate: new UntypedFormControl('', []),
      experienceEndDate: new UntypedFormControl('', []),
      technology: new UntypedFormControl('', []),
      certificationTitle: new UntypedFormControl('', []),
      certificationObtainedDate: new UntypedFormControl('', []),
      language: new UntypedFormControl('', []),
      languageLevel: new UntypedFormControl('', []),
      additionalInformation: new UntypedFormControl('', []),
      skillTitle : new UntypedFormControl('', []),
      skillCategoryTitle: new UntypedFormControl('', []),
    })

      this.techFileForm = new UntypedFormGroup({
      reference: new UntypedFormControl('', []),
      description: new UntypedFormControl('', []),
      objective: new UntypedFormControl('', []),
      driverLicense: new UntypedFormControl('', []),
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
        this.states = this.updateCandidatService.getStatesByCountry(country);
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
  getExperienceDisplayedColumns() {
    return ['experienceTitle', 'experiencePost', 'experienceCompany'];
  }


  /*ngAfterViewInit() {
    if (!this.isPageReloaded) {
      this.isPageReloaded = true;
      window.location.reload();
    }
  }*/


  updateCandidate(): void {
    console.log('Submitting form...');
  //  if (this.myForm.valid) {
      console.log('Form is valid, submitting...');
      this.updateCandidatService.updateEmployee(this.myForm.value,this.employee).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
          
          console.log('Form value', this.myForm.value);
          this.submitted = true;
        },
        error: (e) => console.error('Error adding item', e)
      });
    }

    saveTechFile(): void {
      console.log('Submitting form...');
      this.updateCandidatService.addTechFile({...this.techFileForm.value, employeeId:this.selectedEmplyee.id}).subscribe({
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
  

    /*saveFormation(): void {
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
    }*/

    /*saveExperience(): void {
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
    }*/




    saveCertif(): void {
      console.log('Submitting cv form...');
      this.updateCandidatService.addCertif({...this.cvForm.value, technicalFileId:this.selectedTechFile.id}).subscribe({
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
         
      //Save Formation 
      this.updateCandidatService.addEducation({...this.cvForm.value, technicalFileId:this.selectedTechFile.id}).subscribe({
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

      // Save Expérience 
      this.updateCandidatService.addExperience({...this.cvForm.value, technicalFileId:this.selectedTechFile.id}).subscribe({
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

      // Save language
      this.updateCandidatService.addLanguage({...this.cvForm.value, technicalFileId: this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('Language added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },
        error: (e) => {
          console.error('Error adding Language', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
    
      // Save certif
      this.updateCandidatService.addCertif({...this.cvForm.value, technicalFileId: this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('certif added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },
        error: (e) => {
          console.error('Error adding certif', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });

    
      // Save skills
      this.updateCandidatService.addSkill({...this.cvForm.value, technicalFileId:this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('skill added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },   
        error: (e) => {
          console.error('Error adding skill', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });


      // Save skills category
      this.updateCandidatService.addSkillCategory({...this.cvForm.value, technicalFileId: this.selectedTechFile.id}).subscribe({
        next: (res) => {
          console.log('skill cat added successfully', res);
          console.log('Form value', this.cvForm.value);
          this.submitted = true;
        },
        error: (e) => {
          console.error('Error adding skill cat', e);
          console.log('cv Form is invalid');
          console.log(this.cvForm.errors);
        }
      });
    }
    




  public confirmer(){}
   ///////Skills chips//////////
   add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add skill
    if ((value || '').trim()) {
      this.skills.push({skillsTitle: value.trim()});
      this.cvForm.controls['skillTitle'].setValue(this.skills);// update the form control with the new skills array
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  // Remove skill
  remove(skill: Skills): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
      this.cvForm.controls['skillTitle'].setValue(this.skills); // update the form control with the new skills array
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
    this.states = this.updateCandidatService.getStatesByCountry(countryShotName);
   
  }
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  
  getOfferItems() {    
    this.getItemSub = this.updateCandidatService.getOfferItems()
      .subscribe((data:any)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }
  getDisplayedColumns() {
    return ['reference','title','actions' ];
  }

  ///------------partiedetails-----------/////////////////////

  getemployee() {
    this.updateCandidatService.getItemById(this.id).subscribe((data: any) => {
      this.employee = data;

    });
  }
  getTechnicalFile() {
    this.updateCandidatService.getTechnicalFileById(this.id).subscribe((data: any) => {
      this.technicalFile = data;

    });
  }
  getEducation() {
    this.updateCandidatService.getEducationById(this.id).subscribe((data: any) => {
      this.education = data;
      console.log(this.education);
    });
  }
  getExperience(){
    this.updateCandidatService.getExperienceById(this.id).subscribe((data : any)=>{
      this.experience = data;
      console.log(this.experience);
    })
  }
  getCertification(){
    this.updateCandidatService.getCertificationById(this.id).subscribe((data : any)=>{
      this.certification = data;
      console.log(this.certification);
    })
  }
  getlanguage(){
    this.updateCandidatService.getLanguageById(this.id).subscribe((data : any)=>{
      this.language = data;
      console.log(this.language);
    })
  }
  getSkills(){
    this.updateCandidatService.getSkillsById(this.id).subscribe((data : any)=>{
      this.skills = data;
      console.log(this.skills);
    })
  }
  getCandidature(){
    this.updateCandidatService.getCandiatureById(this.id).subscribe((data : any)=>{
      this.candidature =data;
      console.log(this.candidature);
    })
  }

  openEvaluationCandidat(){
    this.router.navigate(['CandidatEvaluation/evaluationCandidat'])
  }

  employeeTitleMap = {
    [Title.FRONT_END_DEVELOPER]: 'Développeur Front-End',
    [Title.BACK_END_DEVELOPER]: 'Développeur Back-End',
    [Title.FULLSTACK_DEVELOPER]: 'Développeur Full-Stack',
    [Title.CRM]: 'CRM',
    [Title.HUMAN_RESOURCE_MANAGER]: 'Responsable des Ressources Humaines',
    [Title.HUMAN_RESOURCE]: 'Ressources Humaines',
    [Title.PROJECT_MANAGER]: 'Chef de Projet',
    [Title.UI_UX_DESIGNER]: 'Concepteur UI/UX',
    [Title.QA_ENGINEER]: 'Ingénieur QA',
    [Title.DEVOPS_ENGINEER]: 'Ingénieur DevOps',
    [Title.WEB_DEVELOPER]: 'Développeur Web',
    [Title.OFFICE_MANAGER]: 'Responsable d Agence',
    [Title.ACCOUNTANT]: 'Comptable',
    [Title.SALES_REPRESENTATIVE]: 'Représentant Commercial',
    [Title.CUSTOMER_SUPPORT_SPECIALIST]: 'Spécialiste du Support Client',
    [Title.MARKETING_COORDINATOR]: 'Coordinateur Marketing'
    
  };

  maritalSituationMap = {
    [MaritalSituation.SINGLE]:'Célibatire',
    [MaritalSituation.MARRIED]:'Marrié',
   [MaritalSituation.DIVORCED]:'Divorvé',
   [MaritalSituation.WIDOWED] :'Veuf/Veuve',
   [MaritalSituation.COMPLICATED] :'Compliqué'
  };
  
  civilityMap = {
    [Civility.MRS]:'Mme',
    [Civility.MS]:'Mlle',
   [Civility.MR]:'Mr'
  };

  LanguageLevelMap = {
    [LanguageLevel.BEGINNER_A1]: 'Niveau Débutant A1',
    [LanguageLevel.BEGINNER]: 'Niveau Débutant',
    [LanguageLevel.ELEMENTARY_A2]: 'Niveau Elémentaire A2',
    [LanguageLevel.BASIC]: 'Niveau de Base',
    [LanguageLevel.INTERMEDIATE_B1]: 'Niveau Intermédiaire B1',
    [LanguageLevel.INTERMEDIATE]: 'Niveau Intermédiaire',
    [LanguageLevel.UPPER_INTERMEDIATE_B2]: 'Niveau Intermédiaire Supérieur B2',
    [LanguageLevel.PROFESSIONAL]: 'Niveau Professionnel',
    [LanguageLevel.ADVANCED_C1]: 'Niveau Avancé C1',
    [LanguageLevel.FLUENT]: 'Courant',
    [LanguageLevel.PROFICIENT_C2]: 'Niveau Expert C2',
    [LanguageLevel.NATIVE_LANGUAGE]: 'Langue Maternelle',
    [LanguageLevel.BILINGUAL]: 'Bilingue'
  };
///////////-------updatePopup------------///////////////
getItems() {    
  this.getItemSub = this.updateCandidatService.getItems()
    .subscribe((data:any)  => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

}


/*openPopUp6(data: any = {} , isNew?) {
  let title = isNew ? 'Ajouter compte bancaire' : 'Modifier compte bancaire';
  let dialogRef: MatDialogRef<any> = this.dialog.open(employeePopupComponent, {
    width: '1000px',
    disableClose: true,
    data: { title: title, payload: data , employeeId: this.employee.id}
  })
  dialogRef.afterClosed()
    .subscribe(res => {
      if(!res) {
        // If user press cancel
        return;
      }
     
        this.loader.open('modification en cours');
        console.log(data.id)
        this.updateCandidatService.updateItem( this.id, res)
          .subscribe((data:any) => {
            this.emplyeeDataSource = data ;
            this.loader.close();
            this.snack.open('Compte bancaire modifié avec succés!', 'OK', { duration: 2000 });
            this.getItems();
          })
       
    })
}*/
openPopUpEmployee(data: any = {}) {
  const title = 'Modifier compte bancaire';
  const dialogRef: MatDialogRef<any> = this.dialog.open(employeePopupComponent, {
    width: '1000px',
    disableClose: true,
    data: { title: title, payload: data }
  });

  dialogRef.afterClosed().subscribe(res => {
    if (res) {
      const updatedData = { ...data, ...res };
      this.updateCandidatService.updateEmployee(data.id, res).subscribe(
        (response) => {
          console.log('Item updated successfully', response);
          this.snack.open('Compte bancaire modifié avec succès!', 'OK', { duration: 2000 });
          this.getItems();
        },
        (error) => {
          console.error('Error updating item', error);
          this.snack.open('Une erreur est survenue lors de la modification du compte bancaire.', 'OK', { duration: 2000 });
        }
      );
    }
  });
}

////////*-----------------------------
open(Id: number) {
  // show popup and set employeeId
  Id = this.id; // set employeeId to the desired value
  let dialogRef: MatDialogRef<any> = this.dialog.open(employeePopupComponent) ;
  
    this.updateCandidatService.getItemById(Id).subscribe((data: any) => {
      this.employee = data;

    });
  
}


}

