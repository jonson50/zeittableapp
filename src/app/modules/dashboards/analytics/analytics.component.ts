import { Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SERIES } from './data-1';
import { DashboardMainContainerComponent } from '../../../shared/components/dashboard-main-container/dashboard-main-container.component';

export type YRange = { min: number; max: number };

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    MatMenuModule,
    MatRippleModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatIconModule,
    ScrollingModule,
    DashboardMainContainerComponent
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  private readonly destroyRef = inject(DestroyRef)

  clientView = new FormControl('thisMonth');


  ngOnInit() {
  }

  public generateDayWiseTimeSeries(baseval: number, count: number, yrange: YRange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  };
}
