import { Component, OnInit } from '@angular/core';
import { ApiService, Client } from '../api.service';
import { ClientEditDialogComponent } from '../client-edit-dialog/client-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClientAddDialogComponent } from '../client-add-dialog/client-add-dialog.component';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  selectedClient: Client | null = null;
  searchTerm: string = '';

  constructor(private ApiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.ApiService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  addClient(): void {
    const dialogRef = this.dialog.open(ClientAddDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clients.push(result);
      }
    });
  }

  editClient(client: Client): void {
    const dialogRef = this.dialog.open(ClientEditDialogComponent, {
      width: '400px',
      data: { ...client }
    });;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ApiService.updateClient(result).subscribe((updatedClient) => {
          const index = this.clients.findIndex((c) => c.id === updatedClient.id);
          this.clients[index] = updatedClient;
        });
      }
    });
  }

  


  deleteClient(id: number): void {
    this.ApiService.deleteClient(id).subscribe(() => {
      this.clients = this.clients.filter((client) => client.id !== id);
    });
  }

  onSubmit(): void {
    if (this.selectedClient) {
      this.ApiService.updateClient(this.selectedClient).subscribe((updatedClient) => {
        const index = this.clients.findIndex((client) => client.id === updatedClient.id);
        this.clients[index] = updatedClient;
        this.selectedClient = null;
      });
    }
  }

}
