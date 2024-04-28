import { ChangeDetectionStrategy, Component } from '@angular/core';

import { tap } from 'rxjs';

@Component({
  selector: 'app-finance',
  standalone: true,
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
  ]
})
export class FinanceComponent {

}
