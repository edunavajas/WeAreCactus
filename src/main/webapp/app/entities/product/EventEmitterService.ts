import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

export class EventEmitterService {
  closeModalFunction = new EventEmitter();
  subsCloseModal?: Subscription;
  showEdit?: boolean;

  onCloseModal(): void {
    this.closeModalFunction.emit();
  }
}
