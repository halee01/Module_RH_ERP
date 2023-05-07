import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CrudService } from '../candidat-crud.service';
import { Employee } from 'app/shared/models/Employee';
import { Education } from 'app/shared/models/Education';
import { Skills } from 'app/shared/models/Skills';
import { SkillsCategory } from 'app/shared/models/SkillsCategory';
import { Certification } from 'app/shared/models/Certification';
import { Experience } from 'app/shared/models/Experience';
import { TechnicalFile } from 'app/shared/models/TechnicalFile';
import { Language } from 'app/shared/models/Language';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { AssOfferCandidate } from 'app/shared/models/AssOfferCandidate';



@Component({
  selector: 'app-details-candidat',
  templateUrl: './candidat-details.component.html',
  styleUrls:  ['./candidat-details.component.scss']
})


export class CandidatDetailComponent implements OnInit {
cvHtml = '';
id: number
idTechnicalFile:number
employee : Employee
education : Education
language: Language
technicalFile: TechnicalFile
skills : Skills
skillsCategory : SkillsCategory
certification : Certification
experience : Experience
candidature : AssOfferCandidate
private router: Router
  constructor(    private route: ActivatedRoute,
    private candidatService: CrudService,
    private routerPdf: Router ,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getemployee();
   console.log(this.id);
   this.getTechnicalFile();
   this.getEducation();
   this.getExperience();
   this.getCertification();
   this.getlanguage();
   this.getSkills();
   this.getCandidature();
   /*const cv = document.getElementById('CV');
    if (cv) {
      this.cvHtml = cv.innerHTML;
    }*/

  }

  
  getemployee() {
    this.candidatService.getItemById(this.id).subscribe((data: any) => {
      this.employee = data;

    });
  }
  getTechnicalFile() {
    this.candidatService.getTechnicalFileById(this.id).subscribe((data: any) => {
      this.technicalFile = data;

    });
  }
  getEducation() {
    this.candidatService.getEducationById(this.id).subscribe((data: any) => {
      this.education = data;
      console.log(this.education);
    });
  }
  getExperience(){
    this.candidatService.getExperienceById(this.id).subscribe((data : any)=>{
      this.experience = data;
      console.log(this.experience);
    })
  }
  getCertification(){
    this.candidatService.getCertificationById(this.id).subscribe((data : any)=>{
      this.certification = data;
      console.log(this.certification);
    })
  }
  getlanguage(){
    this.candidatService.getLanguageById(this.id).subscribe((data : any)=>{
      this.language = data;
      console.log(this.language);
    })
  }
  getSkills(){
    this.candidatService.getSkillsById(this.id).subscribe((data : any)=>{
      this.skills = data;
      console.log(this.skills);
    })
  }
  getCandidature(){
    this.candidatService.getCandiatureById(this.id).subscribe((data : any)=>{
      this.candidature =data;
      console.log(this.candidature);
    })
  }

  openEvaluationCandidat(){
    this.router.navigate(['CandidatEvaluation/evaluationCandidat'])
  }
  print() {
    const printableArea = document.getElementById('CV');
   
    
    var originalContents = document.body.innerHTML;
    var printContents = document.getElementById('CV').innerHTML;
    document.body.innerHTML = "<h1>CV</h1>" + printContents + "<hr><h2>Contact Information</h2><div class='cv-contact'><div class='cv-contact-item'><i class='fas fa-phone'></i> (123) 456-7890</div><div class='cv-contact-item'><i class='fas fa-envelope'></i> john.doe@email.com</div><div class='cv-contact-item'><i class='fas fa-map-marker-alt'></i> 123 Main St, Anytown USA</div></div>";
    window.print();
    document.body.innerHTML = originalContents;
  }
  
 downloadCV() {
    const element = document.getElementById("CV");
    html2pdf()
      .from(element)
      .save('my-cv.pdf');
  }

    
  }
  
  
  
  
  
