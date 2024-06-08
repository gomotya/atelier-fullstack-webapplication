import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService} from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-service-add-dialog',
  templateUrl: './service-add-dialog.component.html',
  styleUrls: ['./service-add-dialog.component.scss']
})
export class ServiceAddDialogComponent {
  serviceForm: FormGroup;

    constructor(
      public dialogRef: MatDialogRef<ServiceAddDialogComponent>,
      private fb: FormBuilder,
      private ApiService: ApiService
    ) {
      this.serviceForm = this.fb.group({
        service_name: '',
        service_cost: '',
        service_add_cost: ''
      });
    }

    onSubmit(): void {
      if (this.serviceForm.valid) {
        const newService = this.serviceForm.value;
      
        this.ApiService.createService(newService).subscribe((service) => {
          this.dialogRef.close(service);
        });
      }
    }
  
  
    onCancel(): void {
      this.dialogRef.close();
    }

}
