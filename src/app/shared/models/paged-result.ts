export class PagedResult<T> {
  public items: Array<T>;
  public totalPages: number;
  public totalRows: number;
  public currentPage: number;
  public itemsPerPage: number;
}
