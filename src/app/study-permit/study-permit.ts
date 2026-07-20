import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ImmigrationJourney } from './../immigration-journey/immigration-journey';
@Component({
  selector: 'app-study-permit',
  standalone: true,
  imports: [
    SelectModule,
    MessageModule,
    RadioButtonModule,
    ToastModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    ImmigrationJourney,
  ],
  providers: [MessageService],
  templateUrl: './study-permit.html',
  styleUrls: ['./study-permit.css'],
})
export class StudyPermit implements OnInit {
  private readonly messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);
  type: string = "";
  formSubmitted = false;
  outside = false;
  countrySelected: any = false;
  studyPermitForm!: FormGroup;
  categories: any[] = [
    { key: 1, name: 'Inside Canada' },
    { key: 2, name: 'Outside Canada' },
    { key: 3, name: 'Port of Entry' },
  ];

  countries: any[] = [{ key: 1, name: 'India' }];
  constructor(private route: ActivatedRoute) {
    this.studyPermitForm = this.fb.group({
      selectedCategory: ['', Validators.required],
      country: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type')!;
    this.studyPermitForm.get('selectedCategory')?.valueChanges.subscribe((value) => {
      console.log('Selected:', value);
      this.outside = value.name === 'Outside Canada' ? true : false;
    });
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
}
