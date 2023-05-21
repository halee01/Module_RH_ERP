import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Question } from 'app/shared/models/Question';
import { referentielService } from '../referentiel.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'questionUpdate',
    templateUrl: 'questionUpdate.component.html',
  })


  export class questionUpdateComponent {
    
    questionForm:FormGroup;
    updatedQuestion: string;

  constructor(
    public dialogRef: MatDialogRef<questionUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { this.updatedQuestion = data.question; }



  onCancel(): void {
    this.dialogRef.close();
  }

  
 /* onUpdate(): void {
    this.dialogRef.close(this.updatedQuestion);
  }*/

  onUpdate(): void {
    this.questionForm = new UntypedFormGroup({
      question: new UntypedFormControl(this.updatedQuestion, [Validators.required]),
    });
  
    if (this.questionForm.valid) {
      this.dialogRef.close(this.questionForm.value);
    } 
  }
  
  }