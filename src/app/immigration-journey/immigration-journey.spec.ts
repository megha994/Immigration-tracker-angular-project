import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationJourney } from './immigration-journey';

describe('ImmigrationJourney', () => {
  let component: ImmigrationJourney;
  let fixture: ComponentFixture<ImmigrationJourney>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmigrationJourney]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmigrationJourney);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
