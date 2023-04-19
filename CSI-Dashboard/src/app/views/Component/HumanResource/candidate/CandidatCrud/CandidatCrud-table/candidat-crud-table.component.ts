import { CrudService } from './../candidat-crud.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { NgxTablePopupComponent } from 'app/views/cruds/crud-ngx-table/ngx-table-popup/ngx-table-popup.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Fruit } from 'assets/examples/material/input-chip/input-chip.component';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CompanyStatus, Country } from 'app/shared/models/Partner';
import { Civility, Employee, EmployeeStatus, MaritalSituation, Provenance, Title } from 'app/shared/models/Employee';
import { Service } from 'app/shared/models/contact';
import { LanguageLevel, Languages } from 'app/shared/models/Language';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-candidat-crud',
  templateUrl: './candidat-crud-table.component.html'
})


export class CandidatCrudTableComponent implements OnInit {
  formData = {}
  console = console;
  repeatForm: FormGroup;
  myForm: FormGroup;
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
 
  Provenance = Object.values(Provenance);
  countries: Country[];
  states: string[];
  selectedFile: File;
  title :string[]= Object.values(Title);
  Civility :string []= Object.values(Civility);
  MaritalSituation :string []= Object.values(MaritalSituation);
  EmployeeStatus :any= Object.values(EmployeeStatus);
  formWidth = 200; //declare and initialize formWidth property
  formHeight = 700; //declare and initialize formHeight property
  

  Languages : string[] = Object.values(Languages);
  LanguageLevel : string[] = Object.values(LanguageLevel);

  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public dataSource: any;
  public displayedColumns: any;
  public getItemSub: Subscription;
  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private router: Router
  ) { }
   

  goToCV() {
    this.router.navigate(['cvCandidat/cvCandidat-crud']);
  }

  openAffichage() {
    this.router.navigate(['template1/cvtemplate1']);
  }

  ngOnInit() {
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems()
    this.myForm = new UntypedFormGroup({
      firstName: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      lastName: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(9)
      ]),
      birthDate: new UntypedFormControl('', [Validators.required]),
      /*country: new UntypedFormControl('', [Validators.required]),*/
      title: new UntypedFormControl('', []),
       address: new UntypedFormControl(''),
      emailOne: new UntypedFormControl('', [Validators.required, Validators.email]),
      phoneNumberOne: new UntypedFormControl('', [Validators.required]),
     civility: new UntypedFormControl('', []),
       maritalSituation: new UntypedFormControl('', []),
     /* city: new UntypedFormControl('', []),
      postCode: new UntypedFormControl('', []),*/
      emailTwo: new UntypedFormControl('', [ Validators.email]),
      phoneNumberTwo: new UntypedFormControl('', []),
     /* institution: new UntypedFormControl('', []),
      diploma: new UntypedFormControl('', []),
      score: new UntypedFormControl('', []),
      educationStartYear: new UntypedFormControl('', []),
      obtainedYear: new UntypedFormControl('', []),
      experienceCompany: new UntypedFormControl('', []),
      experiencePost: new UntypedFormControl('', []),
      experienceTitle: new UntypedFormControl('', []),
      experienceRole : new UntypedFormControl('', []),
      experienceStartYear: new UntypedFormControl('', []),
      experienceStartMonth: new UntypedFormControl('', []),
      experienceEndYear: new UntypedFormControl('', []),
      experienceEndMonth: new UntypedFormControl('', []),
      certification: new UntypedFormControl('', []),
      certifDate: new UntypedFormControl('', []),
      language: new UntypedFormControl('', []),
      languageLevel: new UntypedFormControl('', []),
      additionalInformation: new UntypedFormControl('', []),
      skillTitle : new UntypedFormControl('', []),
      skillCategoryTitle: new UntypedFormControl('', []),*/

    })
  
    this.repeatForm = this._formBuilder.group({
      repeatArray: this._formBuilder.array([this.createRepeatForm()])
    });

    /////Countries////
    this.itemForm.get("country").valueChanges.subscribe((country) => {
      this.itemForm.get("city").reset();
      if (country) {
        this.states = this.crudService.getStatesByCountry(country);
   
      }
    });
  }
  getDisplayedColumns() {
    return ['firstName', 'lastName', 'title',  'status', 'actions'];
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }

  getItems() {    
    this.getItemSub = this.crudService.getItems()
      .subscribe((data:any)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }

  
  deleteCandidate(row) {
    this.confirmService.confirm({message: `Delete ${row.firstName}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('Supprission du candidat');
          this.crudService.deleteItem(row.id)
            .subscribe((data:any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('candidat supprimé!', 'OK', { duration: 20});
              this.getItems();
            })
        }
      })
  }
add(){
  this.router.navigateByUrl('cvCandidat/cvCandidat-crud');
}
  applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
 
 }
 /* updateCandidate(): void {
  console.log('updateCandidate() called');
  this.router.navigate(['updateCandidat/updateCandidate']);
  if (this.myForm.valid) {
    console.log('Form is valid, updating...');
    const id = this.myForm.get('id').value; // replace 'id' with the name of the field containing the employee id in your form
    this.crudService.updateItem(id, this.myForm.value).subscribe({
      next: (res) => {
        console.log('Item updated successfully', res);
        console.log('Form value', this.myForm.value);
        this.submitted = true;
        console.log(this.myForm.get("firstName"))
        console.log(this.myForm.get("lastName"))
        console.log(this.myForm.get("country"))
        console.log(this.myForm.get("title"))
        console.log(this.myForm.get("adress"))
        console.log(this.myForm.get("birthDate"))
        console.log(this.myForm.get("emailOne"))
        console.log(this.myForm.get("emailtwo"))
        console.log(this.myForm.get("phoneNumberOne"))
        console.log(this.myForm.get("civility"))
        console.log(this.myForm.get("maritalSituation"))
        // Redirect to CandidatCrud-table page
        this.router.navigate(['candidatCrud/CandidatCrud-table']);
      },
      error: (err) => {
        console.error('Error updating item', err);
      }
    });
  }
}*/

 
/*moreAboutItem(itemId: number) {
    // Open menu and listen for menu item selection
  }

  handleMenuItemSelection(menuItem: string, itemId: number) {
    // Redirect to appropriate interface based on menu item selection
    if (menuItem === 'requirement') {
      this.router.navigate(['/requirements', itemId]);
    } else if (menuItem === 'contacts') {
      this.router.navigate(['/contacts', itemId]);
    }
  }*/
  createRepeatForm(): FormGroup {
    return this._formBuilder.group({
    });
  }
}
