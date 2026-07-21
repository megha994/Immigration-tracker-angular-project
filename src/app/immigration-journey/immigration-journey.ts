import { Component, Input, OnInit } from '@angular/core';
// import { Card } from 'primeng/card';
import { Router, ActivatedRoute } from '@angular/router';
interface Step {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  icon?: string;
  color?: string;
}
@Component({
  selector: 'app-immigration-journey',
  // imports: [Card],
  templateUrl: './immigration-journey.html',
  styleUrl: './immigration-journey.css',
})
export class ImmigrationJourney implements OnInit {
  @Input() type!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type')!;
  }
  steps: Step[] = [
    {
      id: '1',
      title: 'Eligibility Check',
      description: 'Verify eligibility requirements',
      completed: true,
      icon: 'pi pi-check-circle',
      color: '#61dfc6',
    },
    {
      id: '2',
      title: 'Documents',
      description: 'Gather required documents',
      completed: true,
      icon: 'pi pi-file',
      color: '#eb6a29',
    },
    {
      id: '3',
      title: 'Application Submission',
      description: 'Submit your application',
      completed: false,
      icon: 'pi pi-check-circle',
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
      color: '#f26a55',
    }
  ];

  goToStep(step: Step) {
    const st = Number(step.id);
    if (st == 1) {
      this.router.navigate(['/immigration-outside-ca-eligibility'], {
        queryParams: { st: st, type: this.type },
        queryParamsHandling: 'merge', // optional: merge with existing query params
      });
    } else if (st == 2) {
      this.router.navigate(['/immigration-outside-ca-documents'], {
        queryParams: { st: st, type: this.type },
        queryParamsHandling: 'merge', // optional: merge with existing query params
      });
    }
     else if (st == 3) {
      this.router.navigate(['/immigration-outside-ca-submission'], {
        queryParams: { st: st, type: this.type },
        queryParamsHandling: 'merge' // optional: merge with existing query params
      });
    }
    else if (st == 4) {
      this.router.navigate(['/immigration-outside-ca-biometrics'], {
        queryParams: { st: st, type: this.type },
        queryParamsHandling: 'merge', // optional: merge with existing query params
      });
    }
     else if (st == 5) {
      this.router.navigate(['/immigration-outside-ca-processing-time'], {
        queryParams: { st: st, type: this.type },
        queryParamsHandling: 'merge', // optional: merge with existing query params
      });
    }
     else if (st == 6) {
      this.router.navigate(['/immigration-outside-ca-decision'], {
        queryParams: { st: st, type: this.type },
        queryParamsHandling: 'merge', // optional: merge with existing query params
      });
    }
  }
}
