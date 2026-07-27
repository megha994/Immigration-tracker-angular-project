import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationStore } from './../my-applications/application-store';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { Checkbox } from 'primeng/checkbox';
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
  imports: [ReactiveFormsModule, Checkbox, ProgressBar],
})
export class UpdateStudyPermit implements OnInit {
  @Input() type!: string;

  form!: FormGroup;

  completedSteps = 0;

  progressPercentage = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private applicationStore: ApplicationStore,
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type')!;

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

  /**
   * ------------------------
   * Calculate Progress
   * ------------------------
   */

  calculateProgress(): void {
    this.completedSteps = this.steps.filter((step) => step.completed).length;

    this.progressPercentage = Math.round((this.completedSteps / this.steps.length) * 100);
    if (this.progressPercentage == 100) {
      this.applicationStore.notifyUpdated('Study Permit progress updated successfully.');

      this.router.navigate(['/application']);
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

      title: 'Receive Provincial Attestation Letter',

      description:
        'Have you received the Provincial Attestation Letter (PAL) if required for the selected program?',

      completed: false,

      icon: 'pi pi-file-check',

      color: '#43A047',
    },
  ];

  // isStepDisabled(i: number) {
  //    this.stepsArray.controls[i].valueChanges.subscribe((value) => {
  //     debugger
  //     // this.steps[i].completed = value;
  //     this.steps[i+1].disabled = value;
  //     });

  // }
}
