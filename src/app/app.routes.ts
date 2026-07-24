import { Routes } from '@angular/router';

import { LayoutComponent } from './layoutcomponent/layoutcomponent';
import { DashboardComponent } from './dashboard/dashboard/dashboard';
import { StudyPermit } from './study-permit/study-permit';
import { LoginComponent } from './authentication/authentication/logincomponent';
import { SignupComponent } from './signup/signup';
import { AuthGuard } from './../app/authentication/authentication/guards/auth-guard-guard';

import { ImmigrationJourney } from './immigration-journey/immigration-journey';
import { ImmigrationOutsideCaEligibility } from './immigration-journey/immigration-outside-ca-eligibility/immigration-outside-ca-eligibility';

import { MyApplications } from './my-applications/my-applications/my-applications';

export const routes: Routes = [

  // -------------------------
  // Public routes
  // -------------------------
  { path: 'login-in', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // -------------------------
  // Protected layout routes
  // -------------------------
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [

      { path: 'dashboard', component: DashboardComponent },

      { path: 'study-permit/:type', component: StudyPermit },

      // ⭐ FIXED: my-applications is a normal child route
      { path: 'my-applications', component: MyApplications },

      // ⭐ FIXED: application is now a top-level lazy-loaded route
      {
        path: 'application',
        loadComponent: () =>
          import('./my-applications/application/application')
            .then(m => m.Application)
      },

      // Immigration Journey Routes
      {
        path: 'immigration-journey',
        loadComponent: () =>
          import('./immigration-journey/immigration-journey')
            .then(m => m.ImmigrationJourney)
      },

      {
        path: 'immigration-outside-ca-eligibility',
        loadComponent: () =>
          import('./immigration-journey/immigration-outside-ca-eligibility/immigration-outside-ca-eligibility')
            .then(m => m.ImmigrationOutsideCaEligibility)
      },

      {
        path: 'immigration-outside-ca-documents',
        loadComponent: () =>
          import('./immigration-journey/immigration-outside-ca-documents/immigration-outside-ca-documents')
            .then(m => m.ImmigrationOutsideCaDocuments)
      },

      {
        path: 'immigration-outside-ca-submission',
        loadComponent: () =>
          import('./immigration-journey/immigration-outside-ca-submission/immigration-outside-ca-submission')
            .then(m => m.ImmigrationOutsideCaSubmission)
      },

      {
        path: 'immigration-outside-ca-biometrics',
        loadComponent: () =>
          import('./immigration-journey/immigration-outside-ca-biometrics/immigration-outside-ca-biometrics')
            .then(m => m.ImmigrationOutsideCaBiometrics)
      },

      {
        path: 'immigration-outside-ca-processing-time',
        loadComponent: () =>
          import('./immigration-journey/immigration-outside-ca-processing-time/immigration-outside-ca-processing-time')
            .then(m => m.ImmigrationOutsideCaProcessingTime)
      },

      {
        path: 'immigration-outside-ca-decision',
        loadComponent: () =>
          import('./immigration-journey/immigration-outside-ca-decision/immigration-outside-ca-decision')
            .then(m => m.ImmigrationOutsideCaDecision)
      },

      // Default redirect
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Catch-all
  { path: '**', redirectTo: 'dashboard' }
];
