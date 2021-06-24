import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product.model';
import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { ProductService } from '../service/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PRODUCTS_DATA } from 'app/entities/product/list/product.data';
import { FormBuilder } from '@angular/forms';
import { ProductFilter } from 'app/entities/product/list/product.filter';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'color', 'size', 'status', 'created_at', 'updated_at'];
  dataSource = new MatTableDataSource<IProduct>(PRODUCTS_DATA);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  products?: IProduct[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
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

  constructor(
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder
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
    this.onError();
  }

  trackId(index: number, item: IProduct): number {
    return item.id!;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
