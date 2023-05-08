import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {MatDialogModule} from '@angular/material/dialog';

@Component({
    selector: 'my-dialog',
    template: `
      <h1 mat-dialog-title>Hi {{data.name}}</h1>
<div mat-dialog-content>
  <p>What's your favorite animal?</p>
  <mat-form-field appearance="fill">
    <mat-label>Favorite Animal</mat-label>
    <input matInput [(ngModel)]="data.animal">
  </mat-form-field>
</div>
<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No Thanks</button>
  <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
</div>
  `,
  })
  export class CvCandidatfirstPopupComponent {
  
    constructor(public dialogRef: MatDialogRef<CvCandidatfirstPopupComponent>) { }
    close(): void {
      this.dialogRef.close();
    }
  }