import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { hstack } from '@style/patterns';

import { Button } from './Button';

export type PaginationProps = {
  baseUrl: string;
  currentPage: number;
  lastPage: number;
  as?: React.ElementType;
};

export function Pagination({ baseUrl, currentPage, lastPage, as = 'div' }: PaginationProps) {
  const isPreviousNavigationDisabled = currentPage === 1;
  const isNextNavigationDisabled = currentPage === lastPage;

  const Root = as;

  return (
    <Root className={hstack({ w: 'fit-content' })}>
      <Button.Link btnSize="sm" disabled={isPreviousNavigationDisabled} href={`${baseUrl}?page=1`}>
        Début de liste
      </Button.Link>
      <Button.Link
        btnSize="sm"
        disabled={isPreviousNavigationDisabled}
        href={`${baseUrl}?page=${currentPage - 1}`}
        leftIcon={<ChevronLeft size={20} />}
      >
        Page précédente
      </Button.Link>

      <Button.Link
        btnSize="sm"
        disabled={isNextNavigationDisabled}
        href={`${baseUrl}?page=${currentPage + 1}`}
        rightIcon={<ChevronRight size={20} />}
      >
        Page suivante
      </Button.Link>
      <Button.Link
        btnSize="sm"
        disabled={isNextNavigationDisabled}
        href={`${baseUrl}?page=${lastPage}`}
      >
        Fin de liste
      </Button.Link>
    </Root>
  );
}
