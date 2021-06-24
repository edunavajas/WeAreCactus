import { Dayjs } from 'dayjs';

export class ProductFilter {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public createdAt?: Dayjs,
    public updatedAt?: Dayjs,
    public status?: string,
    public size?: string,
    public color?: string
  ) {}
}
