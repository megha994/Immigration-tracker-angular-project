import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface StepProgress {
  stepId: string;
  completed: boolean;
}

export interface CheckboxProgress {
  stepId: string;
  checkboxes: boolean[];
}

@Injectable({ providedIn: 'root' })
export class ApplicationProgressService {

  // In-memory mock database
  private stepCompletion: Record<string, boolean> = {
    '0': false,
    '1': false,
    '2': false
  };

  private checkboxCompletion: Record<string, boolean[]> = {
    '1': [],
    '2': []
  };

  constructor() {}

  /**
   * Mock GET /steps
   */
  getProgress(): Observable<Record<string, boolean>> {
    console.log('Mock GET /steps →', this.stepCompletion);
    return of(this.stepCompletion);
  }

  /**
   * Mock POST /steps
   */
  updateStep(stepId: string, completed: boolean): Observable<any> {
    this.stepCompletion[stepId] = completed;

    console.log('Mock POST /steps →', stepId, completed);

    return of({ success: true });
  }

  /**
   * Mock GET /checkboxes/:stepId
   */
  getCheckboxes(stepId: string): Observable<CheckboxProgress> {
    const saved = this.checkboxCompletion[stepId] || [];

    console.log('Mock GET /checkboxes/' + stepId, saved);

    return of({
      stepId,
      checkboxes: saved
    });
  }

  /**
   * Mock POST /checkboxes
   */
  updateDocsCheckboxes(stepId: string, checkboxes: boolean[]): Observable<any> {
    this.checkboxCompletion[stepId] = [...checkboxes];

    console.log('Mock POST /checkboxes →', stepId, checkboxes);

    return of({ success: true });
  }
}
