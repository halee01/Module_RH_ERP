import { Component } from '@angular/core';
import { cvcandidatComponent } from './../CvCandidat/cv-candidat.component';
import { CandidatCrudTableComponent } from './CandidatCrud-table/candidat-crud-table.component';
import { Routes } from '@angular/router';

export const CrudsRoutes: Routes = [
  { 
    path: 'CandidatCrud-table', 
    component: CandidatCrudTableComponent, 
    data: { title: 'Table', breadcrumb: 'Table' } 
  },

  {
    path:'cvCandidat-crud',
    component:cvcandidatComponent,data: { title: 'CvCandidat' } 

  }
];
