import React, { type PropsWithChildren } from 'react';
import { Link } from '@inertiajs/inertia-react';

import { css } from '@style/css';
import { hstack } from '@style/patterns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type RootProps = PropsWithChildren<{}>;
function Root({ children }: RootProps) {
  return <div className={css({ overflowX: 'auto' })}>{children}</div>;
}

type ContainerProps = PropsWithChildren<{}>;
function Container({ children }: ContainerProps) {
  return (
    <table
      className={css({
        borderCollapse: 'separate',
        borderSpacing: 0,
      })}
    >
      {children}
    </table>
  );
}

type HeaderProps = PropsWithChildren<{}>;
function Header({ children }: HeaderProps) {
  return (
    <thead
      className={css({
        borderTopRadius: 'md',
        '& tr > th': {
          bg: 'gray.400',
          px: '4',
          py: '3',
          fontWeight: 'medium',
          textAlign: 'left',
          whiteSpace: 'nowrap',
        },
        '& tr > th:first-of-type': {
          borderTopLeftRadius: 'md',
        },
        '& tr > th:last-of-type': {
          borderTopRightRadius: 'md',
        },
      })}
    >
      {children}
    </thead>
  );
}

type BodyProps = PropsWithChildren<{}>;
function Body({ children }: BodyProps) {
  return (
    <tbody
      className={css({
        '& tr > td': {
          px: '4',
          py: '3',
          textAlign: 'left',
          fontSize: 'sm',
        },
        '& tr:nth-child(2n+1)': {
          bg: 'gray.100',
        },
      })}
    >
      {children}
    </tbody>
  );
}

type FooterProps = PropsWithChildren<{
  length: number;
}>;
function Footer({ children, length }: FooterProps) {
  return (
    <tfoot
      className={css({
        '& tr > td': {
          px: '4',
          py: '3',
          textAlign: 'left',
          fontSize: 'sm',
          borderBottomRadius: 'md',
          bg: 'gray.400',
        },
      })}
    >
      <tr>
        <td colSpan={length}>{children}</td>
      </tr>
    </tfoot>
  );
}

type PaginationProps = {
  baseUrl: string;
  currentPage: number;
  lastPage: number;
};

function Pagination({ baseUrl, currentPage, lastPage }: PaginationProps) {
  const isPreviousNavigationDisabled = currentPage === 1;
  const isNextNavigationDisabled = currentPage === lastPage;

  return (
    <span
      className={hstack({
        display: 'inline-flex',
        color: 'gray.50',
        gap: 0,
        '& a': {
          display: 'inline-flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '0',
          backgroundColor: 'slate.800',
          p: '2',
          borderRightWidth: 'thin',
          borderRightColor: 'gray.50',
          _disabled: {
            cursor: 'not-allowed',
            opacity: 0.5,
          },
          _hover: {
            backgroundColor: 'slate.700',
          },
          _firstOfType: {
            borderLeftRadius: 'md',
          },
          _lastOfType: {
            borderRightRadius: 'md',
            borderRightWidth: '0',
          },
        },
      })}
    >
      <Link disabled={isPreviousNavigationDisabled} href={`${baseUrl}?page=1`}>
        Début de liste
      </Link>
      <Link disabled={isPreviousNavigationDisabled} href={`${baseUrl}?page=${currentPage - 1}`}>
        <ChevronLeft size={20} /> Page précédente
      </Link>
      <Link disabled={isNextNavigationDisabled} href={`${baseUrl}?page=${currentPage + 1}`}>
        Page suivante
        <ChevronRight size={20} />
      </Link>
      <Link disabled={isNextNavigationDisabled} href={`${baseUrl}?page=${lastPage}`}>
        Fin de liste
      </Link>
    </span>
  );
}

export const Table = {
  Root,
  Container,
  Header,
  Body,
  Footer,
  Pagination,
};
