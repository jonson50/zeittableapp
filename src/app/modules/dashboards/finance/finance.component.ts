import { ChangeDetectionStrategy, Component, ViewChild, inject, ViewEncapsulation } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSort } from '@angular/material/sort';
import { FinanceService } from './finance.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgIcons as icons } from '../../../core/constants/svg-icons';
import { DashboardMainContainerComponent } from "../../../shared/components/dashboard-main-container/dashboard-main-container.component";
import { tap } from 'rxjs';

@Component({
  selector: 'app-finance',
  standalone: true,
  providers: [
    FinanceService
  ],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressBarModule,
    DashboardMainContainerComponent
  ]
})
export class FinanceComponent {
  readonly _service = inject(FinanceService);

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // Note that we provide the icon here as a string literal here due to a limitation in
    // Stackblitz. If you want to provide the icon from a URL, you can use:
    // `iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('icon.svg'));`
    iconRegistry.addSvgIconLiteral('document_report', sanitizer.bypassSecurityTrustHtml(icons.solid.document_report));
    iconRegistry.addSvgIconLiteral('solid_cog', sanitizer.bypassSecurityTrustHtml(icons.solid.cog));
    iconRegistry.addSvgIconLiteral('export', sanitizer.bypassSecurityTrustHtml(icons.solid.export));
  }

  @ViewChild('recentTransactionsTable', { read: MatSort })
  recentTransactionsTableMatSort!: MatSort;

  data$ = this._service.data$.pipe(
    tap((data) => {
      // Prepare the chart data
      this._prepareChartData(data);
      // Store the table data
      this.recentTransactionsDataSource.data = data.recentTransactions;
    })
  );
  recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  recentTransactionsTableColumns: string[] = ['transactionId', 'date', 'name', 'amount', 'status'];

  ngAfterViewInit(): void {
    // Make the data source sortable
    this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;
  }

  public trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  /**
     * Prepare the chart data from the data
     *
     * @private
     */
  private _prepareChartData(data: any): void {
    // Account balance

  }
}
