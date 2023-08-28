import React, { type PropsWithChildren } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

import { Button } from './Button';
import { css } from '@style/css';
import { hstack } from '@style/patterns';

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
          bg: 'gray.200',
          p: '4',
          fontFamily: 'Inter',
          fontSize: 'md',
          fontWeight: 'medium',
          textAlign: 'left',
          whiteSpace: 'nowrap',
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
          whiteSpace: 'nowrap',
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
          borderTopStyle: 'solid',
          borderTopWidth: 'thin',
          borderTopColor: 'gray.300',
          p: '4',
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
    <span className={hstack()}>
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
    </span>
  );
}

export type CellLinkProps = {
  info: string;
  href: string;
};
function CellLink({ info, href }: CellLinkProps) {
  return (
    <span className={hstack({})}>
      <Button.Link
        btnSize="sm"
        theme="secondary"
        href={href}
        leftIcon={<ExternalLink size={12} />}
      />
      {info}
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

  CellLink,
};
