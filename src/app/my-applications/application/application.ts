

import { Component, Input, OnInit } from '@angular/core';
// import { Card } from 'primeng/card';
import { Router, ActivatedRoute } from '@angular/router';
import { Dialog } from 'primeng/dialog';
interface ProcessStep {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  icon?: string;
  color?: string;
}
@Component({
  selector: 'app-application',
  imports: [Dialog],
  templateUrl: './application.html',
  styleUrl: './application.css',
})
export class Application implements OnInit {
  showMessage: boolean = false;
  @Input() type!: string;
  msg: string = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const pagecompleted = params['pagecompleted'];
      const stepNo = params['stepNo'];
      this.msg = params['msg'];
      if (pagecompleted) {
        // You can show a message, trigger animation, etc.
        this.showMessage = true;
        this.processSteps[stepNo].completed = true;
      }
    });
    this.type = this.route.snapshot.queryParams['type']!;

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
      title: 'Documents To be Submitted',
      description: 'Gather these required documents',
      completed: false,
      icon: 'pi pi-folder-open',
      color: '#7ae1d6'
    },
    {
      id: '2',
      title: 'Fill Application',
      description: 'Fill out the IRCC Application and upload the documents',
      completed: false,
      icon: 'pi pi-pencil',
      color: '#8996e5'
    },
    {
      id: '3',
      title: 'Medical',
      description: 'Apply for Medicals',
      completed: false,
      icon: 'pi pi-heart-fill',
      color: '#E53935'
    },
    {
      id: '4',
      title: 'Biometrics',
      description: 'Schedule for biometrics',
      completed: false,
      icon: 'pi pi-user',
      color: '#1E88E5'
    },
    {
      id: '5',
      title: 'Police Clearance',
      description: 'Get a Police Clearance',
      completed: false,
      icon: 'pi pi-shield',
      color: '#c26546'
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

  goToStep(step: ProcessStep) {
    const st = Number(step.id);
    this.router.navigate(['/update-study-permit'], {
      queryParams: { st: st, type: this.type },
      queryParamsHandling: 'merge', // optional: merge with existing query params
    });
  }
}
