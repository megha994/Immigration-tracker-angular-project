import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { App } from './app';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar';
import { DashboardComponent } from './dashboard/dashboard/dashboard';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layoutcomponent/layoutcomponent';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Headerr } from './headerr/headerr';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Firebase configuration (replace with your actual config)
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
    CardModule,
    ProgressBarModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    RadioButtonModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
  ],

  bootstrap: [App],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ],
})
export class AppModule {}
