import { Routes } from '@angular/router';
import { candidatAffichageComponent } from './candidatAffichage.component';


export const candidatAffichage: Routes = [{ 
    path: 'candidatAffiche', 
component: candidatAffichageComponent, 
data: { title: 'CandidatAffichage' } }];
