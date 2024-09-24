import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-item-dialog',
  templateUrl: 'app-item-dialog.html',
  standalone: true,
  imports: [MatDialogModule],
})
export class AppItemDialog {
  data = inject(MAT_DIALOG_DATA);

  _mImage = this.data.image;
}
