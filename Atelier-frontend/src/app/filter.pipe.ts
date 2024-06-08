import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, propertyName: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      if (item.hasOwnProperty(propertyName)) {
        return item[propertyName].toLowerCase().includes(searchText);
      } else {
        return false;
      }
    });
  }
}

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    const date = typeof value === 'string' ? new Date(value) : value;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}