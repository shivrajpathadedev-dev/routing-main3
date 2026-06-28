import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackbar:MatSnackBar
  ) { }

  openSuccesssnackbar(msg:string){
    this._snackbar.open(msg,"Close",{
     duration:1000,
     horizontalPosition:'left',
     verticalPosition:'top',
     panelClass:['success-snackbar']
    })
  }

   openErrorsnackbar(msg:string){
    this._snackbar.open(msg,"Close",{
     duration:1000,
     horizontalPosition:'left',
     verticalPosition:'top',
     panelClass:['error-snackbar']
    })
  }
}
