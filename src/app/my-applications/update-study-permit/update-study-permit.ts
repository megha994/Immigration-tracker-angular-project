import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationStore } from './../my-applications/application-store';
import { NgIf, NgFor } from '@angular/common';
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
  imports: [ReactiveFormsModule, NgIf, NgFor, Checkbox, ProgressBar, CheckboxModule, ButtonModule],
})
export class UpdateStudyPermit implements OnInit {
  @Input() type!: string;
  form!: FormGroup;
  @Input() processStep!: number;
  completedSteps = 0;
  progressPercentage = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private fbDocs: FormBuilder,
    private applicationStore: ApplicationStore,

  ) {

    this.formDocuments = this.fbDocs.group({
      checkboxes: this.fbDocs.array(this.documents.map(() => this.fbDocs.control(false)))
    });
  }

  ngOnInit(): void {
    this.type = this.route.snapshot.queryParams['type']!;
    this.processStep = Number(this.route.snapshot.queryParams['st'])!;
    this.buildForm();

    this.calculateProgress();

    this.subscribeToChanges();
  }

  /**
   * ------------------------
   * Build Reactive Form
   * ------------------------
   */

  private buildForm(): void {
    this.form = this.fb.group({
      steps: this.fb.array(this.steps.map((step) => this.fb.nonNullable.control(step.completed))),
    });
  }

  /**
   * ------------------------
   * Form Array Getter
   * ------------------------
   */

  get stepsArray(): FormArray<FormControl<boolean>> {
    return this.form.get('steps') as FormArray<FormControl<boolean>>;
  }

  /**
   * ------------------------
   * Listen for Checkbox Changes
   * ------------------------
   */

  private subscribeToChanges(): void {
    if (this.processStep == 0) {
      this.stepsArray.controls.forEach((control, index) => {
        control.valueChanges.subscribe((value) => {
          this.steps[index].completed = value;
          if (index < this.steps.length - 1) {
            this.steps[index + 1].disabled = !value;
          }
          if (!value) {
            for (let i = index + 1; i < this.steps.length; i++) {
              // this.steps[i].completed = false;
              this.stepsArray.controls[i].setValue(false);
              this.steps[i].disabled = !value;
            }
          }


          this.calculateProgress();

          this.updateProgress(this.steps[index]);
        });
      });
    }
    else if (this.processStep == 1) {
      const checkboxes = this.formDocuments.get('checkboxes') as FormArray;

      checkboxes.controls.forEach((control, index) => {
        control.valueChanges.subscribe((value) => {
          this.documents[index].completed = value;
          if (!value) {
            for (let i = index + 1; i < this.documents.length; i++) {
              checkboxes.controls[i].setValue(false, { emitEvent: false });
              this.documents[i].completed = false;
            }
          }

          this.calculateProgress();
          this.updateProgress(this.steps[index]);
        });
      });
    }
  }

  /**
   * ------------------------
   * Calculate Progress
   * ------------------------
   */

  calculateProgress() {

    if (this.processStep == 0) {
      this.completedSteps = this.steps.filter((step) => step.completed).length;
      this.progressPercentage = Math.round((this.completedSteps / this.steps.length) * 100);
    } else if (this.processStep == 1) {
      const values = this.formDocuments.value.checkboxes; // [true, false, true]
      // this.completedSteps = this.documents
      //   .filter((_, i) => values[i]).length;
      this.completedSteps = this.documents.filter((step) => step.completed).length;
      console.log("COMPLETED STEPS:", this.completedSteps);
      this.progressPercentage = Math.round((this.completedSteps / this.documents.length) * 100);
    }


    if (this.progressPercentage == 100) {

      setTimeout(() => {
        let msg = "";
        let stepNo = null;
        if (this.processStep == 0) {
          msg = 'LOA progress updated successfully';
          stepNo = 0;
        } else if (this.processStep == 1) {
          msg = 'Document progress updated successfully'
          stepNo = 1;
        }
        this.applicationStore.notifyUpdated(msg);

        this.router.navigate(['/application'],
          { queryParams: { pagecompleted: true, msg: msg, stepNo: stepNo } })  // optional query param);
      }, 1000); // 20 seconds
    }
  }

  /**
   * ------------------------
   * Save Progress
   * ------------------------
   */

  updateProgress(step: Step): void {
    /**
     * Example API
     *
     * this.studyPermitService.updateProgress({
     *    id: step.id,
     *    completed: step.completed
     * }).subscribe();
     */
  }

  /**
   * ------------------------
   * Card Click
   * ------------------------
   */

  goToStep(step: Step): void {
    const st = Number(step.id);

    this.router.navigate(['/application'], {
      queryParams: {
        st,
        type: this.type,
      },
      queryParamsHandling: 'merge',
    });
  }

  /**
   * ------------------------
   * Status Label
   * ------------------------
   */

  getStatus(step: Step): string {
    return step.completed ? 'Completed' : 'Not Started';
  }

  /**
   * ------------------------
   * Progress Message
   * ------------------------
   */

  get progressMessage(): string {
    if (this.progressPercentage === 100) {
      return '🎉 Congratulations! All study permit steps are completed.';
    }

    if (this.progressPercentage >= 75) {
      return 'Great progress! You are almost finished.';
    }

    if (this.progressPercentage >= 50) {
      return `You're halfway there!`;
    }

    if (this.progressPercentage >= 25) {
      return 'Good start! Keep going.';
    }

    return 'Begin completing your study permit checklist.';
  }

  /**
   * ------------------------
   * Step Data
   * ------------------------
   */

  steps: Step[] = [
    {
      disabled: false,
      id: '1',
      title: 'Choose a Program',
      description: `Have you selected a study program from a Designated Learning Institution (DLI)?
      <p>

      <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html"
      target="_blank">

      Learning Institutions List (DLI)

      </a></p`,

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

      description:
        `Have you received the Provincial Attestation Letter (PAL) <b>if required</b> for the selected program?`,

      completed: false,

      icon: 'pi pi-file-check',

      color: '#43A047',
    },
  ];
  documents = [
    { id: 1, label: 'Letter of Acceptance (LOA)', completed: false },
    { id: 2, label: 'Passport', completed: false },
    { id: 3, label: 'PAL/TAL (if Required)', completed: false },
    { id: 4, label: 'Proof of Finanancial Support', completed: false },
    { id: 5, label: 'Digital Photo', completed: false },
    { id: 6, label: 'Supporting Documents', completed: false }
  ];
  formDocuments!: FormGroup;

  get docsArray(): FormArray {
    return this.formDocuments.get('checkboxes') as FormArray;
  }
  getCheckboxControl(i: number): FormControl {
    return this.docsArray.at(i) as FormControl;
  }
}
