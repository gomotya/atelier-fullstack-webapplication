import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, Order } from '../api.service';
import { OrderAddDialogComponent } from '../order-add-dialog/order-add-dialog.component';
import { OrderEditDialogComponent } from '../order-edit-dialog/order-edit-dialog.component';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  searchTerm: string = '';
  
  constructor(
    private ApiService: ApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

      getOrders(): void {
        this.ApiService.getOrders().subscribe((orders) => {
          this.orders = orders;
        });
      }

      viewOrderDetails(orderId: number, date: string): void {
        const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
          width: '1000px',
          data: { orderId, date }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // Обновите информацию о заказах, если нужно
          }
        });
      }

      addOrder(): void {
        const dialogRef = this.dialog.open(OrderAddDialogComponent, {
          width: '400px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.orders.push(result);
          }
        });
      }

      editOrder(order: Order): void {
        const dialogRef = this.dialog.open(OrderEditDialogComponent, {
          width: '400px',
          data: { ...order }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            const index = this.orders.findIndex((e) => e.id === result.id);
            if (index !== -1) {
              this.orders[index] = result;
            }
          }
        });
      }
    
      deleteOrder(id: number): void {
        this.ApiService.deleteAllOrderDetail(id).subscribe(() => {
          this.orders = this.orders.filter((order) => order.id !== id);
        });
        this.ApiService.deleteOrder(id).subscribe(() => {
          this.orders = this.orders.filter((order) => order.id !== id);
        });
        
      }

    }