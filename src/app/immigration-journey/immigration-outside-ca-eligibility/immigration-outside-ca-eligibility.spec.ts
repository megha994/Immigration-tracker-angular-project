import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationOutsideCaEligibility } from './immigration-outside-ca-eligibility';

describe('ImmigrationOutsideCaEligibility', () => {
  let component: ImmigrationOutsideCaEligibility;
  let fixture: ComponentFixture<ImmigrationOutsideCaEligibility>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmigrationOutsideCaEligibility]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmigrationOutsideCaEligibility);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
