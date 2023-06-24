export class Announcement {
  id!: number;
  title!: string;
  body!: string;
  date! : Date;
  categories!: [];
  created_by!: string;
  image!: string;
  is_hidden!: boolean;
}
