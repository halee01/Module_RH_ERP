
import { Routes } from '@angular/router';
import { crudEntretienRecrutmentComponent } from './crud_table_entretienRecrutment/crud_entretienRecrutment.component';
import { crudEvaluationComponent } from './add_evaluation/add_crud_evaluation.component';




export const crudEntretien: Routes = [{ 
    path: 'tableEntretien', 
component: crudEntretienRecrutmentComponent, 
data: { title: 'CrudEvaluation' } },
{ 
  path: 'crudEvaluation', 
component: crudEvaluationComponent, 
data: { title: 'Evaluation' } 
},


];

