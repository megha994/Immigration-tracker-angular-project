import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { Application } from './application';
import { ApplicationProgressService } from '../services/application-progress.service';

describe('Application Component', () => {

  let component: Application;
  let progressServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  // A subject lets us push query params manually
  let queryParams$: Subject<any>;

  beforeEach(() => {

    // Mock progress service
    progressServiceMock = {
      getProgress: jest.fn().mockReturnValue(of({ "0": true, "1": false })),
      updateStep: jest.fn().mockReturnValue(of(true))
    };

    // Mock router
    routerMock = {
      navigate: jest.fn()
    };

    // Mock ActivatedRoute
    queryParams$ = new Subject();
    activatedRouteMock = {
      queryParams: queryParams$.asObservable()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ApplicationProgressService, useValue: progressServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    });

    component = TestBed.createComponent(Application).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it.only('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  })

});




