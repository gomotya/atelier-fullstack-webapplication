import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, Employee } from '../api.service';
import { EmployeesEditDialogComponent } from '../employees-edit-dialog/employees-edit-dialog.component';
import { EmployeesAddDialogComponent } from '../employees-add-dialog/employees-add-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  searchTerm: string = '';

  constructor(
    private ApiService: ApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.ApiService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(EmployeesAddDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees.push(result);
      }
    });
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeesEditDialogComponent, {
      width: '400px',
      data: { ...employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.employees.findIndex((e) => e.id === result.id);
        if (index !== -1) {
          this.employees[index] = result;
        }
      }
    });
  }

  deleteEmployee(id: number): void {
    this.ApiService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter((employee) => employee.id !== id);
    });
  }
}
