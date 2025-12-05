import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataUrl',
})
export class DataUrlPipe implements PipeTransform {
  transform(value: File): any {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(value);
    });
  }
}
