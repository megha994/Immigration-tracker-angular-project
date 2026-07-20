import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { TagModule } from 'primeng/tag';
import { STUDY_OUTSIDE_SUBMISSION } from './../immigration-journey-mock-data/immigration-outside-ca-study.mock';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { STUDY_OUTSIDE_APPLY_ONLINE, STUDY_OUTSIDE_APPLY_ON_PAPER, submissionButton } from './../immigration-journey-mock-data/immigration-outside-ca-study.mock'

@Component({
  selector: 'app-immigration-online-ca-submission',
  imports: [StepperModule, ButtonModule, CommonModule, TagModule, SelectModule,
    MessageModule,
    RadioButtonModule,
    ToastModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule],
  providers: [MessageService],
  templateUrl: './immigration-outside-ca-submission.html',
  styleUrl: './immigration-outside-ca-submission.css'
})
export class ImmigrationOutsideCaSubmission implements OnInit, OnDestroy {
  private readonly messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);
  type: string = "";
  formSubmitted = false;
  online = false;
  paper=false;
  countrySelected: any = false;
  studyPermitForm!: FormGroup;
  categories: any[] = [
    { key: 1, name: 'Online' },
    { key: 2, name: 'Paper' },
  ];

  countries: any[] = [{ key: 1, name: 'India' }];
  step = 1;
  stepTitle = "";

  private subs = new Subscription();

  public submission: any[] = STUDY_OUTSIDE_SUBMISSION;
  public onlineSubmission: any[] = STUDY_OUTSIDE_APPLY_ONLINE;
  public submissionButton: any[] = submissionButton;
  public paperSubmission: any[] = STUDY_OUTSIDE_APPLY_ON_PAPER;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.studyPermitForm = this.fb.group({
      selectedCategory: ['', Validators.required],
      country: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type')!;
    this.studyPermitForm.get('selectedCategory')?.valueChanges.subscribe((value) => {
      console.log('Selected:', value);
      this.online = value.name === 'Online' ? true : false;
      this.paper= value.name === 'Paper' ? true : false;
    });

    this.submission = STUDY_OUTSIDE_SUBMISSION.map(doc => ({
      ...doc,
      safeHtml: this.sanitizer.bypassSecurityTrustHtml(doc.contentHtml)
    }));

    this.onlineSubmission = STUDY_OUTSIDE_APPLY_ONLINE.map(doc => ({
      ...doc,
      safeHtml: this.sanitizer.bypassSecurityTrustHtml(doc.contentHtml)
    }));

    this.paperSubmission = STUDY_OUTSIDE_APPLY_ON_PAPER.map(doc => ({
      ...doc,
      safeHtml: this.sanitizer.bypassSecurityTrustHtml(doc.contentHtml)
    }));

    this.submissionButton = submissionButton.map(doc => ({
      ...doc,
      safeHtml: this.sanitizer.bypassSecurityTrustHtml(doc.contentHtml)
    }));


    this.subs.add(
      this.route.queryParams.subscribe(q => {
        this.type = this.route.snapshot.queryParams['type']!;
        this.step = this.route.snapshot.queryParams['st']!;
      })
    );
    console.log("TYPE:", this.type);
    console.log("STEPS:", this.step);
  }
  isInvalid(controlName: string) {
    const control = this.studyPermitForm.get(controlName);
    return control?.invalid && this.formSubmitted;
  }
  onSubmit() {
    this.formSubmitted = true;

    if (this.studyPermitForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Form is submitted',
        life: 3000,
      });

      this.studyPermitForm.reset();

      this.formSubmitted = false;
    }
  }

  onSelectCategory(event: any) {
    this.countrySelected = event.value;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}