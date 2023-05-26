/* import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ExperienceLevel } from 'app/shared/models/AssOfferCandidate';
import { QuestionCategory, QuestionnaireType } from 'app/shared/models/QuestionCategory';
import { QuestionType } from 'app/shared/models/QuestionType';
import { entretienRecrutmentService } from '../../entretienRecrutment.service';

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'questionnaire-popup.component.html',
  })

  export class QuestionnairePopupComponent {
    submitted = false;
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    formWidth = 900; //declare and initialize formWidth property
    questionnaireForm:FormGroup;
    questionCategory:QuestionCategory;
    level = Object.values(ExperienceLevel);
    questionnaireType = Object.values(QuestionnaireType);
    questionTypes: QuestionType[] = [];
    selectedQuestionType: QuestionType | null = null;
    selectedFile: File;

    constructor( 
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public MatDialogRef: MatDialogRef<QuestionnairePopupComponent>,
      private fb: FormBuilder, 
      private http: HttpClient,
      private crudService:entretienRecrutmentService,
    ) { }

    ngOnInit(): void {

        this.questionnaireForm = new UntypedFormGroup({
          name: new UntypedFormControl('', [Validators.required]),
          level: new UntypedFormControl('', [Validators.required]),
          questionTypeName: new UntypedFormControl('', [Validators.required])
        });
      //  this.getQuestionTypes();}



  //  questionTypeNames: string[] = this.questionTypes.map((questionType: QuestionType) => questionType.questionTypeName);

   /* getQuestionTypes() {
        this.crudService.getAllQuestiontypes().subscribe(
          (questionTypes: QuestionType[]) => {
            this.questionTypes = questionTypes;
          },
          (error) => {
            // Handle error if necessary
          }
        );
      }

      onSelectQuestionType(questionType: QuestionType) {
        this.selectedQuestionType = questionType;
      }*/

   // }} 

   import { Component, EventEmitter, Inject, Output } from '@angular/core';
   import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionCategory } from 'app/shared/models/QuestionCategory';
import { QuestionType } from 'app/shared/models/QuestionType';
   
   @Component({
     selector: 'app-popup',
     templateUrl: './questionnaire-popup.component.html',
     //styleUrls: ['./questionnaire-popup.component.css']
   })
   export class questionnairePopupComponent {
   
     @Output() filtersSelected = new EventEmitter<any>();
     questionCategory:QuestionCategory;
     selectedQuestionType: number;
     selectedQuestionCategory: number;
     questionTypes: QuestionType[]; // Replace 'any' with the appropriate type for question types
     constructor(
       public dialogRef: MatDialogRef<questionnairePopupComponent>,
       @Inject(MAT_DIALOG_DATA) public data: any
     ) {
       // ...
     }
   
     closeDialog(): void {
       this.filtersSelected.emit({
         questionType: this.selectedQuestionType,
         questionCategory: this.selectedQuestionCategory
       });
     }
   }
   