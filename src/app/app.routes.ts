import { Routes } from '@angular/router';
import { LayoutComponent } from './layoutcomponent/layoutcomponent';
import { DashboardComponent } from './dashboard/dashboard/dashboard';
import { StudyPermit } from './study-permit/study-permit';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'study-permit', component: StudyPermit },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
