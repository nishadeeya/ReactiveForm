import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celToFah',
  standalone: true,
})
export class CelToFahPipePipe implements PipeTransform {

  transform(celsius: number): number {
    return (celsius * 9/5) + 32;
  }
}
