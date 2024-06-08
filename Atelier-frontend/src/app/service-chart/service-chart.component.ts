import { Component, OnInit} from '@angular/core';
import { ApiService, ServiceCount, dataForChart } from '../api.service';


@Component({
  selector: 'app-service-chart',
  templateUrl: './service-chart.component.html',
  styleUrls: ['./service-chart.component.scss']
})
export class ServiceChartComponent implements OnInit {
  
  dataForChart: any[] = []
  ServiceCounts: ServiceCount[] = []

  view: any[] = [700, 370];

  // options
  legendTitle: string = 'Услуги';
  legendPosition: string = 'below'; // ['right', 'below']
  legend: boolean = true;

  xAxis: boolean = true;
  yAxis: boolean = true;


  xAxisLabel: string = 'Количество услуг';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

  xAxisTicks: any[] = ['Genre 1', 'Genre 2', 'Genre 3']
  yAxisTicks: any[] = [0, 5, 10]

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = false;


  barPadding: number = 20;
  tooltipDisabled: boolean = false;

  yScaleMax: number = 10;

  roundEdges: boolean = false;

  constructor( private ApiService: ApiService) { Object.assign(this, { dataForChart })}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
  this.ApiService.getServiceCounts().subscribe(data => {
    // Преобразование данных в формат productSales
    this.dataForChart = data.map(item => {
      return {
        name: item.service_name,
        value: item.count // Преобразование строки в число
      };
    });
  });
}

onSelect(event: any) {
  console.log(event);
}

onActivate(data: any): void {
  console.log('Activate', JSON.parse(JSON.stringify(data)));
}

onDeactivate(data: any): void {
  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}

formatString(input: string): string {
  return input.toUpperCase()
}

formatNumber(input: number): number {
  return input
}
}