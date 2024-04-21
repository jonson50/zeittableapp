import { Injectable } from '@angular/core';
import { finance as financeData } from './data';
import { MockApiService } from '../../../../core/mock-api/mock-api.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceMockApi {
  private _finance: any = financeData;

  /**
   * Constructor
   */
  constructor(private _mockApiService: MockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Sales - GET
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onGet('api/dashboards/finance')
      .reply(() => [200, [...this._finance]]);
  }
}
