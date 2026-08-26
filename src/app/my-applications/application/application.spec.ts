import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { Application } from './application';
import { ApplicationProgressService } from '../services/application-progress.service';
import { processSteps, progressSteps } from './../application/application.mock';
import { STATUS, Step } from './../my-application.interface';
import { MessageService } from 'primeng/api';

describe('Application Component', () => {
  let component: Application;
  let progressServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;
  let queryParams$: Subject<any>;

  const messageServiceMock = {
    add: jest.fn(),
    clear: jest.fn()
  };

  beforeEach(() => {
    progressServiceMock = {
      getProgress: jest
        .fn()
        .mockReturnValue(of({ '0': true, '1': false })),
      updateStep: jest.fn().mockReturnValue(of(true))
    };

    routerMock = {
      navigate: jest.fn(),
      navigateByUrl: jest.fn()
    };

    queryParams$ = new Subject<any>();

    activatedRouteMock = {
      queryParams: queryParams$.asObservable()
    };

    TestBed.configureTestingModule({
      imports: [Application],
      providers: [
        {
          provide: MessageService,
          useValue: messageServiceMock
        },
        {
          provide: ApplicationProgressService,
          useValue: progressServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        }
      ]
    });

    component = TestBed.createComponent(Application).componentInstance;
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('disableAllCards', () => {
    it('should disable all cards', () => {
      component.disableAllCards();

      processSteps.forEach(step => {
        expect(step.disabled).toBe(true);
      });
    });
  });

  describe('applyStepEnableLogic', () => {
    beforeEach(() => {
      component.completedSteps = {};
    });

    it('should enable only step 0 initially', () => {
      component.applyStepEnableLogic();

      expect(component.processSteps[0].disabled).toBe(false);

      for (let i = 1; i < component.processSteps.length; i++) {
        expect(component.processSteps[i].disabled).toBe(true);
      }
    });

    it('should enable steps 1, 2 and 3 when step 0 is completed', () => {
      component.completedSteps['0'] = STATUS.COMPLETED;

      component.applyStepEnableLogic();

      expect(component.processSteps[1].disabled).toBe(false);
      expect(component.processSteps[2].disabled).toBe(false);
      expect(component.processSteps[3].disabled).toBe(false);
    });

    it('should enable step 4 when steps 1, 2 and 3 are completed', () => {
      component.completedSteps['0'] = STATUS.COMPLETED;
      component.completedSteps['1'] = STATUS.COMPLETED;
      component.completedSteps['2'] = STATUS.COMPLETED;
      component.completedSteps['3'] = STATUS.COMPLETED;

      component.applyStepEnableLogic();

      expect(component.processSteps[4].disabled).toBe(false);
    });

    it('should enable step 5 when step 4 is completed', () => {
      component.completedSteps['4'] = STATUS.COMPLETED;

      component.applyStepEnableLogic();

      expect(component.processSteps[5].disabled).toBe(false);
    });

    it('should enable step 6 when step 5 is completed', () => {
      component.completedSteps['5'] = STATUS.COMPLETED;

      component.applyStepEnableLogic();

      expect(component.processSteps[6].disabled).toBe(false);
    });

    it('should enable step 7 when step 6 is completed', () => {
      component.completedSteps['6'] = STATUS.COMPLETED;

      component.applyStepEnableLogic();

      expect(component.processSteps[7].disabled).toBe(false);
    });
  });

  describe('goToProcessStep', () => {
    const step = {
      id: '1',
      title: 'LOA',
      description: 'Apply LOA',
      status: STATUS.COMPLETED,
      icon: 'pi-book',
      color: '#fff',
      disabled: false
    }
    const st = Number(step.id);
    it('should call navigate function', () => {

      component.goToProcessStep(step);

      expect(routerMock.navigate).toHaveBeenCalled();
    });
    it('should navigate to ', () => {

      component.goToProcessStep(step);

      expect(routerMock.navigate).toHaveBeenCalledWith(['/update-study-permit'], { queryParams: { st, type: undefined }, queryParamsHandling: 'merge' });
    });
  });
});