import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationOutsideCaDocuments } from './immigration-outside-ca-documents';

describe('ImmigrationOutsideCaDocuments', () => {
  let component: ImmigrationOutsideCaDocuments;
  let fixture: ComponentFixture<ImmigrationOutsideCaDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmigrationOutsideCaDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmigrationOutsideCaDocuments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
