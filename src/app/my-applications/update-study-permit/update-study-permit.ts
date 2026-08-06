import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {
  STEPS,
  MEDICAL_STEPS,
  PCC_STEPS,
  SUBMISSION_STEPS,
  BIOMETRICS_STEPS,
  DECISION_STEPS,
  DOCUMENTS,
  messages
} from './update-study-permit.mock';

import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

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
  imports: [
    ReactiveFormsModule,
    NgIf,
    CheckboxModule,
    ButtonModule,
    ProgressBarModule
  ]
})
export class UpdateStudyPermit implements OnInit {

  @Input() type!: string;
  @Input() processStep!: number;

  form!: FormGroup;
  formDocuments!: FormGroup;
  documents = DOCUMENTS;
  messages = messages;
  pageCompleted = false;
  completedSteps = 0;
  progressPercentage = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private progressService: ApplicationProgressService
  ) { }

  // -----------------------------
  // STEP REGISTRY (keeps arrays separate)
  // -----------------------------
  stepRegistry: Record<number, { key: string; array: Step[] }> = {
    0: { key: 'steps', array: STEPS },
    1: { key: 'medicalSteps', array: MEDICAL_STEPS },
    2: { key: 'pccSteps', array: PCC_STEPS },
    4: { key: 'submissionSteps', array: SUBMISSION_STEPS },
    5: { key: 'biometricsSteps', array: BIOMETRICS_STEPS },
    6: { key: 'decesionSteps', array: DECISION_STEPS }
  };

  ngOnInit(): void {
    this.type = this.route.snapshot.queryParams['type']!;
    this.processStep = Number(this.route.snapshot.queryParams['st'])!;

    this.buildForm();
    this.subscribeToChanges();
    this.calculateProgress();

    if (this.processStep === 3) {
      this.loadCheckboxesFromBackend();
    }
  }

  // -----------------------------
  // FORM BUILDER (dynamic)
  // -----------------------------
  private buildForm(): void {
    if (this.processStep === 3) {

      this.formDocuments = this.fb.group({
        checkboxes: this.fb.array(
          this.documents.map(s => this.fb.nonNullable.control(false))
        )
      });
      return;
    }

    const config = this.stepRegistry[this.processStep];
    this.form = this.fb.group({
      [config.key]: this.fb.array(
        config.array.map(s => this.fb.nonNullable.control(s.completed))
      )
    });
  }
  getCheckboxControl(i: number): FormControl<boolean> {
    return this.docsArray.at(i) as FormControl<boolean>;
  }
  // -----------------------------
  // SUBSCRIPTIONS (dynamic)
  // -----------------------------
  private subscribeToChanges(): void {
    if (this.processStep === 3) {
      this.docsArray.controls.forEach((control, index) => {
        control.valueChanges.subscribe(value => {
          this.documents[index].completed = value;

          if (!value) {
            for (let i = index + 1; i < this.documents.length; i++) {
              this.docsArray.at(i).setValue(false, { emitEvent: false });
              this.documents[i].completed = false;
            }
          }

          this.progressService.updateDocsCheckboxes(
            this.processStep.toString(),
            this.docsArray.value
          ).subscribe();

          this.calculateProgress();
        });
      });
      return;
    }

    const config = this.stepRegistry[this.processStep];
    const formArray = this.form.get(config.key) as FormArray;

    formArray.controls.forEach((control, index) => {
      control.valueChanges.subscribe(value => {
        const item = config.array[index];
        item.completed = value;

        if (!value) {
          for (let i = index + 1; i < config.array.length; i++) {
            formArray.at(i).setValue(false, { emitEvent: false });
            config.array[i].completed = false;
          }
        } else if (index < config.array.length - 1) {
          config.array[index + 1].disabled = false;
        }

        this.calculateProgress();
      });
    });
  }

  // -----------------------------
  // PROGRESS CALCULATION (dynamic)
  // -----------------------------
  private calculateProgress(): void {
    if (this.processStep === 3) {
      this.completedSteps = this.documents.filter(d => d.completed).length;
      this.progressPercentage = Math.round((this.completedSteps / this.documents.length) * 100);
    } else if (this.processStep === 6) {
      const config = this.stepRegistry[this.processStep];
      this.completedSteps = config.array.filter(s => s.completed).length;
      this.completedSteps = this.completedSteps === 1 ? config.array.length : this.completedSteps;
      this.progressPercentage = Math.round((this.completedSteps / config.array.length) * 100);
    }
    else {
      const config = this.stepRegistry[this.processStep];
      this.completedSteps = config.array.filter(s => s.completed).length;
      this.progressPercentage = Math.round((this.completedSteps / config.array.length) * 100);
    }

    if (this.progressPercentage === 100) {
      setTimeout(() => this.triggerCompletion(), 600);
    }
  }

  // -----------------------------
  // COMPLETION HANDLER
  // -----------------------------
  private triggerCompletion(): void {

    const msg = messages[this.processStep];
    const stepId = this.processStep.toString();

    this.pageCompleted = true;

    this.progressService.updateStep(stepId, true).subscribe(() => {
      this.router.navigate(['/application'], {
        queryParams: { pagecompleted: this.pageCompleted, msg, stepNo: this.processStep }
      });
    });
  }

  // -----------------------------
  // BACKEND LOAD (documents only)
  // -----------------------------
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

  // -----------------------------
  // GETTERS
  // -----------------------------
  get docsArray(): FormArray {
    return this.formDocuments.get('checkboxes') as FormArray;
  }

  get currentKey(): string | null {
    return this.stepRegistry[this.processStep]?.key ?? null;
  }

  get currentSteps(): Step[] | null {
    return this.stepRegistry[this.processStep]?.array ?? null;
  }

  get currentFormArray(): FormArray<FormControl<boolean>> {
    return this.form.get(this.currentKey!) as FormArray<FormControl<boolean>>;
  }

  // -----------------------------
  // STEP ARRAYS (unchanged)
  // -----------------------------
  steps: Step[] = [ /* unchanged */];
  medicalSteps: Step[] = [ /* unchanged */];
  pccSteps: Step[] = [ /* unchanged */];
  submissionSteps: Step[] = [ /* unchanged */];
  biometricsSteps: Step[] = [ /* unchanged */];
  decesionSteps: Step[] = [ /* unchanged */];
}
