import { IProduct } from 'app/entities/product/product.model';
import * as dayjs from 'dayjs';

export const PRODUCTS_DATA: IProduct[] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus fringilla orci, vitae hetur.',
    color: 'red',
    size: 'L',
    status: 'active',
    createdAt: dayjs('2021-06-14'),
    updatedAt: dayjs('2021-06-15'),
    edit: '',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus fringilla orci, vitae hendrerit antectetur.',
    color: 'blue',
    size: 'XL',
    status: 'active',
    createdAt: dayjs('2021-06-14'),
    updatedAt: dayjs('2021-06-15'),
    edit: '',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Practetur.',
    color: 'yellow',
    size: 'M',
    status: 'inactive',
    createdAt: dayjs('2021-06-14'),
    updatedAt: dayjs('2021-06-15'),
    edit: '',
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus fringilla orci, vitae hendreritr.',
    color: 'green',
    size: 'S',
    status: 'active',
    createdAt: dayjs('2021-06-14'),
    updatedAt: dayjs('2021-06-15'),
    edit: '',
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus fringilla orci, vitae hendrerit ctetur.',
    color: 'black',
    size: 'XXL',
    status: 'inactive',
    createdAt: dayjs('2021-06-14'),
    updatedAt: dayjs('2021-06-15'),
    edit: '',
  },
];
