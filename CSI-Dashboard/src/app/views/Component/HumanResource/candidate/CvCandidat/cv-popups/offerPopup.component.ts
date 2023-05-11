import { Component } from '@angular/core';
import { FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ExperienceLevel } from 'app/shared/models/AssOfferCandidate';

@Component({
    selector: 'dialog-elements-example-dialog',
    templateUrl: 'offerPopup.component.html',
  })

  export class OfferPopupComponent {

    offerCandidatForm:FormGroup;
    ExperienceLevel :string []= Object.values(ExperienceLevel);

    ngOnInit() {

        this.offerCandidatForm = new UntypedFormGroup({
            applicationDate: new UntypedFormControl('', [Validators.required]),
            expeienceLevel: new UntypedFormControl('', [Validators.required]),
          })
    }

    ExperienceLevelMap= {
        [ExperienceLevel.JUNIOR]:'Junior',
        [ExperienceLevel.MID_LEVEL]:'Confirmé',
       [ExperienceLevel.SENIOR]:'Senior',
       [ExperienceLevel.LEAD]:'Lead',
        [ExperienceLevel.ARCHITECT]:'Architecte',
       [ExperienceLevel.APPRENTICE]:'Apprentice',
       [ExperienceLevel.EXPERT]:'Expert',
      };
  }