import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product.model';
import { ProductService } from '../service/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PRODUCTS_DATA } from './product.data';
import { FormBuilder } from '@angular/forms';
import { ProductFilter } from 'app/entities/product/list/product.filter';
import { EventEmitterService } from 'app/entities/product/EventEmitterService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'description', 'color', 'size', 'status', 'created_at', 'updated_at', 'edit'];
  dataSource = new MatTableDataSource<IProduct>(PRODUCTS_DATA);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  products?: IProduct[];
  totalItems = 0;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  showFilters = false;

  filtrarGroup = this.fb.group({
    id: [],
    name: [],
    description: [],
    createdAt: [],
    updatedAt: [],
    status: [],
    size: [],
    color: [],
  });

  productFilter = new ProductFilter();
  showEdit = false;
  selectedProduct?: IProduct;
  subscription?: Subscription;

  constructor(
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected eventEmitterService: EventEmitterService
  ) {}

  ngAfterViewInit(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  filter(): void {
    this.productFilter = this.createFilterForm();
    if (this.productFilter.name) {
      this.dataSource.data = this.dataSource.data.filter(product => product.name === this.productFilter.name);
    }
  }

  createFilterForm(): ProductFilter {
    return {
      ...new ProductFilter(),
      id: this.filtrarGroup.get(['id'])!.value,
      name: this.filtrarGroup.get(['name'])!.value,
      description: this.filtrarGroup.get(['description'])!.value,
      createdAt: this.filtrarGroup.get(['createdAt'])!.value,
      updatedAt: this.filtrarGroup.get(['updatedAt'])!.value,
      status: this.filtrarGroup.get(['status'])!.value,
      size: this.filtrarGroup.get(['size'])!.value,
      color: this.filtrarGroup.get(['color'])!.value,
    };
  }

  ngOnInit(): void {
    if (this.eventEmitterService.subsCloseModal === undefined) {
      this.subscription = this.eventEmitterService.closeModalFunction.subscribe(() => {
        this.showEdit = false;
      });
    }
  }

  edit(producto: any): void {
    this.showEdit = false;
    setTimeout(() => {
      this.selectedProduct = producto;
      this.showEdit = true;
    }, 1);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
