// // import { Component, inject } from '@angular/core';
// // import { StepperModule } from 'primeng/stepper';
// // import { ButtonModule } from 'primeng/button';
// // @Component({
// //   selector: 'app-immigration-outside-ca-eligibility',
// //   imports: [ StepperModule, ButtonModule],
// //   templateUrl: './immigration-outside-ca-eligibility.html',
// //   standalone: true,
// //   styleUrl: './immigration-outside-ca-eligibility.css',
// // })
// // export class ImmigrationOutsideCaEligibility {



// // }

// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { ButtonModule } from 'primeng/button';
// import { StepperModule } from 'primeng/stepper';

// @Component({
//   selector: 'app-immigration-outside-ca-eligibility',
//   imports: [StepperModule, ButtonModule, CommonModule],
//   templateUrl: './immigration-outside-ca-eligibility.html',
//   styleUrl: './immigration-outside-ca-eligibility.css'
// })
// export class ImmigrationOutsideCaEligibility implements OnInit, OnDestroy {
//   step = 1;
//   private subs = new Subscription();
//   type: string = "";
//   constructor(private route: ActivatedRoute) { }

//   ngOnInit() {
//     // subscribe so the component updates when query params change
//     this.subs.add(
//       this.route.queryParams.subscribe(q => {
//         this.type = this.route.snapshot.queryParams['type']!;
//         this.step = this.route.snapshot.queryParams['st']!;
//       })
//     );
//     console.log("TYPE:", this.type);
//     console.log("STEPS:", this.step);
//   }


//   ngOnDestroy() {
//     this.subs.unsubscribe();
//   }
// }


import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { TagModule } from 'primeng/tag';
import { STUDY_OUTSIDE_ELIGIBLE } from './../immigration-journey-mock-data/immigration-outside-ca-study.mock';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-immigration-outside-ca-eligibility',
  imports: [StepperModule, ButtonModule, CommonModule, TagModule],
  templateUrl: './immigration-outside-ca-eligibility.html',
  styleUrl: './immigration-outside-ca-eligibility.css'
})
export class ImmigrationOutsideCaEligibility implements OnInit, OnDestroy {
  step = 1;
  stepTitle = "";

  private subs = new Subscription();
  type: string = "";

  public eligibility: any[] = STUDY_OUTSIDE_ELIGIBLE;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.eligibility = STUDY_OUTSIDE_ELIGIBLE.map(eligible => ({
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