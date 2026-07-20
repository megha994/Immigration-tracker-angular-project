import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationOutsideCaSubmission } from './immigration-outside-ca-submission';

describe('ImmigrationOutsideCaSubmission', () => {
  let component: ImmigrationOutsideCaSubmission;
  let fixture: ComponentFixture<ImmigrationOutsideCaSubmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmigrationOutsideCaSubmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmigrationOutsideCaSubmission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
