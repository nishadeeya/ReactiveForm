import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FahTocel',
  standalone: true,
})
export class FahTocelPipePipe implements PipeTransform {

  transform(fahrenheit: number): number {
    const celsius = (fahrenheit - 32) * 5 / 9;
    return  parseFloat(celsius.toFixed(2));;
  }

}
