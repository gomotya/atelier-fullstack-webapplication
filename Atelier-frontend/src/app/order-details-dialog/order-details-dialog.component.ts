import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService, OrderDetail, Service } from '../api.service';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss']
})
export class OrderDetailsDialogComponent implements OnInit {
  orderDetails: OrderDetail[] = [];
  services: Service[] = [];
  orderDetailForm: FormGroup;
  editedDetail: OrderDetail | null = null;
  totalCost: number = 0;

  constructor(
    private fb: FormBuilder,
    private ApiService: ApiService,
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number, date: string }
  ) {
    this.orderDetailForm = this.fb.group({
      service_id: null,
      amount: null,
      cost: null
    });
  }

  ngOnInit(): void {
    this.loadOrderDetails();
    this.loadServices();
  }

  loadOrderDetails(): void {
    this.ApiService.getOrderDetails(this.data.orderId).subscribe((details: OrderDetail[]) => {
      this.orderDetails = details;
      this.totalCost = this.orderDetails.reduce((total, detail) => total + Number(detail.cost), 0);
    });
  }

  loadServices(): void {
    this.ApiService.getServices().subscribe((services: Service[]) => {
      this.services = services;
    });
  }

  addOrderDetail(): void {
    if (this.orderDetailForm.valid) {
      const newDetail = {
        ...this.orderDetailForm.value,
        order_id: this.data.orderId
      };
      this.ApiService.addOrderDetail(newDetail).subscribe((detail: OrderDetail) => {
        this.orderDetails.push(detail);
        this.orderDetailForm.reset();
        this.loadOrderDetails();
      });
    }
  }

  editOrderDetail(detail: OrderDetail): void {
    this.editedDetail = { ...detail };
    this.orderDetailForm.patchValue({
      service_id: detail.service_id,
      amount: detail.amount,
      cost: detail.cost
    });
    
  }

  backFromEdit(): void {
    this.editedDetail = null;
    this.orderDetailForm.reset();
    this.loadOrderDetails();
  }

  saveOrderDetail(): void {
    if (this.editedDetail) {
      const updatedDetail = {
        ...this.editedDetail,
        ...this.orderDetailForm.value
      };
      this.ApiService.updateOrderDetail(updatedDetail).subscribe((detail: OrderDetail) => {
        const index = this.orderDetails.findIndex(d => d.id === detail.id);
        if (index !== -1) {
          this.orderDetails[index] = detail;
        }
        this.editedDetail = null;
        this.orderDetailForm.reset();
        this.loadOrderDetails();
      });
    }
  }

  deleteOrderDetail(orderDetailId: number): void {
    this.ApiService.deleteOrderDetail(orderDetailId).subscribe(() => {
      this.orderDetails = this.orderDetails.filter(detail => detail.id !== orderDetailId);
      this.totalCost = this.orderDetails.reduce((total, detail) => total + Number(detail.cost), 0);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}