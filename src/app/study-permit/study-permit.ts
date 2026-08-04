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
import { StudyPermitStateMgtService } from './study-permit-state-mgt-service.service';
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
  outside = false;
  countrySelected: any = false;
  studyPermitForm!: FormGroup;
  categories: any[] = [
    { key: 1, name: 'Inside Canada' },
    { key: 2, name: 'Outside Canada' },
    { key: 3, name: 'Port of Entry' },
  ];

  countries: any[] = [{ key: 1, name: 'India' }];
  constructor(private route: ActivatedRoute, private studyPermitStateMgtService: StudyPermitStateMgtService) {

  }
  ngOnInit() {
    this.studyPermitForm = this.fb.group({
      selectedCategory: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.type = this.route.snapshot.paramMap.get('type')!;
    this.studyPermitForm.get('selectedCategory')?.valueChanges.subscribe((value) => {
      this.outside = value.name === 'Outside Canada' ? true : false;
    });

    const saved = this.studyPermitStateMgtService.studyPermitFormValue();
    if (saved) {
      this.outside = saved.selectedCategory.name === 'Outside Canada' ? true : false;
      this.countrySelected = saved.country;

      const selected = this.categories.find(c => c.key === saved.selectedCategory.key);

      this.studyPermitForm.patchValue({
        country: saved.country,
        selectedCategory: selected
      });
      // this.onRadioChange(saved.selectedCategory);
    }
  }


  onSelectCategory(value: string) {
    this.countrySelected = value;
    this.studyPermitForm.get('country')?.setValue(value);
    this.studyPermitStateMgtService.studyPermitForm.get('country')?.setValue(value);
  }

  onRadioChange(value: string) {
    this.studyPermitForm.get('selectedCategory')?.setValue(value);
    this.studyPermitStateMgtService.studyPermitForm.get('selectedCategory')?.setValue(value);
  }


}
