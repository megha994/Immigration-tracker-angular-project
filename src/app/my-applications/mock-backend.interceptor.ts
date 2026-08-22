import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { applicationProgress } from './application/application.mock';

const stepCompletion: Record<string, boolean> = {
  '0': false,
  '1': false,
  '2': false
};

const checkboxCompletion: Record<string, boolean[]> = {
  '1': [],
  '2': []
};

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('Interceptor hit:', req.method, req.url);

  // GET steps
  if (req.url.includes('/steps') && req.method === 'GET') {
    return of(
      new HttpResponse({
        status: 200,
        body: stepCompletion
      })
    );
  }

  // POST steps
  if (req.url.includes('/steps') && req.method === 'POST') {
    const body = req.body as {
      stepId: string;
      completed: boolean;
    };

    stepCompletion[body.stepId] = body.completed;

    return of(
      new HttpResponse({
        status: 200,
        body: { success: true }
      })
    );
  }

  // GET checkboxes
  if (req.url.includes('/checkboxes/') && req.method === 'GET') {
    const stepId = req.url.split('/').pop()!;

    return of(
      new HttpResponse({
        status: 200,
        body: {
          stepId,
          checkboxes: checkboxCompletion[stepId] || []
        }
      })
    );
  }

  // POST checkboxes
  if (req.url.includes('/checkboxes') && req.method === 'POST') {
    const body = req.body as {
      stepId: string;
      checkboxes: boolean[];
    };

    checkboxCompletion[body.stepId] = [...body.checkboxes];

    return of(
      new HttpResponse({
        status: 200,
        body: {
          success: true
        }
      })
    );
  }

  // DASHBOARD DATA
  if (
    req.method === 'GET' &&
    req.url.includes('/api/dashboardData')
  ) {
    console.log('Returning mock dashboard data');

    return of(
      new HttpResponse({
        status: 200,
        body: applicationProgress
      })
    );
  }

  return next(req);
};