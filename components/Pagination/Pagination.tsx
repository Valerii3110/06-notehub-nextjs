import css from '@/Pagination.module.css';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onChangePage: (page: number) => void;
}

export default function Pagination({ page, pageCount, onChangePage }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ul className={css.pagination}>
      <li className={page <= 1 ? css.disabled : ''}>
        <button
          onClick={() => onChangePage(page - 1)}
          disabled={page <= 1}
          className={css.pageLink}
          aria-label="Previous page"
        >
          ←
        </button>
      </li>

      {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNumber) => (
        <li key={pageNumber} className={`${page === pageNumber ? css.active : ''}`}>
          <button
            onClick={() => onChangePage(pageNumber)}
            className={css.pageLink}
            aria-label={`Page ${pageNumber}`}
            aria-current={page === pageNumber ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        </li>
      ))}

      <li className={page >= pageCount ? css.disabled : ''}>
        <button
          onClick={() => onChangePage(page + 1)}
          disabled={page >= pageCount}
          className={css.pageLink}
          aria-label="Next page"
        >
          →
        </button>
      </li>
    </ul>
  );
}
