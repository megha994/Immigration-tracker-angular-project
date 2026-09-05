import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { applicationProgress } from './../my-applications/application/application.mock';
import { MessageService } from 'primeng/api';
import { DashboardService } from './dashboard/dashboard-service.service';

describe('Application service', () => {
    let service: DashboardService;
    let httpClientSpy: any;
    let progressServiceMock: any;
    let routerMock: any;
    let activatedRouteMock: any;
    let queryParams$: Subject<any>;

    const messageServiceMock = {
        add: jest.fn(),
        clear: jest.fn()
    };

    beforeEach(() => {
        service = new DashboardService(httpClientSpy);
        httpClientSpy = {
            get: jest.fn() //create a mock of get service
        }
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



        TestBed.configureTestingModule({
            imports: [],
            providers: [
                DashboardService,
                {
                    provide: MessageService,
                    useValue: messageServiceMock
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

        service = TestBed.createComponent(DashboardService).componentInstance;
    });

    describe('Service Creation', () => {
        it('should create the service', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('getApplicationData ', () => {
        it('should test getApplicationData', () => {
            const res = applicationProgress;
            const url = "/api/dashboardData";
            jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res)); //of is used since the return is an observable 
            service.getApplicationData();
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
            expect(httpClientSpy.get).toHaveBeenCalledWith(url);
        });

    });

    //   getApplicationData

});