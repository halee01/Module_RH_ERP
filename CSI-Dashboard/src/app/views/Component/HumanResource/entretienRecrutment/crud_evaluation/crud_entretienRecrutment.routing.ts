
import { Routes } from '@angular/router';
import { crudEntretienRecrutmentComponent } from './crud_entretienRecrutment.component';
import { entretienRecrutmentComponent } from '../entretienRecrutment.component';




export const crudEntretien: Routes = [{ 
    path: 'evaluationCrud', 
component: crudEntretienRecrutmentComponent, 
data: { title: 'CrudEvaluation' } },

{
  path:'evaluation',
  component: entretienRecrutmentComponent,
  data:{title:'EntretienRecrutment'}
}];


