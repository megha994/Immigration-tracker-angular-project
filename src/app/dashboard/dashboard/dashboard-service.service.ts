import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getApplicationData(): Observable<any> {
    return this.http.get<any>('/api/dashboardData').pipe(
      map((res) => {
        console.log('API Response:', res);
        return res;
      })
    );
  }

  getPieChartData(): Observable<any[]> {
    return this.getApplicationData().pipe(
      map((response: any) => {

        const steps = response.applicationProgress || [];

        return steps.map((step: any) => {
          let numericValue = 0;

          switch (step.status) {
            case 'COMPLETED':
              numericValue = 2;
              break;

            case 'INPROGRESS':
              numericValue = 1;
              break;

            default:
              numericValue = 0;
          }

          return {
            name: step.title,
            value: numericValue,
            itemStyle: {
              color: step.color
            }
          };
        });
      })
    );
  }
}