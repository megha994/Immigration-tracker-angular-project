import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationOutsideCaProcessingTime } from './immigration-outside-ca-processing-time';

describe('ImmigrationOutsideCaProcessingTime', () => {
  let component: ImmigrationOutsideCaProcessingTime;
  let fixture: ComponentFixture<ImmigrationOutsideCaProcessingTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmigrationOutsideCaProcessingTime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmigrationOutsideCaProcessingTime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
