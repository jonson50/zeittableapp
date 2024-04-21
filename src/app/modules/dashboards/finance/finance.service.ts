import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { finance as financeData } from '../../../shared/mock-services/dashboards/finance/data';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private _httpClient = inject(HttpClient);
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private _finance: any = financeData;

  /**
     * Getter for data
     */
  get data$(): Observable<any>
  {
      //return this._data.asObservable();
      return of(this._finance);
  }
  /**
     * Get data
     */
  public getData(): Observable<any> {
      /* return this._httpClient.get('api/dashboards/finance').pipe(
          tap((response: any) => {
            console.log('yyyy')
              this._data.next(response);
          })
      ); */
      return of(this._finance);
  }
}
