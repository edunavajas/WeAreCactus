import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IProduct, Product } from '../product.model';
import { ProductService } from '../service/product.service';
import { EventEmitterService } from 'app/entities/product/EventEmitterService';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['../product.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    color: [],
    size: [],
    status: [],
    createdAt: [],
    updatedAt: [],
  });

  @Input() product?: IProduct;

  constructor(
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected eventEmitterService: EventEmitterService
  ) {}

  ngOnInit(): void {
    if (this.product) {
      this.updateForm(this.product);
    }
  }

  close(): void {
    this.eventEmitterService.onCloseModal();
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      color: product.color,
      size: product.size,
      status: product.status,
      createdAt: product.createdAt ? product.createdAt.format(DATE_TIME_FORMAT) : null,
      updatedAt: product.updatedAt ? product.updatedAt.format(DATE_TIME_FORMAT) : null,
    });
  }

  protected createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      color: this.editForm.get(['color'])!.value,
      size: this.editForm.get(['size'])!.value,
      status: this.editForm.get(['status'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? dayjs(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      updatedAt: this.editForm.get(['updatedAt'])!.value ? dayjs(this.editForm.get(['updatedAt'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }
}
