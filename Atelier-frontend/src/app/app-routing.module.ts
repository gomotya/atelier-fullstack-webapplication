import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ClientsComponent } from './clients/clients.component';
import { EmployeesComponent } from './employees/employees.component';
import { ServicesComponent } from './services/services.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ServiceChartComponent } from './service-chart/service-chart.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
      { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
      { path: 'services', component: ServicesComponent },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'chart', component: ServiceChartComponent, canActivate: [AuthGuard] },
      { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  },
  
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
