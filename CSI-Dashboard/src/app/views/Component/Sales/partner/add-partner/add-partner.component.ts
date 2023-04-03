import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatTabGroup, MAT_TAB, MAT_TAB_GROUP } from "@angular/material/tabs";
import { egretAnimations } from "app/shared/animations/egret-animations";
import { CompanyStatus, Country, LegalStatus, Provenance, WorkField } from "app/shared/models/Partner";
import { CrudPartnerService } from "../crudPartner.service";

@Component({
    selector: 'app-add-partner',
   
    templateUrl: './add-partner.component.html',
   
  })
  export class addpartnerComponent implements OnInit{
    public itemForm: FormGroup = new FormGroup({});
    CompanyStatus = Object.values(CompanyStatus);
    WorkField :string []= Object.values(WorkField);
    LegalStatus = Object.values(LegalStatus);
    Provenance = Object.values(Provenance);
    countries: Country[];
    states: string[];
   
    
    constructor(
      
      //@Inject(MAT_TAB) public data: any,
      private partnerService : CrudPartnerService ,
      
      private fb: FormBuilder
     
      ){
      this.countries = this.partnerService.getCountries();
    }
    ngOnInit() {
      this.countries = this.partnerService.getCountries();
     //this.buildItemForm(this.data.payload)
      /*this.itemForm.get("country").valueChanges.subscribe((country) => {
        this.itemForm.get("city").reset();
        if (country) {
          this.states = this.partnerService.getStatesByCountry(country);
     
        }
      });*/
    }
    buildItemForm(item){
      this.itemForm = this.fb.group({
        name : [item.name || '', Validators.required],
        staffNumber : [item.staffNumber || '', Validators.required], 
        parentCompany : [item.parentCompany || '', Validators.required],
        ceoName : [item.ceoName || '', Validators.required],
        //phoneNumber : [item.phoneNumber || '', Validators.required ,],
        //phoneNumberTwo: [item.phoneNumberTwo ||'', Validators.required, ],
        //postCode : [item.postCode || '', Validators.required],
        //city : [item.city || '', Validators.required],
        description : [item.description || '', Validators.required],
        //logo : [item.logo || '', Validators.required],
        activityStartDate : [item.activityStartDate || '', Validators.required],
        partnerShipDate : [item.partnerShipDate || '', Validators.required],
        //companyStatus : [item.companyStatus || '', Validators.required],
        //refPhoneNumber : [item.refPhoneNumber || '', Validators.required ,],
        //country : [item.country || '', Validators.required],
        workField : [item.workField || '', Validators.required],
        //legalStatus : [item.legalStatus || '', Validators.required],
        //provenance : [item.provenance || '', Validators.required],
  
        
    
        
      });
  
    }
    submit(){
      const formData = this.itemForm.value;
      this.partnerService.addItem(formData)
        .subscribe(
          response => {
            console.log('Data saved successfully:', response);
            // Reset the form if the data was saved successfully
            this.itemForm.reset();
          },
          error => {
            console.error('Error saving data:', error);
            // Handle the error appropriately
          }
        );
    }
    onCountryChange(countryShotName: string) {
      this.states = this.partnerService.getStatesByCountry(countryShotName);
    }
  }