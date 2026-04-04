import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPermit } from './study-permit';

describe('StudyPermit', () => {
  let component: StudyPermit;
  let fixture: ComponentFixture<StudyPermit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyPermit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyPermit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
