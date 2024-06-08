import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService, JobTitle } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-employees-add-dialog',
  templateUrl: './employees-add-dialog.component.html',
  styleUrls: ['./employees-add-dialog.component.scss']
})
export class EmployeesAddDialogComponent {
  employeeForm: FormGroup;
  jobTitles: JobTitle[] = [];
  
  constructor(
    private fb: FormBuilder,
    private ApiService: ApiService,
    public dialogRef: MatDialogRef<EmployeesAddDialogComponent>
  ) {
    this.employeeForm = this.fb.group({
      fio: '',
      job_title_id: null, // Инициализируем как null
      phone: '',
      bank_acc: '',
      birthday: ''
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
      const newEmployee = this.employeeForm.value;
      const selectedJobTitle = this.jobTitles.find(
        jobTitle => jobTitle.id === newEmployee.job_title_id
      );

      this.ApiService.createEmployee(newEmployee).subscribe((employee) => {
        employee.job_title = selectedJobTitle?.position ?? employee.job_title;
        this.dialogRef.close(employee);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}