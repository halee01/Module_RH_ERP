import { MatChipsModule } from '@angular/material/chips';
import { candidatAffichageComponent } from './candidatAffichage.component';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import {   MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatStepperModule } from '@angular/material/stepper';
import { candidatAffichage } from './candidatAffichage.routing';
import { candidatAffichageService } from './candidatAffichage.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatDialogModule,
    MatChipsModule,
    
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FlexLayoutModule,
    ColorPickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forChild(candidatAffichage)
  ],
  providers: [candidatAffichageService],
  // entryComponents: [CalendarFormDialogComponent],
  declarations: [
     candidatAffichageComponent
    
  ]
})
export class candidatAffichageModule { }
