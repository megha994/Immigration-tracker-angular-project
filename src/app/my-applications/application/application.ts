import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { ApplicationProgressService } from './../services/application-progress.service';

interface ProcessStep {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  icon?: string;
  color?: string;
}

interface Step {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  icon?: string;
  color?: string;
}

@Component({
  selector: 'app-application',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Dialog],
  templateUrl: './application.html',
  styleUrl: './application.css',
})
export class Application implements OnInit {

  showMessage = false;
  msg = '';
  @Input() type!: string;

  // backend progress map: { "0": true, "1": false, ... }
  completedSteps: Record<string, boolean> = {};

  constructor(
    private progressService: ApplicationProgressService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Load progress from backend
    this.progressService.getProgress().subscribe(progress => {
      this.completedSteps = progress;
    });

    // Handle completion message
    this.route.queryParams.subscribe(params => {
      const pagecompleted = params['pagecompleted'];
      const stepNo = params['stepNo'];

      if (params['msg']) {
        this.msg = params['msg'];
      }
      if (pagecompleted) {
        this.showMessage = true;

        // Mark UI state
        this.processSteps[stepNo].completed = true;

        // Persist to backend
        this.progressService.updateStep(stepNo.toString(), true).subscribe();


        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
          },
          replaceUrl: true
        })

      }
    });
  }

  processSteps: ProcessStep[] = [
    {
      id: '0',
      title: 'Apply for LOA',
      description: 'Apply for LOA at a DLI',
      completed: false,
      icon: 'pi pi-file',
      color: '#b580c4'
    },

    {
      id: '1',
      title: 'Medical',
      description: 'Apply for Medicals',
      completed: false,
      icon: 'pi pi-heart-fill',
      color: '#E53935'
    },

    {
      id: '2',
      title: 'Police Clearance',
      description: 'Get a Police Clearance',
      completed: false,
      icon: 'pi pi-shield',
      color: '#96780c'
    },

    {
      id: '3',
      title: 'Documents To be Submitted',
      description: 'Gather these required documents',
      completed: false,
      icon: 'pi pi-folder-open',
      color: '#44af16'
    },
    {
      id: '4',
      title: 'Fill and Submit Application',
      description: 'Fill out the IRCC Application, upload the documents and Submit',
      completed: false,
      icon: 'pi pi-pencil',
      color: '#555af0'
    },


    {
      id: '5',
      title: 'Biometrics',
      description: 'Schedule for biometrics',
      completed: false,
      icon: 'pi pi-user',
      color: '#1E88E5'
    },
    {
      id: '6',
      title: 'Decision',
      description: 'Receive final decision',
      completed: false,
      icon: 'pi pi-question-circle',
      color: '#f26a55',
    }
  ];

  progressSteps: ProcessStep[] = [
    {
      id: '1',
      title: 'Eligibility Check',
      description: 'Verify eligibility requirements',
      completed: true,
      icon: 'pi pi-check-circle',
      color: '#95ead9',
    },
    {
      id: '2',
      title: 'Documents',
      description: 'Gather required documents',
      completed: true,
      icon: 'pi pi-file',
      color: '#a862cb',
    },
    {
      id: '3',
      title: 'Application Submission',
      description: 'Submit your application',
      completed: false,
      icon: 'pi pi-send',
      color: '#22c55e',
    },
    {
      id: '4',
      title: 'Biometrics',
      description: 'Schedule biometrics',
      completed: false,
      icon: 'pi pi-user',
      color: '#3b82f6',
    },
    {
      id: '5',
      title: 'Processing Time',
      description: 'Find processing Time',
      completed: false,
      icon: 'pi pi-clock deadline-icon',
      color: '#e7d128',
    },
    {
      id: '6',
      title: 'Decision',
      description: 'Receive final decision',
      completed: false,
      icon: 'pi pi-question-circle',
      color: '#eccae4',
    }
  ];

  goToProcessStep(step: ProcessStep) {
    const st = Number(step.id);

    this.router.navigate(['/update-study-permit'], {
      queryParams: { st, type: this.type },
      queryParamsHandling: 'merge'
    });
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
