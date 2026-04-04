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
    { title: 'Application Filled', icon: 'assignment_turned_in', status: 'done', clickable: true },
    { title: 'Documents Submitted', icon: 'description', status: 'done', clickable: true },
    { title: 'PCC Completed', icon: 'verified', status: 'done', clickable: true },
    { title: 'Photo Uploaded', icon: 'photo_camera', status: 'done', clickable: true },
    { title: 'Fees Paid', icon: 'payment', status: 'done', clickable: true },
    {
      title: 'Medical Certificate Uploaded',
      icon: 'medical_services',
      status: 'done',
      clickable: true,
    },
    { title: 'Biometrics Appointment', icon: 'calendar_today', status: 'done', clickable: true },
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
