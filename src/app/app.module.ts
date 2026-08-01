import { NgModule, NO_ERRORS_SCHEMA, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { App } from './app';
import { routes } from './app.routes';

// Components (non-standalone)
import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar';
import { DashboardComponent } from './dashboard/dashboard/dashboard';
import { LayoutComponent } from './layoutcomponent/layoutcomponent';
import { Headerr } from './headerr/headerr';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Service Worker
import { ServiceWorkerModule } from '@angular/service-worker';

// NgRx Store
import { StoreModule } from '@ngrx/store';
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAWixxBydXaF4NOnlSKpEYAXp302e-38zM",
  authDomain: "immigration-tracker-a8eea.firebaseapp.com",
  projectId: "immigration-tracker-a8eea",
  storageBucket: "immigration-tracker-a8eea.firebasestorage.app",
  messagingSenderId: "416560516026",
  appId: "1:416560516026:web:29999fb4c803c7050deb83",
  measurementId: "G-63ETXBW7EX"
};

@NgModule({
  declarations: [
    App,
    Headerr,
    LayoutComponent,
    NavigationBarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,

    // Routing
    RouterModule.forRoot(routes),

    // PrimeNG
    CardModule,
    ProgressBarModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    RadioButtonModule,
    ToastModule,

    // NgRx Store
    StoreModule.forRoot({
    }),

    // Service Worker
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),

    // Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
  bootstrap: [App],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
