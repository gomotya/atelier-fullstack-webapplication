import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientEditDialogComponent } from './client-edit-dialog/client-edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientAddDialogComponent } from './client-add-dialog/client-add-dialog.component';
import { ServicesComponent } from './services/services.component';
import { ServiceEditDialogComponent } from './service-edit-dialog/service-edit-dialog.component';
import { ServiceAddDialogComponent } from './service-add-dialog/service-add-dialog.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EmployeesAddDialogComponent } from './employees-add-dialog/employees-add-dialog.component';
import { EmployeesEditDialogComponent } from './employees-edit-dialog/employees-edit-dialog.component';
import { EmployeesComponent } from './employees/employees.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderAddDialogComponent } from './order-add-dialog/order-add-dialog.component';
import { OrderEditDialogComponent } from './order-edit-dialog/order-edit-dialog.component';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { ServiceChartComponent } from './service-chart/service-chart.component';

import { AuthGuard } from './auth.guard';
import { ApiService } from './api.service';
import { DateFormatPipe, FilterPipe } from './filter.pipe';
import { MY_FORMATS_PROVIDER } from './my-date-formats';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    LayoutComponent,
    ClientEditDialogComponent,
    ClientAddDialogComponent,
    EmployeesComponent,
    ServicesComponent,
    ServiceEditDialogComponent,
    ServiceAddDialogComponent,
    HomePageComponent,
    EmployeesAddDialogComponent,
    EmployeesEditDialogComponent,
    OrdersComponent,
    OrderAddDialogComponent,
    OrderEditDialogComponent,
    OrderDetailsDialogComponent,
    LoginComponent,
    FilterPipe,
    ServiceChartComponent,
    DateFormatPipe,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FilterPipeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [
    ApiService,
    AuthGuard,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }, MY_FORMATS_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
