 import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionCategory } from 'app/shared/models/QuestionCategory';
import { QuestionType } from 'app/shared/models/QuestionType';
import { entretienRecrutmentService } from '../../entretienRecrutment.service';


   
   @Component({
     selector: 'app-popup',
     templateUrl: './questionnaire-popup.component.html',
     //styleUrls: ['./questionnaire-popup.component.css']
   })
   export class questionnairePopupComponent {
   
     @Output() filtersSelected = new EventEmitter<any>();
     questionCategory:QuestionCategory[];
     questionType:QuestionType[];
     selectedQuestionType: number;
     selectedQuestionCategory: number;
     questionTypes: QuestionType[]; // Replace 'any' with the appropriate type for question types


     constructor(
       public dialogRef: MatDialogRef<questionnairePopupComponent>,
       @Inject(MAT_DIALOG_DATA) public data: any,
        private service:entretienRecrutmentService ) {
       // ...
     }
     ngOnInit(){
      this.getCategoryTypes();
      this.getCategoryNames();
     }
   
     getCategoryNames() {
      this.service.getAllQuestionCategories().subscribe(
        ( questionCategory: QuestionCategory[]) => {
          this.questionCategory = questionCategory;
        }
      );
      console.log(this.questionCategory);
    }

    getCategoryTypes() {
      this.service.getAllQuestiontypes().subscribe(
        ( questionType: QuestionType[]) => {
          this.questionType = questionType
        }
      );
      console.log(this.questionType);
    }
  
/*    getCategoryTypes() {
      this.service.getAllQuestiontypes().subscribe(
        ( questionType: QuestionType[]) => {
          this.questionType = questionType
        }
      );
      console.log(this.questionType);
    }
    */
    closeDialog(): void {
       this.filtersSelected.emit({
         questionType: this.selectedQuestionType,
         questionCategory: this.selectedQuestionCategory
       });
     }

     
   }
   