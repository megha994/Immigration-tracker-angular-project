import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  imports: [ReactiveFormsModule, NgIf, Checkbox, ProgressBar, CheckboxModule, ButtonModule],
})
export class UpdateStudyPermit implements OnInit {

  @Input() type!: string;
  @Input() processStep!: number;

  form!: FormGroup;
  formDocuments!: FormGroup;

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
    this.type = this.route.snapshot.queryParams['type']!;
    this.processStep = Number(this.route.snapshot.queryParams['st'])!;

    this.buildForm();

    // Load saved checkbox states from backend (for step 1 or 2)
    if (this.processStep === 1 || this.processStep === 2) {
      this.loadCheckboxesFromBackend();
    }

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

  get stepsArray(): FormArray<FormControl<boolean>> {
    return this.form.get('steps') as FormArray<FormControl<boolean>>;
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
    this.progressService.updateStep(stepId, true).subscribe(() => {
      this.router.navigate(['/application'], {
        queryParams: { pagecompleted: true, msg, stepNo }
      });
    });
  }

  /** Subscribe to checkbox/step changes */
  private subscribeToChanges(): void {

    // STEP 0 — LOA steps
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

    // STEP 1 — Documents checklist
    else if (this.processStep === 1) {

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
    else if (this.processStep === 2) {

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
  }

  /** Calculate progress and trigger completion */
  calculateProgress() {
    

    if (this.processStep === 0) {
      this.completedSteps = this.steps.filter(s => s.completed).length;
      this.progressPercentage = Math.round((this.completedSteps / this.steps.length) * 100);
    }

    else if (this.processStep === 1 || this.processStep === 2) {
      this.completedSteps = this.documents.filter(d => d.completed).length;
      this.progressPercentage = Math.round((this.completedSteps / this.documents.length) * 100);
    }

    if (this.progressPercentage === 100) {
      setTimeout(() => {
        let msg = '';
        let stepNo: number | null = null;
        let stepId = '';

        if (this.processStep === 0) {
          msg = 'LOA progress updated successfully';
          stepNo = 0;
          stepId = '0';
        } else if (this.processStep === 1) {
          msg = 'Document progress updated successfully';
          stepNo = 1;
          stepId = '1';
        } else if (this.processStep === 2) {
          msg = 'Final review completed successfully';
          stepNo = 2;
          stepId = '2';
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

  documents = [
    { id: 1, label: 'Letter of Acceptance (LOA)', completed: false },
    { id: 2, label: 'Passport Photocopy', completed: false },
    { id: 3, label: 'PAL/TAL (if Required)', completed: false },
    { id: 4, label: 'Proof of Financial Support', completed: false },
    { id: 5, label: '2 Digital Photos', completed: false },
    { id: 6, label: 'Supporting Documents', completed: false },
    { id: 7, label: 'Proof of Fee Payment', completed: false },
    { id: 8, label: 'Marriage Certificate (if applicable)', completed: false },
  ];
}
