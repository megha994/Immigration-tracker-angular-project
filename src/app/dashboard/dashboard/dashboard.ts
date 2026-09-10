import { Component, OnInit, ChangeDetectionStrategy, inject, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
import { PieChartComponent } from '../../charts/pie-chart/pie-chart';
import { DashboardService } from './dashboard-service.service';
import { signal } from '@angular/core';
import { Application } from "../../my-applications/application/application";
import { ApiService } from './../../services/api';
@Component({
  selector: 'app-dashboard',
  providers: [ApiService],
  imports: [
    PieChartComponent,
    ToastModule,
    CommonModule,
    ReactiveFormsModule,
    ProgressBarModule,
    RadioButtonModule,
    CardModule,
    Application
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  private readonly fb = inject(FormBuilder);
  progressValue = 60;
  successMessage = "";
  application = "";
  cards = dashboardStep;
  type = "study";
  deadlineColor = 'warning';
  deadlineText = "";
  studyPermitForm!: FormGroup;
  username: any = "";
  chartData = signal<any[]>([]);
  categories = signal<any[]>([]);

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
      private apiService: ApiService,
    private route: ActivatedRoute,
    private DashboardStateMgtService: DashboardStateMgtService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {

    this.apiService.getSmile().subscribe({

      next: (data) => {

        console.log('Backend Response:', data);

      },

      error: (err) => {

        console.error(err);

      }

    });

  
this.DashboardStateMgtService.restoreIntoForm();
//Getting username from logged in 
this.username = this.authService.getUsername();
//getting categories from service using username
this.dashboardService.getCategoryData(this.username).subscribe(data => {
  this.categories.set(data.categories);

});
this.studyPermitForm = this.fb.group({
  selectedCategory: [this.categories()[0], Validators.required]
});

this.studyPermitForm.get('selectedCategory')?.valueChanges.subscribe((value) => {
  this.application = value.category;
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
  this.application = saved.selectedCategory.category;
  const selected = this.categories().find(c => c.id === saved.selectedCategory.id);

  this.studyPermitForm.patchValue({
    selectedCategory: selected
  });
}
if (this.studyPermitForm.controls['selectedCategory'].value) {
  const category = this.studyPermitForm.controls['selectedCategory'].value;
  // 5 days left to submit!
  this.dashboardService.getCategoryDetails(category, this.username).subscribe((value) => {
    this.deadlineText = value.deadlineTest;
    this.deadlineColor = value.deadlineColor;
  });
}
  }

ngAfterViewInit() {
  if (!isPlatformBrowser(this.platformId)) return;
  const category = this.studyPermitForm.controls['selectedCategory'].value;
  this.dashboardService.getPieChartData(category, this.username).subscribe(chart => {
    this.chartData.set(chart);
  });
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
