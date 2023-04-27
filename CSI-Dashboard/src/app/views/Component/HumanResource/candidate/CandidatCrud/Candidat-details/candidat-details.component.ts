import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Partner } from 'app/shared/models/Partner';
import { CrudService } from '../candidat-crud.service';
import { Employee } from 'app/shared/models/Employee';
import { Education } from 'app/shared/models/Education';
import { Skills } from 'app/shared/models/Skills';
import { SkillsCategory } from 'app/shared/models/SkillsCategory';
import { Certification } from 'app/shared/models/Certification';
import { Experience } from 'app/shared/models/Experience';
@Component({
  selector: 'app-details-candidat',
  templateUrl: './candidat-details.component.html'
})
export class CandidatDetailComponent implements OnInit {
id: number
employee : Employee
education : Education
skills : Skills
skillsCategory : SkillsCategory
certification : Certification
experience : Experience
  constructor(    private route: ActivatedRoute,
    private candidatService: CrudService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getemployee();

    console.log(this.id)
  

  }
  getemployee() {
    this.candidatService.getItemById(this.id).subscribe((data: any) => {
      this.employee = data;

    });
  }
}
