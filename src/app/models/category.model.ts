export class Category{
  id!: number;
  code!: string;
  title!: string;
  subcategories!: Category[];
  expanded!: boolean;
}
