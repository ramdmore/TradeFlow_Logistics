import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tradeCurrency'
})
export class TradeCurrencyPipe implements PipeTransform {
  transform(value: number, currency: string): string {
    return `${currency} ${value.toLocaleString()}`;
  }
}
