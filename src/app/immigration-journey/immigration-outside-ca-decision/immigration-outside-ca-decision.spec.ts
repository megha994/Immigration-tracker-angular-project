import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationOutsideCaDecision } from './immigration-outside-ca-decision';

describe('ImmigrationOutsideCaDecision', () => {
  let component: ImmigrationOutsideCaDecision;
  let fixture: ComponentFixture<ImmigrationOutsideCaDecision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmigrationOutsideCaDecision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmigrationOutsideCaDecision);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
