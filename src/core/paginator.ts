import { IsNumber } from "class-validator";

export class Paginator {
  page!: number;

  per_page!: number;

  pre_page!: number;

  next_page!: number;

  total!: number;

  total_pages!: number;
  
}
