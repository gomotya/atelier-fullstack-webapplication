import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from '../api.service';

@Component({
  selector: 'app-service-edit-dialog',
  templateUrl: './service-edit-dialog.component.html',
  styleUrls: ['./service-edit-dialog.component.scss']
})
export class ServiceEditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ServiceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data);
  }
}
