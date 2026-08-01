import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

// In-memory mock database
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

  // ============================
  // GET /steps
  // ============================
  if (req.url.endsWith('/steps') && req.method === 'GET') {
    return of(
      new HttpResponse({
        status: 200,
        body: stepCompletion
      })
    );
  }

  // ============================
  // POST /steps
  // ============================
  if (req.url.endsWith('/steps') && req.method === 'POST') {
    const body = req.body as { stepId: string; completed: boolean };

    stepCompletion[body.stepId] = body.completed;

    return of(
      new HttpResponse({
        status: 200,
        body: { success: true }
      })
    );
  }

  // ============================
  // GET /checkboxes/:stepId
  // ============================
  if (req.url.includes('/checkboxes/') && req.method === 'GET') {
    const stepId = req.url.split('/').pop()!;
    const saved = checkboxCompletion[stepId] || [];

    return of(
      new HttpResponse({
        status: 200,
        body: {
          stepId,
          checkboxes: saved
        }
      })
    );
  }

  // ============================
  // POST /checkboxes
  // ============================
  if (req.url.endsWith('/checkboxes') && req.method === 'POST') {
    const body = req.body as { stepId: string; checkboxes: boolean[] };

    checkboxCompletion[body.stepId] = [...body.checkboxes];

    return of(
      new HttpResponse({
        status: 200,
        body: { success: true }
      })
    );
  }

  // ============================
  // Pass through all other requests
  // ============================
  return next(req);
};
