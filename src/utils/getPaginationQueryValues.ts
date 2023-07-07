import { Request } from 'express';

export interface IPagination {
  take: number;
  skip: number;
}

export function getPaginationQueryValues(request: Request): IPagination {
  const FIRST_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 25;

  let page = Number(request.query.page) || FIRST_PAGE;
  let pageSize = Number(request.query.pageSize) || DEFAULT_PAGE_SIZE;

  if (isNaN(page) || page < 1) {
    page = FIRST_PAGE;
  }

  if (isNaN(pageSize) || pageSize < 1) {
    pageSize = DEFAULT_PAGE_SIZE;
  }

  return {
    take: pageSize,
    skip: (page - 1) * pageSize,
  };
}
