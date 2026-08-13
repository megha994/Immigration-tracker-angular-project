import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { ApplicationProgressService } from './../services/application-progress.service';
import { ProcessStep, STATUS, Step } from './../my-application.interface';
import { processSteps, progressSteps } from './application.mock';
import { Messagebox } from './../../messagebox/messagebox';
@Component({
  selector: 'app-application',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Messagebox],
  templateUrl: './application.html',
  styleUrl: './application.css',
})
export class Application implements OnInit {
  processSteps = processSteps;
  progressSteps = progressSteps;
  showMessage = false;
  msg = '';
  status = "";
  @Input() type!: string;

  // backend progress map: { "0": true, "1": false, ... }
  completedSteps: Record<string, string> = {};

  constructor(
    private progressService: ApplicationProgressService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Load progress from backend
    this.showMessage = false;
    this.progressService.getProgress().subscribe(progress => {
      this.completedSteps = progress;
    });

    // Handle completion message
    this.route.queryParams.subscribe(params => {
      const pageStatus = params['pageStatus'];
      const stepNo = params['stepNo'];
      if (params['msg']) {
        this.msg = params['msg'];
      }
      if (pageStatus) {
        this.showMessage = true;
        // Mark UI state
        this.processSteps[stepNo].status =
          pageStatus === 'COMPLETED' ?
            STATUS.COMPLETED : pageStatus === 'INPROGRESS' ? STATUS.INPROGRESS : STATUS.NOTSTARTED;
        this.status = this.processSteps[stepNo].status;
        // Persist to backend
        this.progressService.updateStep(stepNo.toString(), this.processSteps[stepNo].status).subscribe();


        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
          },
          replaceUrl: true
        })

      }
    });
  }

  goToProcessStep(step: ProcessStep) {
    const st = Number(step.id);

    this.router.navigate(['/update-study-permit'], {
      queryParams: { st, type: this.type },
      queryParamsHandling: 'merge'
    });
  }
  
  hideMessage() {
    this.showMessage = false;
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
}
