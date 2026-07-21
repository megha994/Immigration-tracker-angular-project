

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { TagModule } from 'primeng/tag';
import { STUDY_OUTSIDE_PROCESSINGTIME } from './../immigration-journey-mock-data/immigration-outside-ca-study.mock';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-immigration-outside-ca-processing-time',
  imports: [StepperModule, ButtonModule, CommonModule, TagModule],
  templateUrl: './immigration-outside-ca-processing-time.html',
  styleUrl: './immigration-outside-ca-processing-time.css'
})
export class ImmigrationOutsideCaProcessingTime implements OnInit, OnDestroy {
  step = 1;
  stepTitle = "";

  private subs = new Subscription();
  type: string = "";

  public processingTime: any[] = STUDY_OUTSIDE_PROCESSINGTIME;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.processingTime = STUDY_OUTSIDE_PROCESSINGTIME.map(eligible => ({
      ...eligible,
      safeHtml: this.sanitizer.bypassSecurityTrustHtml(eligible.contentHtml)
    }));

    this.subs.add(
      this.route.queryParams.subscribe(q => {
        this.type = this.route.snapshot.queryParams['type']!;
        this.step = this.route.snapshot.queryParams['st']!;
      })
    );
    console.log("TYPE:", this.type);
    console.log("STEPS:", this.step);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}