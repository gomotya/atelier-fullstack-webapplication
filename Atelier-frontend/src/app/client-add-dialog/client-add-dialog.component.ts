import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-add-dialog',
  templateUrl: './client-add-dialog.component.html',
  styleUrls: ['./client-add-dialog.component.scss']
})
export class ClientAddDialogComponent {
  clientForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ClientAddDialogComponent>,
    private fb: FormBuilder,
    private ApiService: ApiService
  ) {
    this.clientForm = this.fb.group({
      fio: '',
      email: '',
      phone: '',
      birthday: ''
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const newClient = this.clientForm.value;
    
      this.ApiService.createClient(newClient).subscribe((client) => {
        this.dialogRef.close(client);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
