import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as XLSX from 'xlsx'; // Импортируем библиотеку xlsx

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  
})
export class ReportComponent implements OnInit {
  selectedDate: string = '';
  SumOfTheDay: number = 0;
  clientOrders: any[] = [];
  displayedColumns: string[] = ['client_name', 'total_cost'];

  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.selectedDate = new Date().toISOString().split('T')[0]; // инициализация текущей датой
    this.generateReport();
  }

  generateReport() {
    const formattedDate = this.formatDate(this.selectedDate);
    if (formattedDate) {
      console.log(`Requesting report for date: ${formattedDate}`);
      this.ApiService.getSumOfTheDay(formattedDate).subscribe(data => {
        this.SumOfTheDay = data.total_cost;
      });

      this.ApiService.getEveryClientSum(formattedDate).subscribe(data => {
        this.clientOrders = data;
      });
    }
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }

  downloadReport() {
    const formattedDate = this.formatDate(this.selectedDate);

    // Создаем данные для Excel
    const data = [
      ['Дата', formattedDate], // Дата
      ['Итого за день', this.SumOfTheDay],
      [],
      ['Клиент', 'Сумма заказа'], // Заголовки столбцов
      ...this.clientOrders.map(order => [order.client_name, order.total_cost]), // Клиенты и их суммы
      [], // Пустая строка для разделения
       // Итоговая сумма
    ];

    // Преобразуем данные в формат листа Excel
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Создаем рабочую книгу и добавляем в нее лист
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    // Генерируем файл и предлагаем его скачать
    const fileName = `report_${formattedDate}.xlsx`;
    XLSX.writeFile(workbook, fileName);
}

  
}


