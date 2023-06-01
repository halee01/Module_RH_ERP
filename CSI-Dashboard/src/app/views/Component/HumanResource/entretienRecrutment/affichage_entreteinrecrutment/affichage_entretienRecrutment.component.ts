import { id } from 'date-fns/locale';
import { ajoutEntretienPopupComponent } from './add-entretien-pop/addEntretien-popup.component';
import { Interview, InterviewType } from 'app/shared/models/Interview';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormGroup} from '@angular/forms';
import { Employee,} from 'app/shared/models/Employee';
import { entretienRecrutmentService } from '../entretienRecrutment.service';
import { questionnairePopupComponent } from './questionnaire-popup/questionnaire-popup.component';
import { Question } from 'app/shared/models/Question';
import { QuestionType } from 'app/shared/models/QuestionType';
import { EMPTY, Observable, catchError, forkJoin, map } from 'rxjs';
import { InterviewDetailsDialogComponent } from './interviewDetails/interviewDetails-popup.component';

import { Evaluation } from 'app/shared/models/Evaluation';
import { UpdatedQuestion } from 'app/shared/models/UpdatedQuestion';
import { addAdminstrativeDataComponent } from './add-AdsministrativeData-popup/addAdministartiveData-popup.component';

@Component({
  selector: 'app-candidat-crud',
  templateUrl: './affichage_entretienRecrutment.component.html',
  styleUrls: ['./affichage_entretienRecrutment.component.scss'],
})


export class entretienRecrutmentComponent implements OnInit {
  id:number;
  
  employee:Employee;
  interviewType :string []= Object.values(InterviewType);
  evaluation: Evaluation={
    globalAppreciation: 0,
  };
  updatedQuestion:UpdatedQuestion[][];
  interview:Interview;
  questions: Question[];
  questionType:QuestionType[];
  formData = {}
  console = console;
  basicForm: UntypedFormGroup;
  selectedInterviewId: number;



  //Global appreciation chart 

