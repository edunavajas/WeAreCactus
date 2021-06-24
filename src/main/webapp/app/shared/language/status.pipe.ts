import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusPipe' })
export class StatusPipe implements PipeTransform {
  activeImg = '../../content/images/active.png';
  inactiveImg = '../../content/images/inactive.png';

  transform(status: string): string {
    if (status === 'active') {
      return this.activeImg;
    } else {
      return this.inactiveImg;
    }
  }
}
