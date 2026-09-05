import { Component, Input, input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationProgressService } from './../services/application-progress.service';
import { ProcessStep, STATUS, Step } from './../my-application.interface';
import { processSteps, progressSteps } from './application.mock';
import { Messagebox } from './../../messagebox/messagebox';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-application',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Messagebox,
    ToastModule,
    ProgressBarModule
  ],
  templateUrl: './application.html',
  styleUrl: './application.css'
})
export class Application implements OnInit {

  processSteps = processSteps;
  progressSteps = progressSteps;
  progressPercentage = 0;
  showMessage = false;
  msg = '';
  status = "";
  @Input() type!: string;
  newApplication = input(true);
  completedSteps: Record<string, string> = {};

  constructor(
    private progressService: ApplicationProgressService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.showMessage = false;
    this.progressService.getProgress().subscribe(progress => {
      this.completedSteps = progress;

      // 🔥 NEW — Apply enabling logic
      this.applyStepEnableLogic();

      // 🔥 NEW — If step 7 is completed, disable ALL cards
      if (this.completedSteps["7"] === STATUS.COMPLETED) {
        this.disableAllCards();
        this.showMessage = true;
        this.msg = "Your application is fully completed! You can start a new application by logging in as another user";
        this.status = STATUS.COMPLETED;
      }
    });

    this.route.queryParams.subscribe(params => {

      const pageStatus = params['pageStatus'];
      const stepNo = params['stepNo'];

      if (params['msg']) {
        this.msg = params['msg'];
      }

      if (pageStatus) {

        this.processSteps[stepNo].status =
          pageStatus === 'COMPLETED'
            ? STATUS.COMPLETED
            : pageStatus === 'INPROGRESS'
              ? STATUS.INPROGRESS
              : STATUS.NOTSTARTED;

        this.showMessage = this.processSteps[stepNo].status === 'COMPLETED' && stepNo === "7" ? true : false;
        this.status = this.processSteps[stepNo].status;

        // 🔥 NEW — If last step completed, disable ALL cards
        if (stepNo === "7" && this.status === STATUS.COMPLETED) {
          this.disableAllCards();
        }

        // -----------------------------
        // 🔥 SHOW TOASTER (your original code)
        // -----------------------------
        if (this.status === STATUS.NOTSTARTED) {
          this.messageService.add({
            severity: 'error',
            summary: 'Not Started',
            detail: this.msg
          });
        }
        else if (this.status === STATUS.INPROGRESS) {
          this.messageService.add({
            severity: 'warn',
            summary: 'In Progress',
            detail: this.msg
          });
        }
        else if (this.status === STATUS.COMPLETED) {
          this.messageService.add({
            severity: 'success',
            summary: 'Completed',
            detail: this.msg
          });
        }

        // Persist to backend
        this.progressService.updateStep(stepNo.toString(), this.processSteps[stepNo].status)
          .subscribe();

        // Remove query params
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {},
          replaceUrl: true
        });
      }
    });
    this.calculateProgress();
  }

  // ---------------------------------------------------------
  // 🔥 NEW — Step enabling logic (added without touching your code)
  // ---------------------------------------------------------
  applyStepEnableLogic(): void {

    // Disable all steps initially
    this.processSteps.forEach(step => step.disabled = true);

    // Step 0 always enabled
    this.processSteps[0].disabled = false;

    // If step 0 completed → enable steps 1,2,3
    if (this.completedSteps["0"] === STATUS.COMPLETED) {
      this.processSteps[1].disabled = false;
      this.processSteps[2].disabled = false;
      this.processSteps[3].disabled = false;
    }

    // If steps 1,2,3 completed → enable step 4
    if (
      this.completedSteps["1"] === STATUS.COMPLETED &&
      this.completedSteps["2"] === STATUS.COMPLETED &&
      this.completedSteps["3"] === STATUS.COMPLETED
    ) {
      this.processSteps[4].disabled = false;
    }

    // If step 4 completed → enable step 5
    if (this.completedSteps["4"] === STATUS.COMPLETED) {
      this.processSteps[5].disabled = false;
    }

    // If step 5 completed → enable step 6
    if (this.completedSteps["5"] === STATUS.COMPLETED) {
      this.processSteps[6].disabled = false;
    }

    // If step 6 completed → enable step 7
    if (this.completedSteps["6"] === STATUS.COMPLETED) {
      this.processSteps[7].disabled = false;
    }
  }

  // ---------------------------------------------------------
  // 🔥 NEW — Disable ALL cards when step 7 is complete
  // ---------------------------------------------------------
  disableAllCards(): void {
    this.processSteps.forEach(step => step.disabled = true);
  }

  // ---------------------------------------------------------

  goToProcessStep(step: ProcessStep) {
    const st = Number(step.id);
      this.router.navigate(['/update-study-permit'], {
        queryParams: { st, type: this.type, newApplication:this.newApplication() },
        queryParamsHandling: 'merge',
        
      });
  }

  hideMessage() {
    this.showMessage = false;

    // 🔥 NEW — Navigate back when messagebox is closed
    this.router.navigate(['/my-application']);
  }

  goToStep(step: Step) {
    const st = Number(step.id);

    const routes: Record<number, string> = {
      1: '/immigration-outside-ca-eligibility',
      2: '/immigration-outside-ca-documents',
      3: '/immigration-outside-ca-submission',
      4: '/immigration-outside-ca-biometrics',
      5: '/immigration-outside-ca-processing-time',
      6: '/immigration-outside-ca-decision'
    };

    const route = routes[st];

    if (route) {
      this.router.navigate([route], {
        queryParams: { st, type: this.type },
        queryParamsHandling: 'merge'
      });
    }
  }

  private calculateProgress(): void {
    const completedSteps = this.processSteps.filter(d => d.status === STATUS.COMPLETED).length;
    this.progressPercentage = Math.round((completedSteps / this.processSteps.length) * 100);

  }

}
