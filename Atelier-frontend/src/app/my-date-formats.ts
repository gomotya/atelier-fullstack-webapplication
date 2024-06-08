import { MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const MY_FORMATS_PROVIDER = {
  provide: MAT_DATE_FORMATS,
  useValue: MY_DATE_FORMATS,
};