  welcomeProgressChart = {
    series: [this.evaluation.globalAppreciation],
    chartOptions: {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
          bottom: 10,
        },
      },

      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 0,
          hollow: {
            margin: 0,
            size: '60%',
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: true,
              fontSize: '13px',
              fontWeight: '600',
              offsetY: -5,
              color: '#828D99',
            },
            value: {
              color: '#304156',
              fontSize: '24px',
              fontWeight: '600',
              offsetY: -40,
              show: true,
            },
          },
          track: {
            background: '#eee',
            strokeWidth: '100%',
          },
        },
      },
      colors: ['#0081FF', '#eee'],
      stroke: {
        lineCap: 'round',
      },
      labels: ['Note globale'],
      responsive: [
        {
          breakpoint: 767,
          options: {
            chart: {
              offsetX: 0,
              offsetY: 0,
            },
          },
        },
      ],
    },
  };
  studyChart = {
    series: [
      {
        name: 'Angular',
        data: [50, 50, 80, 80, 80, 60, 70],
        type: 'bar',
        itemStyle: {
          barBorderRadius: [0, 0, 10, 10],
        },
        stack: 'one',
      },
      {
        name: 'React',
        data: [70, 80, 90, 100, 70, 80, 65],
        type: 'bar',
        stack: 'one',
      },
      {
        name: 'Javascript',
        data: [65, 80, 70, 100, 90, 70, 55],
        type: 'bar',
        itemStyle: {
          barBorderRadius: [10, 10, 0, 0],
        },
        stack: 'one',
      },
    ],
    chartOptions: {
      chart: {
        type: 'bar',
        height: 300,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: -35,
        itemMargin: {
          horizontal: 10,
          // vertical: 15,
        },
        markers: {
          width: 10,
          height: 10,
          radius: 40
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20px',
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#0081ff', '#e95455', '#e97d23'],
      xaxis: {
        axisBorder: {
          show: false,
        },
        categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thur'],
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
    },
  };
  results = [
    {
      name: 'Langues',
      color: 'primary',
      date: '24 March',
      completed: 60,
    },
    {
      name: 'Motivation',
      color: 'warn',
      date: '04 Feb',
      completed: 80,
    },
    
  ];
  snack: any; 
  
  
  constructor(private route: ActivatedRoute,
             private service:entretienRecrutmentService,
             private dialog: MatDialog,) 
             
             { }
  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.getEmployee();
    this.getInterviews();
    this.getCategoryTypes();
    console.log(this.interview.id);
    
  }

  getEmployee() {
    this.service.getEmployeeById(this.id).subscribe((data: any) => {
      this.employee = data;
    });
    console.log(this.employee);
  }

  getInterviews() {
    this.service.getInterviewsById(this.id).subscribe((data: any) => {
      this.interview = data;
    });
    console.log(this.interview);
  }



  openPopUpEntretien(data: any, isNew?) {
    let title = isNew ? 'Nouveau entretien' : 'Modifier entretien';
    console.log(this.id);
   
  
    const dialogRef: MatDialogRef<any> = this.dialog.open(ajoutEntretienPopupComponent, {
      disableClose: true,
      data: { title: title, row: data, evaluationNum: this.id,}
    });
  
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.service.addInterview({...res,evaluationNum:this.id}).subscribe(
          (response) => {
            console.log('Item updated successfully', response);
            this.snack.open('Compte bancaire modifié avec succès!', 'OK', { duration: 2000 });
            this.getInterviews();
          },
          (error) => {
            console.error('Error adding item', error);
            this.snack.open('Une erreur est survenue lors de la modification du compte bancaire.', 'OK', { duration: 2000 });
          }
        );
      }
    });
  }
  
  getItems() {
    throw new Error('Method not implemented.');
  }

  
 /* addQuestionnaire() {
    const dialogRef = this.dialog.open( questionnairePopupComponent );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }*/

  openPopupQuestionnaire(interviewId: number): void {
    this.getCategoryTypes().subscribe((data: any) => {
      const dialogRef = this.dialog.open(questionnairePopupComponent, {
        width: '400px',
        data: {
          interviewId: interviewId, // Pass the interview ID to the popup
          questionTypes: data.questionTypes,
          questionCategories: data.questionCategories
        }
      });
  
      dialogRef.componentInstance.questionnaireAdded.subscribe((emittedInterviewId: number) => {
          dialogRef.close({ interviewId: interviewId });
        
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        // Handle any actions after the popup is closed, if needed
      });
    });
  }
  
  
 

  getCategoryTypes(): Observable<any> {
    return forkJoin([
      this.service.getAllQuestiontypes(),
      this.service.getAllQuestionCategories()
    ]).pipe(
      map(([questionTypes, questionCategories]) => {
        return { questionTypes, questionCategories };
      }),
      catchError((error) => {
        console.error('Failed to retrieve question types and categories', error);
        return EMPTY;
      })
    );
  }
  
  InterviewTypeMap = {
    [InterviewType.TECHNICAL_INTERVIEW]: 'Entretien technique',
    [InterviewType.HUMAN_RESOURCE_INTERVIEW]: 'Entretien ressources humaines'
  }


    retrieveFilteredQuestions(filters: any): void {
    // Make an API call or apply filtering logic to retrieve the filtered questions
    // based on the selected question type and question category
    // Assign the retrieved questions to the 'questions' property
    // Example:
   // this.questions = // Retrieve the filtered questions 
 
 
  }

  openInterviewDetailsPopup(interviewId: number): void {
    const dialogRef = this.dialog.open(InterviewDetailsDialogComponent, {
      width: '600px',
      data: { interviewId: interviewId },
    });
    console.log(interviewId)
  }
  
  openPopupAdministrativeData(data: any, isNew?){
    let title = isNew ? 'Nouveau entretien' : 'Modifier entretien';
    console.log(this.id);
   
  
    const dialogRef: MatDialogRef<any> = this.dialog.open(addAdminstrativeDataComponent, {
      disableClose: true,
      data: { title: title, payload: data, evaluationNum: this.id }
    });
  
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.service.addInterview({...res,evaluationNum:this.id}).subscribe(
          (response) => {
            console.log('Item updated successfully', response);
            this.snack.open('Compte bancaire modifié avec succès!', 'OK', { duration: 2000 });
            this.getInterviews();
          },
          (error) => {
            console.error('Error adding item', error);
            this.snack.open('Une erreur est survenue lors de la modification du compte bancaire.', 'OK', { duration: 2000 });
          }
        );
      }
    });
  }
}
  

  







