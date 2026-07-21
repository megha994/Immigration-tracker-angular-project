import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationOutsideCaBiometrics } from './immigration-outside-ca-biometrics';

describe('ImmigrationOutsideCaBiometrics', () => {
  let component: ImmigrationOutsideCaBiometrics;
  let fixture: ComponentFixture<ImmigrationOutsideCaBiometrics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmigrationOutsideCaBiometrics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmigrationOutsideCaBiometrics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
