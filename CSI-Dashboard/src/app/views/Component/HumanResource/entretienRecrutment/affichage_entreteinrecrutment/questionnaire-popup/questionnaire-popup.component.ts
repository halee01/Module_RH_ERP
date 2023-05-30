import { InterviewType } from 'app/shared/models/Interview';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionCategory } from 'app/shared/models/QuestionCategory';
import { QuestionType } from 'app/shared/models/QuestionType';
import { entretienRecrutmentService } from '../../entretienRecrutment.service';
import { Question } from 'app/shared/models/Question';
import { UpdatedQuestion } from 'app/shared/models/UpdatedQuestion';

@Component({
  selector: 'app-popup',
  templateUrl: './questionnaire-popup.component.html',
  //styleUrls: ['./questionnaire-popup.component.css']
})
export class questionnairePopupComponent {
  questionTypes: QuestionType[];
  questionTypeIds:number[];
  questionCategories: QuestionCategory[];
  filteredQuestionCategories: QuestionCategory[];
  questions: Question[];
  interviewId: number;
  updatedQuestions: UpdatedQuestion[] = [];

  selectedQuestionType: QuestionType;
  selectedQuestionCategory: QuestionCategory;
  selectedQuestionCategoryId: number;

  filtersSelected: EventEmitter<any> = new EventEmitter<any>();
  snack: any;

  constructor(
    public dialogRef: MatDialogRef<questionnairePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: entretienRecrutmentService
  ) {
    this.questionTypes = data.questionTypes;
    this.selectedQuestionCategoryId = null; // Reset the selected question category
    this.questionCategories = data.questionCategories;
    this.filteredQuestionCategories = [];
    this.questions = [];
  }

  onQuestionTypeChange(): void {
    this.filteredQuestionCategories = this.questionCategories.filter(
      (category) => category.questionTypeNum === this.selectedQuestionType?.id
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  applyFilters(): void {
    const filters = {
      questionType: this.selectedQuestionType,
      questionCategory: this.selectedQuestionCategory
    };
    this.filtersSelected.emit(filters);
    this.getQuestions();
  }

  ngOnInit() {
    this.getCategoryTypes();
  }

  getCategoryTypes() {
    this.service.getAllQuestiontypes().subscribe(
      (questionTypes: QuestionType[]) => {
        this.questionTypes = questionTypes;
        this.filterQuestionCategories();
      },
      (error) => {
        console.error('Failed to retrieve question types', error);
      }
    );
  }

  filterQuestionCategories() {
    if (this.selectedQuestionType) {
      this.service.getQuestionCategoriesByType(this.selectedQuestionType.id).subscribe(
        (questionCategories: QuestionCategory[]) => {
          this.filteredQuestionCategories = questionCategories;
          this.selectedQuestionCategory = null; // Reset the selected question category
          this.getQuestions();
        },
        (error) => {
          console.error('Failed to retrieve question categories', error);
        }
      );
    } else {
      this.filteredQuestionCategories = [];
      this.selectedQuestionCategory = null; // Reset the selected question category
      this.getQuestions();
    }
  }


  addQuestionnaire(questionTypeId: number): void {
    const questionTypeIds: number[] = [this.selectedQuestionType.id];
    const interviewId: number = this.data.interviewId; // Access the interview ID from the data object
    console.log(interviewId);
    console.log(questionTypeIds);

    this.service.addQuestionTypeToInterview(interviewId, questionTypeIds).subscribe(
      (response) => {
        console.log('Question type added to the interview successfully', response);
        this.snack.open('Type de question ajouté à l\'entretien avec succès!', 'OK', { duration: 2000 });
        // Perform any additional actions or update the UI as needed
        this.dialogRef.close(true); // Close the dialog with a success flag
      },
      (error) => {
        console.error('Error adding question type to the interview', error);
        this.snack.open('Une erreur est survenue lors de l\'ajout du type de question à l\'entretien.', 'OK', { duration: 2000 });
      }
    );
  }
  
  
  getQuestions(): void {
    if (this.selectedQuestionType && this.selectedQuestionCategory) {
      const typeId = this.selectedQuestionType.id;
      const categoryId = this.selectedQuestionCategory.id;
  
      this.service.getQuestionByTypeAndCategory(typeId, categoryId).subscribe(
        (questions: Question[]) => {
          this.questions = questions;
          const questionStrings = this.questions.map(question => question.question);
          const interviewId = this.data.interviewId; // Access the interview ID from the data object
          this.createUpdatedQuestionsFromStrings(questionStrings, interviewId);
  
          console.log(this.questions);
          console.log(this.updatedQuestions);
        },
        (error) => {
          console.error('Failed to retrieve questions', error);
        }
      );
    } else {
      this.questions = [];
      this.updatedQuestions = [];
    }
  }
  
  createUpdatedQuestionsFromStrings(questionStrings: string[], interviewId: number): void {
    this.updatedQuestions = []; // Reset the array before populating it
  
    questionStrings.forEach(questionString => {
      const updatedQuestion: UpdatedQuestion = {
        questionText: questionString,
        interview: { id: interviewId }, // Set the interview ID for the updated question
        // Set other properties as needed
      };
  
      this.service.addUpdatedQuestion(updatedQuestion).subscribe(
        (response) => {
          console.log('Updated question added successfully', response);
          // Perform any additional actions or update the UI as needed
          this.updatedQuestions.push(response.updatedQuestion); // Add the updated question to the local array
        },
        (error) => {
          console.error('Error adding updated question', error);
        }
      );
    });
  }
  

  
}
  
    
  