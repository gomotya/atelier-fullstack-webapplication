import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService, JobTitle, Employee } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employees-edit-dialog',
  templateUrl: './employees-edit-dialog.component.html',
  styleUrls: ['./employees-edit-dialog.component.scss']
})
export class EmployeesEditDialogComponent implements OnInit {
    employeeForm: FormGroup;
    jobTitles: JobTitle[] = [];
  
    constructor(
      private fb: FormBuilder,
      private ApiService: ApiService,
      public dialogRef: MatDialogRef<EmployeesEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Employee
    ) {
      this.employeeForm = this.fb.group({
        fio: [data.fio],
        job_title_id: [data.job_title],
        phone: [data.phone],
        bank_acc: [data.bank_acc],
        birthday: [data.birthday]
      });
    }
  
    ngOnInit(): void {
      this.loadJobTitles();
    }
  
    loadJobTitles(): void {
      this.ApiService.getJobTitles().subscribe((jobTitles) => {
        this.jobTitles = jobTitles;
      });
    }
  
    onSubmit(): void {
      if (this.employeeForm.valid) {
        const updatedEmployee = {
          ...this.data,
          ...this.employeeForm.value
        };
        const selectedJobTitle = this.jobTitles.find(
          jobTitle => jobTitle.id === updatedEmployee.job_title_id
        );
  
        this.ApiService.updateEmployee(updatedEmployee).subscribe((employee) => {
          employee.job_title = selectedJobTitle?.position ?? 'Неизвестно';
          this.dialogRef.close(employee);
        });
      }
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
  }