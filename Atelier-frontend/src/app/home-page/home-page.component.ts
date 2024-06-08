import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService, CountInfo } from '../api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(public AuthService: AuthService, private ApiService: ApiService) {}

  info: CountInfo[] = [];
  order_date: string = this.getCurrentDate();


  ngOnInit(): void {
    this.getClients();
  }

  getCurrentDate(): string {
    const currentDate: Date = new Date();
    const day: string = currentDate.getDate().toString().padStart(2, '0');
    const month: string = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Месяц начинается с 0
    const year: string = currentDate.getFullYear().toString();
    return `${day}.${month}.${year}`;
}

  getClients(): void {
    this.ApiService.getForHomePage().subscribe(data => {
      this.info = data;
    });
  }
}
