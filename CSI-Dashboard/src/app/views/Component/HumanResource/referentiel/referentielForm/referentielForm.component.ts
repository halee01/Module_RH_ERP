import { referentielRoutes } from './../referentiel.routing';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Civility, MaritalSituation, Provenance, Title } from 'app/shared/models/Employee';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { referentielService } from '../referentiel.service';
import { QuestionCategory } from 'app/shared/models/QuestionCategory';
import { ExperienceLevel } from 'app/shared/models/AssOfferCandidate';

@Component({
  selector: 'referentiel-crud',
  templateUrl: './referentielForm.component.html',
  styleUrls:  ['./referentielForm.component.scss']

})


export class referentielFormComponent implements OnInit {
form:FormGroup;
questionCategory:QuestionCategory;
level = Object.values(ExperienceLevel);
showSecondForm = false;
constructor(){

}
ngOnInit(): void {

 
}


submitFirstForm() {
  this.form = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    level: new UntypedFormControl('', [Validators.required]),
  })
  this.showSecondForm = true;
}


ExperienceLevelMap= {
 [ExperienceLevel.JUNIOR]:'Junior',
 [ExperienceLevel.MID_LEVEL]:'Confirmé',
 [ExperienceLevel.SENIOR]:'Senior',
 [ExperienceLevel.EXPERT]:'Expert',
};


 
}
