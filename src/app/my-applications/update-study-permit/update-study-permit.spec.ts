import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudyPermit } from './update-study-permit';

describe('UpdateStudyPermit', () => {
  let component: UpdateStudyPermit;
  let fixture: ComponentFixture<UpdateStudyPermit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStudyPermit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudyPermit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
