import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../api.service';

@Component({
  selector: 'app-client-edit-dialog',
  templateUrl: './client-edit-dialog.component.html',
  styleUrls: ['./client-edit-dialog.component.scss']
})
export class ClientEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ClientEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data);
  }
}
