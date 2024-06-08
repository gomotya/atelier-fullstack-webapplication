import { Component, OnInit } from '@angular/core';
import { ApiService, Service } from '../api.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceEditDialogComponent } from '../service-edit-dialog/service-edit-dialog.component';
import { ServiceAddDialogComponent } from '../service-add-dialog/service-add-dialog.component';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  selectedService: Service | null = null;
  searchTerm: string = '';
  
  constructor(private ApiService: ApiService, public dialog: MatDialog, public AuthService: AuthService) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.ApiService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  addService(): void {
    const dialogRef = this.dialog.open(ServiceAddDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.services.push(result);
      }
    });
  }

  editService(service: Service): void {
    const dialogRef = this.dialog.open(ServiceEditDialogComponent, {
      width: '400px',
      data: { ...service }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.ApiService.updateService(result).subscribe((updatedService) => {
            const index = this.services.findIndex((c) => c.id === updatedService.id);
            this.services[index] = updatedService;
          });
        }
      });
  }

  onSubmit(): void {
    if (this.selectedService) {
      this.ApiService.updateService(this.selectedService).subscribe((updatedService) => {
        const index = this.services.findIndex((service) => service.id === updatedService.id);
        this.services[index] = updatedService;
        this.selectedService = null;
      });
    }
  }

  deleteService(id: number): void {
    this.ApiService.deleteService(id).subscribe(() => {
      this.services = this.services.filter((service) => service.id !== id);
      this.getServices();
    });
  }

}
