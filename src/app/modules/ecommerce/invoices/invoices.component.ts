import { Component, inject } from '@angular/core';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { Invoice1Component } from './components/invoice1/invoice1.component';
import { Invoice2Component } from './components/invoice2/invoice2.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    MatDialogModule,
    Invoice1Component,
    Invoice2Component
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        disableClose: true
      }
    }
  ],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent {
  private _dialog = inject(MatDialog);


  public openDialog1() {
    const dialogConfig: MatDialogConfig = {}; // important to use this method.
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = 'dialog';
    const dialogRef = this._dialog.open(Invoice1Component, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public openDialog2() {
    const dialogConfig: MatDialogConfig = {}; // important to use this method.
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = 'dialog';
    const dialogRef = this._dialog.open(Invoice2Component, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
