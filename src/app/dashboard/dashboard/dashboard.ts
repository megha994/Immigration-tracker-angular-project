import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from './../../authentication/authentication/services/auth-service';
import { dashboardSteps } from './dashboard.intrface';
import { dashboardStep } from './dashboard.mock';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DashboardStateMgtService } from '../dashboard-state-mgt.service';

@Component({
  selector: 'app-dashboard',
  imports: [ToastModule, CommonModule, ReactiveFormsModule, ProgressBarModule,RadioButtonModule, CardModule, ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  progressValue = 60;
  successMessage = "";
  application="";
  cards = dashboardStep;
  type = "study"; //should be changed based on ddl value
  deadlineColor = 'warning'; // 'warning' | 'success' | 'danger'
  deadlineText = '5 days left to submit!';
  studyPermitForm!: FormGroup;
  categories: any[] = [
    { key: 1, name: 'Study Permit' },
    { key: 2, name: 'Study Permit Extension' }
  ];
  constructor(private messageService: MessageService, private authService: AuthService, private router: Router,
    private route: ActivatedRoute,private DashboardStateMgtService: DashboardStateMgtService) {

  }

  ngOnInit(): void {
     this.DashboardStateMgtService.restoreIntoForm();
       this.studyPermitForm = this.fb.group({
      selectedCategory: ['', Validators.required]
    });
     this.studyPermitForm.get('selectedCategory')?.valueChanges.subscribe((value) => {
      this.application = value.name;
    });

    if (this.authService.consumeLoginToast()) {
      const msg = "You have successfully logged in!";
      this.successMessage = msg;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: msg
      });
    }
    const saved = this.DashboardStateMgtService.dashboardFormValue();
    if (saved) {
      this.application = saved.selectedCategory.name;

      const selected = this.categories.find(c => c.key === saved.selectedCategory.key);

      this.studyPermitForm.patchValue({
        country: saved.country,
        selectedCategory: selected
      });
      // this.onRadioChange(saved.selectedCategory);
    }
  }
  onRadioChange(value: string) {
    this.studyPermitForm.get('selectedCategory')?.setValue(value);
    this.DashboardStateMgtService.studyPermitForm.get('selectedCategory')?.setValue(value);
  }


  onCardClick(card: dashboardSteps) {
    if (!card.disabled) {
      const st = Number(card.id);

      this.router.navigate(['/update-study-permit'], {
        queryParams: { st, type: this.type },
        queryParamsHandling: 'merge'
      });
    }
  }
}

