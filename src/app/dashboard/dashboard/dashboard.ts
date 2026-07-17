import { Component } from '@angular/core';


interface ProgressCard {
  title: string;
  icon: string;
  status: 'done' | 'pending';
  clickable: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent {

  progressValue = 60;

  cards: ProgressCard[] = [
    { title: 'Application Filled', icon: 'pi pi-check-circle', status: 'done', clickable: true },
    { title: 'Documents Submitted', icon: 'pi pi-file', status: 'done', clickable: true },
    { title: 'PCC Completed', icon: 'pi pi-shield', status: 'done', clickable: true },
    { title: 'Photo Uploaded', icon: 'pi pi-camera', status: 'done', clickable: true },
    { title: 'Fees Paid', icon: 'pi pi-credit-card', status: 'done', clickable: true },
    {
      title: 'Medical Certificate Uploaded',
      icon: 'pi pi-heart',
      status: 'done',
      clickable: true,
    },
    { title: 'Biometrics Appointment', icon: 'pi pi-calendar', status: 'done', clickable: true },
  ];

  deadlineColor = 'warning'; // 'warning' | 'success' | 'danger'
  deadlineText = '5 days left to submit!';

  onCardClick(card: ProgressCard): void {
    if (!card.clickable) {
      return;
    }
    console.log('Card clicked:', card.title);
    // implement routing/logic later
  }
}
