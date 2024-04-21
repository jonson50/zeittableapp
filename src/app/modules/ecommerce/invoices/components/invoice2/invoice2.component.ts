import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice2',
  standalone: true,
  imports: [
    CommonModule ,
    MatDialogModule
  ],
  templateUrl: './invoice2.component.html',
  styleUrl: './invoice2.component.scss'
})
export class Invoice2Component {
  constructor(
    public dialogRef: MatDialogRef<Invoice2Component>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }
  activateSlide = false;

  onCloseClick(): void {
    this.activateSlide = false;
    setTimeout(() => this.dialogRef.close(), 300)
  }

  ngAfterViewInit(): void {
    this.activateSlide = true;
  }
}
