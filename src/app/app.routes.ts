import { Routes } from '@angular/router';
import { LayoutComponent } from './layoutcomponent/layoutcomponent';
import { DashboardComponent } from './dashboard/dashboard/dashboard';
import { StudyPermit } from './study-permit/study-permit';
import { Logincomponent } from './logincomponent/logincomponent';
import { SignupComponent } from './signup/signup';
import { ImmigrationJourney } from './immigration-journey/immigration-journey';
import { ImmigrationOutsideCaEligibility } from './immigration-journey/immigration-outside-ca-eligibility/immigration-outside-ca-eligibility';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'study-permit/:type', component: StudyPermit },
      { path: 'login-in', component: Logincomponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'immigration-journey',
        loadComponent: () =>
          import('./immigration-journey/immigration-journey').then((m) => m.ImmigrationJourney,
          ),

      },
      {
        path: 'immigration-outside-ca-eligibility',
        loadComponent: () =>
          import('./immigration-journey/immigration-outside-ca-eligibility/immigration-outside-ca-eligibility').then((m) => m.ImmigrationOutsideCaEligibility,

          ),
      },
      {
        path: 'immigration-outside-ca-documents',
        loadComponent: () =>
          import('./immigration-journey/immigration-outside-ca-documents/immigration-outside-ca-documents').then((m) => m.ImmigrationOutsideCaDocuments,

          ),
      },
      {
        path: 'immigration-outside-ca-submission',
        loadComponent: () =>
          import('./immigration-journey/immigration-outside-ca-submission/immigration-outside-ca-submission').then((m) => m.ImmigrationOutsideCaSubmission,

          ),
      }
    ],
  },
];

