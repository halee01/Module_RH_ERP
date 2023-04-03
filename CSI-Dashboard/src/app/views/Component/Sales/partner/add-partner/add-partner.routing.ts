import { Routes } from '@angular/router';

import { addpartnerComponent } from './add-partner.component';

export const addpartner: Routes = [
  { 
    path: 'add-partner', 
    component: addpartnerComponent, 
    data: { title: 'Partner', breadcrumb: 'Partner' } 
  }]