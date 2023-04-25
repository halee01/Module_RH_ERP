import { Component } from '@angular/core';
import { cvcandidatComponent } from './../CvCandidat/cv-candidat.component';
import { CandidatCrudTableComponent } from './CandidatCrud-table/candidat-crud-table.component';
import { Routes } from '@angular/router';
import { updatecandidatComponent } from '../updateCandidat/updateCandidat.component';
import { id } from 'date-fns/locale';



export const CrudsRoutes: Routes = [
  { 
    path: 'CandidatCrud-table', 
    component: CandidatCrudTableComponent, 
    data: { title: 'Table', breadcrumb: 'Table' } 
  },

  {
    path:'cvCandidat-crud',
    component:cvcandidatComponent,data: { title: 'CvCandidat' } 

  },
  {
    path:'updateCandidat/:id',
    component:updatecandidatComponent,
    data:{title: 'update'}
  }
];
