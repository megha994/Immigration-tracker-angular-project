
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { TagModule } from 'primeng/tag';
import { STUDY_OUTSIDE_DOC } from './../immigration-journey-mock-data/immigration-outside-ca-study.mock';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-immigration-outside-ca-documents',
  imports: [StepperModule, ButtonModule, CommonModule, TagModule],
  templateUrl: './immigration-outside-ca-documents.html',
  styleUrl: './immigration-outside-ca-documents.css'
})
export class ImmigrationOutsideCaDocuments implements OnInit, OnDestroy {
  step = 1;
  stepTitle = "";

  private subs = new Subscription();
  type: string = "";

  public documents: any[] = STUDY_OUTSIDE_DOC;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.documents = STUDY_OUTSIDE_DOC.map(doc => ({
      ...doc,
      safeHtml: this.sanitizer.bypassSecurityTrustHtml(doc.contentHtml)
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