import { provideTaiga } from '@taiga-ui/core';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { App } from './app';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar';
import { DashboardComponent } from './dashboard/dashboard/dashboard';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { StudyPermit } from './study-permit/study-permit';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layoutcomponent/layoutcomponent';
import { TuiRadioList } from '@taiga-ui/kit';
import { TuiRoot } from '@taiga-ui/core';

@NgModule({
  declarations: [App, LayoutComponent, NavigationBarComponent, DashboardComponent, StudyPermit],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRadioList,
    ReactiveFormsModule,
    CommonModule,
    // TuiRoot,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [App],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [provideTaiga()],
})
export class AppModule {}
