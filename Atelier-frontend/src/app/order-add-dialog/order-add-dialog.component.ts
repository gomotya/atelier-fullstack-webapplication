import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService, Employee, Client, OrderType } from '../api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-add-dialog',
  templateUrl: './order-add-dialog.component.html',
  styleUrls: ['./order-add-dialog.component.scss']
})
export class OrderAddDialogComponent {
  orderForm: FormGroup;
  clients: Client[] = [];
  employees: Employee[] = [];
  orderTypes: OrderType[] = [];

  constructor(
    private fb: FormBuilder,
    private ApiService: ApiService,
    public dialogRef: MatDialogRef<OrderAddDialogComponent>,
    
  ) {
    this.orderForm = this.fb.group({
      client_id: null,
      employee_id: null,
      type_id: null,
      order_date: new FormControl(new Date())
    });
  }

  ngOnInit(): void {
    this.loadOrderTypes();
    this.loadClients();
    this.loadEmployees();
  }


  loadOrderTypes(): void {
    this.ApiService.getOrderTypes().subscribe((orderTypes) => {
      this.orderTypes = orderTypes;
    });
  }
  loadClients(): void {
    this.ApiService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }
  loadEmployees(): void {
    this.ApiService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const newOrder = this.orderForm.value;
      const orderDate = new Date(newOrder.order_date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      newOrder.order_date = orderDate;
      const selectedOrderType = this.orderTypes.find(
        orderType => orderType.id === newOrder.type_id
      );
      const selectedClient = this.clients.find(
        clients => clients.id === newOrder.client_id
      );
      const selectedEmployee = this.employees.find(
        employees => employees.id === newOrder.employee_id
      );
      this.ApiService.createOrder(newOrder).subscribe((order) => {
        order.type = selectedOrderType?.type ?? order.type;
        order.client_name = selectedClient?.fio ?? order.client_name;
        order.employee_name= selectedEmployee?.fio ?? order.employee_name;
        this.dialogRef.close(order);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
