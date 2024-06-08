import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService, Client, Employee, Order, OrderType } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-edit-dialog',
  templateUrl: './order-edit-dialog.component.html',
  styleUrls: ['./order-edit-dialog.component.scss']
})
export class OrderEditDialogComponent {
  orderForm: FormGroup;
  clients: Client[] = [];
  employees: Employee[] = [];
  orderTypes: OrderType[] = [];

  constructor(
    private fb: FormBuilder,
    private ApiService: ApiService,
    public dialogRef: MatDialogRef<OrderEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {
    this.orderForm = this.fb.group({
      client_id: [data.client_name],
      employee_id: [data.employee_name],
      type_id: [data.type],
      order_date: [data.order_date]
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
      const updatedOrder = {
        ...this.data,
        ...this.orderForm.value
      };
      const selectedOrderType = this.orderTypes.find(
        orderType => orderType.id === updatedOrder.type_id
      );

      this.ApiService.updateOrder(updatedOrder).subscribe((order) => {
        order.type = selectedOrderType?.type ?? 'Неизвестно';
        this.dialogRef.close(order);
      });
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
