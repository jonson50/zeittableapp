import { Component } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-invoice1',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './invoice1.component.html',
  styleUrl: './invoice1.component.scss'
})
export class Invoice1Component {
  constructor(
    public dialogRef: MatDialogRef<Invoice1Component>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
