import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Client {
  id: number,
  fio: string,
  phone: string,
  email: string,
  birthday: string
}

export interface Employee {
  id: number,
  fio: string,
  job_title: string,
  phone: string,
  bank_acc: string,
  birthday: string,
}

export interface LoginResponse {
  username: string;
}

export interface JobTitle {
  id: number,
  position: string,
  salary: string
}

export interface OrderType {
  id: number,
  type: string
}

export interface CountInfo {
  employee_name: string,
  orders_count: number,
  order_date: string
}


export interface OrderDetail {
  id: number;
  order_id: number;
  service_id: number;
  service_name?: string;
  amount: number;
  cost: number;
}

export interface Service {
  id: number;
  service_name: string;
  service_cost: number;
  service_add_cost: number;
}

export interface Order {
  id: number;
  client_name: string;
  employee_name: string;
  type: string;
  order_date: string;
}

export interface ServiceCount {
  service_name: string;
  count: number;
}

export interface SumOfTheDay {
  order_date: string;
  total_cost: number;
}

export interface EveryClientSum {
  order_date: string;
  total_cost: number;
}

export var dataForChart = [
  {
    "name": "",
    "value": null
  }
];


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  createClient(client: Client): Observable<Client[]> {
    return this.http.post<Client[]>(`${this.apiUrl}/client`, client);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/client`);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/client`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/client/${id}`);
  }

  getForHomePage(): Observable<CountInfo[]> {
    return this.http.get<CountInfo[]>(`${this.apiUrl}/home`);
  }

  getSumOfTheDay(date: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/report-sum`, { params: { date } });
  }
  
  getEveryClientSum(date: string): Observable<EveryClientSum[]> {
    return this.http.get<EveryClientSum[]>(`${this.apiUrl}/report`, { params: { date } });
  }
  

  getServiceCounts(): Observable<ServiceCount[]> {
    return this.http.get<ServiceCount[]>(`${this.apiUrl}/service-counts`);
  }


  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`);
  }

  updateService(service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/services`, service);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/services/${id}`);
  }

  createService(service: Service): Observable<Service[]> {
    return this.http.post<Service[]>(`${this.apiUrl}/services`, service);
  }


  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/employees`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employees/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employees`, employee);
  }

  getJobTitles(): Observable<JobTitle[]> {
    return this.http.get<JobTitle[]>(`${this.apiUrl}/job-title`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  getOrderTypes(): Observable<OrderType[]> {
    return this.http.get<OrderType[]>(`${this.apiUrl}/order-types`);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/orders`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/${id}`);
  }

  getOrderDetails(id: number): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(`${this.apiUrl}/details/${id}`);
  }
  

  addOrderDetail(orderDetail: OrderDetail): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(`${this.apiUrl}/details`, orderDetail);
  }

  updateOrderDetail(orderDetail: OrderDetail): Observable<OrderDetail> {
    return this.http.put<OrderDetail>(`${this.apiUrl}/details/${orderDetail.id}`, orderDetail);
  }

  deleteOrderDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/details/${id}`);
  }

  deleteAllOrderDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/all-details/${id}`);
  }
}

