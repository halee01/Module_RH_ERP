import { Routes } from '@angular/router';

import { cvcandidatComponent } from './cv-candidat.component';

export const CalendarRoutes: Routes = [{ 
    path: 'cvCandidat-crud', 
component: cvcandidatComponent, 
data: { title: 'CvCandidat' } }];
