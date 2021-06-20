import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-count',
  template: ` <div appTranslate="global.item-count" [translateValues]="{ first: first, second: second, total: total }"></div> `,
})
export class ItemCountComponent {
  @Input() set params(params: { page?: number; totalItems?: number; itemsPerPage?: number }) {
    if (params.page !== undefined && params.totalItems !== undefined && params.itemsPerPage !== undefined) {
      this.first = (params.page - 1) * params.itemsPerPage === 0 ? 1 : (params.page - 1) * params.itemsPerPage + 1;
      this.second = params.page * params.itemsPerPage < params.totalItems ? params.page * params.itemsPerPage : params.totalItems;
    } else {
      this.first = undefined;
      this.second = undefined;
    }
    this.total = params.totalItems;
  }

  first?: number;
  second?: number;
  total?: number;
}
