import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _snackBar = inject(MatSnackBar);

  public showSnack(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }
}
