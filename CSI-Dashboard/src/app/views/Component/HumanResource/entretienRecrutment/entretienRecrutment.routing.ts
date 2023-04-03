import { Routes } from '@angular/router';
import {  entretienRecrutmentComponent } from './entretienRecrutment.component';



export const EntretienRecru: Routes = [{ 
    path: 'evaluation', 
component: entretienRecrutmentComponent, 
data: { title: 'EntretienRecrutment' } }];
