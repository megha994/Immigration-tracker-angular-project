
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
  selector: 'app-my-applications',
  // imports: [Card],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.css',
})
export class MyApplications implements OnInit {
  @Input() type!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
     this.type = this.route.snapshot.queryParams['type']!;
  }
  steps: Step[] = [
    {
      id: '1',
      title: 'Study Permit',
      description: 'Update the progress of your Study Permit Application',
      completed: true,
      icon: 'pi pi-book',
      color: '#1E88E5',
    },
    {
      id: '2',
      title: 'Work Permit',
      description: 'Update the progress of your Work Permit Application',
      completed: true,
      icon: 'pi pi-briefcase',
      color: '#43A047',
    },
    {
      id: '3',
      title: 'Study Permit Extension',
      description: 'Update the progress of your Study Permit Extension Application',
      completed: false,
      icon: 'pi pi-refresh',
      color: '#1565C0',
    },
    {
      id: '4',
      title: 'Work Permit Extension',
      description: 'Update the progress of your Work Permit Extension Application',
      completed: false,
      icon: 'pi pi-refresh',
      color: '#2E7D32',
    },
    {
      id: '5',
      title: 'Permanent Residence',
      description: 'Update the progress of your Permanent Residence Application',
      completed: false,
      icon: 'pi pi-home',
      color: '#8E24AA',
    },
    {
      id: '6',
      title: 'Spousal Work Permit',
      description: 'Update the progress of your Spousal Work Permit Application',
      completed: false,
      icon: 'pi pi-heart',
      color: '#D81B60',
    },
    {
      id: '7',
      title: 'Visitor Visa',
      description: 'Update the progress of your Visitor Visa Application',
      completed: false,
      icon: 'pi pi-send',
      color: '#FB8C00',
    },
    {
      id: '8',
      title: 'Super Visa',
      description: 'Update the progress of your Super Visa Application',
      completed: false,
      icon: 'pi pi-users',
      color: '#6D4C41',
    }
  ];

  goToStep(step: Step) {
    const st = Number(step.id);
    
      this.router.navigate(['/application'], {
        queryParams: { st: st, type: this.type },
        queryParamsHandling: 'merge', // optional: merge with existing query params
      });
    } 
  }
  

