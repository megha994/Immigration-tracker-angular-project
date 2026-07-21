import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { TagModule } from 'primeng/tag';
import { STUDY_OUTSIDE_BIOMETRICS } from './../immigration-journey-mock-data/immigration-outside-ca-study.mock';
import { DomSanitizer } from '@angular/platform-browser';
import {bioSTUDY_OUTSIDE_BIO_FEES}from './../immigration-journey-mock-data/immigration-outside-ca-study.mock';
import { STUDY_OUTSIDE_BIO } from './../immigration-journey-mock-data/immigration-outside-ca-study.mock';
@Component({
  selector: 'app-immigration-outside-ca-biometrics',
  imports: [StepperModule, ButtonModule, CommonModule, TagModule],
  templateUrl: './immigration-outside-ca-biometrics.html',
  styleUrl: './immigration-outside-ca-biometrics.css',
})
export class ImmigrationOutsideCaBiometrics implements OnInit, OnDestroy {
  step = 1;
  stepTitle = '';

  private subs = new Subscription();
  type: string = '';

  public biometrics: any[] = STUDY_OUTSIDE_BIOMETRICS;
  public biometric: any[] = STUDY_OUTSIDE_BIO;
  public bioFees: any[] = bioSTUDY_OUTSIDE_BIO_FEES;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.biometrics = STUDY_OUTSIDE_BIOMETRICS.map((bio) => ({
      ...bio,
      safeHtml: this.sanitizer.bypassSecurityTrustHtml(bio.contentHtml),
    }));

    this.biometric = STUDY_OUTSIDE_BIO.map((bio) => ({
      ...bio,
      safeHtml: this.sanitizer.bypassSecurityTrustHtml(bio.contextHtml),
    }));
this.bioFees = bioSTUDY_OUTSIDE_BIO_FEES.map((bio) => ({
      ...bio,
      safeHtml: this.sanitizer.bypassSecurityTrustHtml(bio.contextHtml),
    }));

    this.subs.add(
      this.route.queryParams.subscribe((q) => {
        this.type = this.route.snapshot.queryParams['type']!;
        this.step = this.route.snapshot.queryParams['st']!;
      }),
    );
    console.log('TYPE:', this.type);
    console.log('STEPS:', this.step);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
