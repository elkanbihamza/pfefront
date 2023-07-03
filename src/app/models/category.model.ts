export class Category{
  code!: string;
  title!: string;
  subcategories!: Category[];
  expanded!: boolean;
}
