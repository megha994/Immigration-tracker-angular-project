import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';

import { NgIf } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { Checkbox } from 'primeng/checkbox';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';
import { ApplicationProgressService } from './../services/application-progress.service';

interface Step {
  disabled: boolean;
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  icon?: string;
  color?: string;
}

@Component({
  selector: 'app-update-study-permit',
  standalone: true,
  templateUrl: './update-study-permit.html',
  styleUrl: './update-study-permit.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgIf, Checkbox, ProgressBar, CheckboxModule, ButtonModule],
})
export class UpdateStudyPermit implements OnInit {

  @Input() type!: string;
  @Input() processStep!: number;

  form!: FormGroup;
  formDocuments!: FormGroup;
  pageCompleted: boolean = false;
  completedSteps = 0;
  progressPercentage = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private fbDocs: FormBuilder,
    private progressService: ApplicationProgressService
  ) {
    this.formDocuments = this.fbDocs.group({
      checkboxes: this.fbDocs.array(
        this.documents.map(() => this.fbDocs.control(false))
      )
    });
  }

  ngOnInit(): void {
    this.pageCompleted = false;
    this.type = this.route.snapshot.queryParams['type']!;
    this.processStep = Number(this.route.snapshot.queryParams['st'])!;
    // if (this.processStep === 0) {
    this.buildForm();
    // }


    if (this.processStep === 1) {
      this.buildFormMedical();
    }
    if (this.processStep === 2) {
      this.buildFormpcc();
    }
    if (this.processStep === 3) {
      this.loadCheckboxesFromBackend();
    }
    if (this.processStep === 4) {
      this.buildFormSubmsiion();
    }
    if (this.processStep === 5) {
      this.buildFormBiometrics();
    }
    if (this.processStep === 6) {
      this.buildFormDecisions();
    }
    // Load saved checkbox states from backend (for step 1 or 2)


    this.calculateProgress();
    this.subscribeToChanges();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      steps: this.fb.array(
        this.steps.map(step => this.fb.nonNullable.control(step.completed))
      ),
    });
  }


  private buildFormSubmsiion(): void {
    this.form = this.fb.group({
      submissionSteps: this.fb.array(
        this.submissionSteps.map(step => this.fb.nonNullable.control(step.completed))
      ),
    });
  }

  private buildFormMedical(): void {
    this.form = this.fb.group({
      medicalSteps: this.fb.array(
        this.medicalSteps.map(step => this.fb.nonNullable.control(step.completed))
      ),
    });
  }


  private buildFormpcc(): void {
    this.form = this.fb.group({
      pccSteps: this.fb.array(
        this.pccSteps.map(step => this.fb.nonNullable.control(step.completed))
      ),
    });
  }


  private buildFormBiometrics(): void {
    this.form = this.fb.group({
      biometricsSteps: this.fb.array(
        this.biometricsSteps.map(step => this.fb.nonNullable.control(step.completed))
      ),
    });
  }

  private buildFormDecisions(): void {
    this.form = this.fb.group({
      decesionSteps: this.fb.array(
        this.decesionSteps.map(step => this.fb.nonNullable.control(step.completed))
      ),
    });
  }



  get stepsArray(): FormArray<FormControl<boolean>> {
    return this.form.get('steps') as FormArray<FormControl<boolean>>;
  }
  get submissionStepsArray(): FormArray<FormControl<boolean>> {
    return this.form.get('submissionSteps') as FormArray<FormControl<boolean>>;
  }
  get medicalStepsArray(): FormArray<FormControl<boolean>> {
    return this.form.get('medicalSteps') as FormArray<FormControl<boolean>>;
  }
  get pccStepsArray(): FormArray<FormControl<boolean>> {
    return this.form.get('pccSteps') as FormArray<FormControl<boolean>>;
  }
  get biometricsStepsArray(): FormArray<FormControl<boolean>> {
    return this.form.get('biometricsSteps') as FormArray<FormControl<boolean>>;
  }
  get decesionStepsArray(): FormArray<FormControl<boolean>> {
    return this.form.get('decesionSteps') as FormArray<FormControl<boolean>>;
  }

  get docsArray(): FormArray {
    return this.formDocuments.get('checkboxes') as FormArray;
  }

  getCheckboxControl(i: number): FormControl {
    return this.docsArray.at(i) as FormControl;
  }

  /** Load saved checkbox states from backend */
  private loadCheckboxesFromBackend(): void {
    this.progressService.getCheckboxes(this.processStep.toString())
      .subscribe(data => {
        data.checkboxes.forEach((value, i) => {
          this.docsArray.at(i).setValue(value, { emitEvent: false });
          this.documents[i].completed = value;
        });

        this.calculateProgress();
      });
  }

  /** Called when 100% progress is reached */
  completeStep(stepId: string, msg: string, stepNo: number) {
    this.pageCompleted = this.progressPercentage === 100 ? true : false;
    this.progressService.updateStep(stepId, true).subscribe(() => {
      this.router.navigate(['/application'], {
        queryParams: { pagecompleted: this.pageCompleted, msg, stepNo }
      },);
    });
  }

  /** Subscribe to checkbox/step changes */
  private subscribeToChanges(): void {

    if (this.processStep === 0) {
      this.stepsArray.controls.forEach((control, index) => {
        control.valueChanges.subscribe(value => {

          const step = this.steps[index];
          step.completed = value;

          if (index < this.steps.length - 1) {
            this.steps[index + 1].disabled = !value;
          }

          if (!value) {
            for (let i = index + 1; i < this.steps.length; i++) {
              this.stepsArray.controls[i].setValue(false, { emitEvent: false });
              this.steps[i].disabled = true;
              this.steps[i].completed = false;
            }
          }

          this.calculateProgress();
        });
      });
    }

    else if (this.processStep === 1) {
      this.medicalStepsArray.controls.forEach((control, index) => {
        control.valueChanges.subscribe(value => {

          const step = this.medicalSteps[index];
          step.completed = value;

          if (index < this.medicalSteps.length - 1) {
            this.medicalSteps[index + 1].disabled = !value;
          }

          if (!value) {
            for (let i = index + 1; i < this.medicalSteps.length; i++) {
              this.medicalStepsArray.controls[i].setValue(false, { emitEvent: false });
              this.medicalSteps[i].disabled = true;
              this.medicalSteps[i].completed = false;
            }
          }

          this.calculateProgress();
        });
      });

    }

    else if (this.processStep === 2) {
      this.pccStepsArray.controls.forEach((control, index) => {
        control.valueChanges.subscribe(value => {

          const step = this.pccSteps[index];
          step.completed = value;

          if (index < this.pccSteps.length - 1) {
            this.pccSteps[index + 1].disabled = !value;
          }

          if (!value) {
            for (let i = index + 1; i < this.pccSteps.length; i++) {
              this.pccStepsArray.controls[i].setValue(false, { emitEvent: false });
              this.pccSteps[i].disabled = true;
              this.pccSteps[i].completed = false;
            }
          }

          this.calculateProgress();
        });
      });

    }

    // STEP 1 — Documents checklist
    else if (this.processStep === 3) {

      this.docsArray.controls.forEach((control, index) => {
        control.valueChanges.subscribe(value => {

          this.documents[index].completed = value;

          if (!value) {
            for (let i = index + 1; i < this.documents.length; i++) {
              this.docsArray.controls[i].setValue(false, { emitEvent: false });
              this.documents[i].completed = false;
            }
          }

          // Save checkbox states to backend
          this.progressService.updateDocsCheckboxes(
            this.processStep.toString(),
            this.docsArray.value
          ).subscribe();

          this.calculateProgress();
        });
      });
    }

    // STEP 2 — Final Review (same logic as step 1)
    else if (this.processStep === 4) {
      this.submissionStepsArray.controls.forEach((control, index) => {
        control.valueChanges.subscribe(value => {

          const step = this.submissionSteps[index];
          step.completed = value;

          if (index < this.submissionSteps.length - 1) {
            this.submissionSteps[index + 1].disabled = !value;
          }

          if (!value) {
            for (let i = index + 1; i < this.submissionSteps.length; i++) {
              this.submissionStepsArray.controls[i].setValue(false, { emitEvent: false });
              this.submissionSteps[i].disabled = true;
              this.submissionSteps[i].completed = false;
            }
          }

          this.calculateProgress();
        });
      });

    }

    else if (this.processStep === 5) {
      this.biometricsStepsArray.controls.forEach((control, index) => {
        control.valueChanges.subscribe(value => {

          const step = this.biometricsSteps[index];
          step.completed = value;

          if (index < this.biometricsSteps.length - 1) {
            this.biometricsSteps[index + 1].disabled = !value;
          }

          if (!value) {
            for (let i = index + 1; i < this.biometricsSteps.length; i++) {
              this.biometricsStepsArray.controls[i].setValue(false, { emitEvent: false });
              this.biometricsSteps[i].disabled = true;
              this.biometricsSteps[i].completed = false;
            }
          }

          this.calculateProgress();
        });
      });

    }

    else if (this.processStep === 6) {
      this.decesionStepsArray.controls.forEach((control, index) => {
        control.valueChanges.subscribe(value => {

          const step = this.decesionSteps[index];
          step.completed = value;

          if (!value) {
            for (let i = index + 1; i < this.decesionSteps.length; i++) {
              this.decesionStepsArray.controls[i].setValue(false, { emitEvent: false });
              this.decesionSteps[i].completed = false;
            }
          }

          this.calculateProgress();
        });
      });

    }
  }

  /** Calculate progress and trigger completion */
  calculateProgress() {


    if (this.processStep === 0) {
      this.completedSteps = this.steps.filter(s => s.completed).length;
      this.progressPercentage = Math.round((this.completedSteps / this.steps.length) * 100);
    }

    else if (this.processStep === 1) {
      this.completedSteps = this.medicalSteps.filter(d => d.completed).length;
      this.progressPercentage = Math.round((this.completedSteps / this.medicalSteps.length) * 100);
    }

    else if (this.processStep === 2) {
      this.completedSteps = this.pccSteps.filter(d => d.completed).length;
      this.progressPercentage = Math.round((this.completedSteps / this.pccSteps.length) * 100);
    }


    else if (this.processStep === 3) {
      this.completedSteps = this.documents.filter(d => d.completed).length;
      this.progressPercentage = Math.round((this.completedSteps / this.documents.length) * 100);
    }

    else if (this.processStep === 4) {
      this.completedSteps = this.submissionSteps.filter(s => s.completed).length;
      this.progressPercentage = Math.round((this.completedSteps / this.submissionSteps.length) * 100);
    }

    else if (this.processStep === 5) {
      this.completedSteps = this.biometricsSteps.filter(s => s.completed).length;
      this.progressPercentage = Math.round((this.completedSteps / this.biometricsSteps.length) * 100);
    }

    else if (this.processStep === 6) {
      this.completedSteps = this.decesionSteps.filter(s => s.completed).length;
      this.progressPercentage =
        this.completedSteps === 1 ? 100 :
          Math.round((this.completedSteps / this.decesionSteps.length) * 100);
    }

    if (this.progressPercentage === 100) {
      setTimeout(() => {
        let msg = '';
        let stepNo: number | null = null;
        let stepId = '';

        if (this.processStep === 0) {
          msg = 'LOA Progress Updated Successfully!';
          stepNo = 0;
          stepId = '0';
        }
        else if (this.processStep === 1) {
          msg = 'Medical Application Progress Updated Successfully!';
          stepNo = 1;
          stepId = '1';
        }
        else if (this.processStep === 2) {
          msg = 'Police Clearence Updated Successfully!';
          stepNo = 2;
          stepId = '2';
        }
        else if (this.processStep === 3) {
          msg = 'Document Progress Updated Successfully!';
          stepNo = 3;
          stepId = '3';
        } else if (this.processStep === 4) {
          msg = 'IRCC Application Progress Updated Successfully!';
          stepNo = 4;
          stepId = '4';
        }
        else if (this.processStep === 5) {
          msg = 'Biometric Application Progress Updated Successfully!';
          stepNo = 5;
          stepId = '5';
        }
        else if (this.processStep === 6) {
          msg = 'Final Decesion Updated Successfully!';
          stepNo = 6;
          stepId = '6';
        }
        this.completeStep(stepId, msg, stepNo!);

      }, 600);
    }
  }

  goToStep(step: Step): void {
    const st = Number(step.id);

    this.router.navigate(['/application'], {
      queryParams: { st, type: this.type },
      queryParamsHandling: 'merge',
    });
  }

  steps: Step[] = [
    {
      disabled: false,
      id: '1',
      title: 'Choose a Program',
      description: `Have you selected a study program from a Designated Learning Institution (DLI)?
      <p>
      <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html"
      target="_blank">Learning Institutions List (DLI)</a></p>`,
      completed: false,
      icon: 'pi pi-book',
      color: '#1E88E5',
    },
    {
      disabled: true,
      id: '2',
      title: 'Apply to the Designated Learning Institution (DLI) in Canada',
      description: 'Have you applied to the course of your choice on the DLI website in Canada?',
      completed: false,
      icon: 'pi pi-send',
      color: '#D2579B',
    },
    {
      disabled: true,
      id: '3',
      title: 'Receive Letter of Acceptance',
      description: 'Have you received the Letter of Acceptance from the DLI?',
      completed: false,
      icon: 'pi pi-envelope',
      color: '#DAAA0F',
    },
    {
      disabled: true,
      id: '4',
      title: 'Check if you Require a Provincial Attestation Letter',
      description: `Have you received the Provincial Attestation Letter (PAL) <b>if required</b> for the selected program?`,
      completed: false,
      icon: 'pi pi-file-check',
      color: '#43A047',
    },
  ];

  submissionSteps: Step[] = [
    {
      disabled: false,
      id: '1',
      title: 'Filled the Application',
      description: `Have you filled the application online on the IRCC Poratl?`,
      completed: false,
      icon: 'pi pi-pencil',
      color: '#1E88E5',
    },
    {
      disabled: true,
      id: '2',
      title: 'Upload Documents',
      description: 'Have you uploaded the documents?',
      completed: false,
      icon: 'pi pi-folder-open',
      color: '#44af16',
    },
    {
      disabled: true,
      id: '3',
      title: 'Submit Application',
      description: 'Have you submitted the application?',
      completed: false,
      icon: 'pi pi-envelope',
      color: '#b83699',
    }]

  medicalSteps: Step[] = [
    {
      disabled: false,
      id: '1',
      title: 'Medical Examination Appointment',
      description: `Have you taken the appointment for medical examination?`,
      completed: false,
      icon: 'pi pi-heart-fill',
      color: '#1E88E5',
    },
    {
      disabled: true,
      id: '2',
      title: 'Medical Examination Done',
      description: 'Have you completed your medical examination at the corresponding hospital as per the schedule?',
      completed: false,
      icon: 'pi pi-heart-fill',
      color: '#44af16',
    }
  ]

  biometricsSteps: Step[] = [
    {
      disabled: false,
      id: '1',
      title: 'Biometrics Appointment',
      description: `Have you taken the appointment for Biometrics?`,
      completed: false,
      icon: 'pi pi-user',
      color: '#1E88E5',
    },
    {
      disabled: true,
      id: '2',
      title: 'Biometrics Complete',
      description: 'Have you completed your biometric verification at the corresponding site as per the schedule?',
      completed: false,
      icon: 'pi pi-user',
      color: '#44af16',
    }
  ]

  decesionSteps: Step[] = [
    {
      disabled: false,
      id: '1',
      title: 'Application Accepted',
      description: `Is you application accepted?`,
      completed: false,
      icon: 'pi pi-check',
      color: '#29db8e',
    },
    {
      disabled: false,
      id: '2',
      title: 'Application Rejected',
      description: 'Is your application Rejected?',
      completed: false,
      icon: 'pi pi-times',
      color: '#e45b29',
    },

    {
      disabled: false,
      id: '3',
      title: 'Application Pending',
      description: 'Is your application Pending?',
      completed: false,
      icon: 'pi pi-question-circle',
      color: '#d6d31d',
    }
  ]

  pccSteps: Step[] = [
    {
      disabled: false,
      id: '1',
      title: 'Police Clearence (PCC)',
      description: `Have you applied for Police Clearence?`,
      completed: false,
      icon: 'pi pi-shield',
      color: '#1E88E5',
    },
    {
      disabled: true,
      id: '2',
      title: 'Police Clearence Done',
      description: 'Have you completed PCC?',
      completed: false,
      icon: 'pi pi-shield',
      color: '#44af16',
    }
  ]
  documents = [
    { id: 1, label: 'Letter of Acceptance (LOA)', completed: false },
    { id: 2, label: 'Passport Photocopy', completed: false },
    { id: 3, label: 'PAL/TAL (if Required)', completed: false },
    { id: 4, label: 'Proof of Financial Support', completed: false },
    { id: 5, label: '2 Digital Photos', completed: false },
    { id: 6, label: 'Supporting Documents', completed: false },
    { id: 7, label: 'Proof of Fee Payment', completed: false },
    { id: 8, label: 'Marriage Certificate (if applicable)', completed: false },
    { id: 8, label: 'Medical Certificate', completed: false },
  ];


}
