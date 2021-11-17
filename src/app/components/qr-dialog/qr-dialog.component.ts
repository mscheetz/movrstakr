import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QrDialogData } from 'src/app/classes/qr-dialog-data.class';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrls: ['./qr-dialog.component.scss']
})
export class QrDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: QrDialogData, 
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }


  /**
   * Copy address to the clipboard
   */
   copyAddress() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
        e.clipboardData!.setData('text/plain', (this.data.address));
        e.preventDefault();
        document.removeEventListener('copy', null!);
    });
    document.execCommand('copy');

    const horiz: MatSnackBarHorizontalPosition = 'right';
    const vert: MatSnackBarVerticalPosition = 'top';
    this.snackBar.open(`${this.data.symbol} address copied to clipboard`, 'OK', {
      horizontalPosition: horiz,
      verticalPosition: vert
    });

    this.dialog.closeAll();
    // let message = this.symbol + " address copied to clipboard";
    // this.messageSvc.clear();
    // this.messageSvc.add({ severity: 'success', detail: message });

    // this.showQRCode = false;
  }
}
