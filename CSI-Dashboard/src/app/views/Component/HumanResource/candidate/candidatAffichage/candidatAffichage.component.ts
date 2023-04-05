import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormArray } from '@angular/forms'; 
import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
  selector: 'affich-form',
  templateUrl: './candidatAffichage.component.html',
  styleUrls:  ['./candidatAffichage.component.scss']
  
  
})



export class candidatAffichageComponent  {
  
  constructor(private router: Router){}
  @ViewChild('printSection') printSection: ElementRef;
  print() {
    
    window.print();
    
  }


 
}

