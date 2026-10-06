import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  AfterViewInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';

import { signal } from '@angular/core';

import { AuthService } from './../../authentication/authentication/services/auth-service';
import { dashboardSteps } from './dashboard.intrface';
import { DashboardStateMgtService } from '../dashboard-state-mgt.service';
import { DashboardService } from './dashboard-service.service';
import { PieChartComponent } from '../../charts/pie-chart/pie-chart';
import { Application } from '../../my-applications/application/application';
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
    CardModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  private readonly fb = inject(FormBuilder);

  progressValue = 60;
  successMessage = '';
  application = '';
  type = 'study';
  deadlineColor = 'warning';
  deadlineText = '';

  studyPermitForm!: FormGroup;

  username: any = '';

  chartData = signal<any[]>([]);
  categories = signal<any[]>([]);

  selectedCategory = signal<any>(null);

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

    if (this.authService.consumeLoginToast()) {
      const msg = 'You have successfully logged in!';

      this.successMessage = msg;

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: msg
      });
    }

    // Getting username from logged in user
    this.username = this.authService.getUsername();

    this.studyPermitForm = this.fb.group({
      selectedCategory: [null, Validators.required]
    });

    this.DashboardStateMgtService.restoreIntoForm();

    this.loadCategories();
  }

  loadCategories() {

    this.dashboardService
      .getCategoryData(this.username)
      .subscribe(data => {

        if (data?.categories?.length) {

          this.categories.set(data.categories);

          this.studyPermitForm.patchValue({
            selectedCategory: data.categories[0]
          });

          this.selectedCategory.set(
            data.categories[0].category);
       
          this.getDeadline();
        }
      });

    this.studyPermitForm
      .get('selectedCategory')
      ?.valueChanges.subscribe(value => {

        if (!value) {
          return;
        }

        this.selectedCategory.set(value.category);

        this.DashboardStateMgtService.studyPermitForm.get('selectedCategory')?.setValue(value);

        this.getDeadline();

        this.getChartData();

      });

    const saved = this.DashboardStateMgtService.dashboardFormValue();

    if (saved) {

      this.application = saved.selectedCategory.category;

      const selected = this.categories().find(
        c => c.id === saved.selectedCategory.id
      );

      this.studyPermitForm.patchValue({
        selectedCategory: selected
      });
    }
  }

  getDeadline() {

    this.dashboardService
      .getCategoryDetails(this.selectedCategory(), this.username)
      .subscribe(value => {

        this.deadlineText = value.deadlineTest;
        this.deadlineColor = value.deadlineColor;
      });
  }

  ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.selectedCategory()) {
      this.getChartData();
    }
  }

  getChartData() {
    this.dashboardService
      .getPieChartData(this.selectedCategory(), this.username)
      .subscribe(chart => {

        this.chartData.set(chart);
      });
  }

  onCardClick(card: dashboardSteps) {

    if (!card.disabled) {

      const st = Number(card.id);

      this.router.navigate(
        ['/update-study-permit'],
        {
          queryParams: {
            st,
            type: this.type
          },
          queryParamsHandling: 'merge'
        }
      );
    }
  }
}