import { Routes } from '@angular/router';
import { referentielCrudTableComponent } from './referentielDataTable/referentiel-crud-table.component';
import { referentielFormComponent } from './referentielForm/referentielForm.component';
import { refQuestionAffichageComponent } from './refQuestionAffichage/refQuestionAffichage.component';
import { referentielForm2Component } from './referentielForm2/referentielForm2.component';
import { refCategoryAffichageComponent } from './refCategoryAffichage/refCategoryAffichage.component';


export const referentielRoutes: Routes = [
  
    { 
        path: 'referentielTable', 
        component: referentielCrudTableComponent , 
        data: { title: 'refTable', breadcrumb: 'Table' } 
      },

      { 
        path: 'referentielForm', 
        component: referentielFormComponent , 
        data: { title: 'refForm', breadcrumb: 'TablForm' } 
      },
      { 
        path: ':id', 
        component: referentielForm2Component , 
        data: { title: 'refForm', breadcrumb: 'TablForm' } 
      },

      { 
        path: ':id', 
        component: refCategoryAffichageComponent, 
        data: { title: 'refAffiche', breadcrumb: 'Table' } 
      },

      { 
        path: ':id', 
        component: refQuestionAffichageComponent , 
        data: { title: 'refAffiche', breadcrumb: 'Table' } 
      }

      
]
