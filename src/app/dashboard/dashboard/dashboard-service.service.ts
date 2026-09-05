import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getCategoryData(username: string): Observable<any> {
    return this.http.get<any>('/api/dashboard-categories', {
      params: {
        username: username
      }
    }).pipe(
      map((res) => {
        console.log('API Response:', res);
        return res;
      })
    );
  }

  getApplicationData(category: any, username: string): Observable<any> {
    return this.http.get<any>('/api/dashboardData', {
      params: {
        category: category,
        username: username
      }
    }).pipe(
      map((res) => {
        console.log('API Response:', res);
        return res;
      })
    );
  }

  getCategoryDetails(category: any, username: string): Observable<any> {
    return this.http.get<any>('/api/categoryData', {
      params: {
        category: category,
        username: username
      }
    }).pipe(
      map((res) => {
        console.log('API Response:', res);
        return res;
      })
    );
  }

  getPieChartData(category: any, username: string): Observable<any[]> {
    return this.getApplicationData(category, username).pipe(
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