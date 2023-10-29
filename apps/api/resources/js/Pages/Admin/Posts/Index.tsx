import React from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { DateTime } from 'luxon';

import { AdminPostsData } from '@weakassdev/shared/validators';

import { css } from '@style/css';
import { Layout } from '~/Pages/Layout';
import { Table, Button } from '~/Components';

const columnHelpers = createColumnHelper<AdminPostsData['data'][number]>();
const columns = [
  columnHelpers.accessor('id', {
    header: () => 'Identifiant',
    cell: (info) => info.getValue().slice(30),
  }),
  columnHelpers.accessor('author.username', {
    header: () => 'Auteur(e)',
    cell: (info) => (
      <Table.CellLink info={info.getValue()} href={`/admin/users/${info.row.original.author.id}`} />
    ),
  }),
  columnHelpers.accessor('status', {
    header: () => 'Statut',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('revisions', {
    header: () => 'Révisions',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('content.content', {
    header: () => 'Contenu',
    cell: (info) => (
      <span
        className={css({
          display: 'inline-block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '300px',
          textOverflow: 'ellipsis',
          wordBreak: 'break-all',
        })}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelpers.accessor('createdAt', {
    header: () => 'Posté le',
    cell: (info) => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATETIME_MED),
  }),
  columnHelpers.display({
    id: 'actions',
    header: () => 'Actions',
    cell: (info) => (
      <div>
        <Button.Link href={`/admin/posts/${info.row.getValue('id')}`} btnSize="sm">
          Détails
        </Button.Link>
      </div>
    ),
  }),
];

type IndexProps = {
  posts: AdminPostsData;
};

export default function Index({ posts }: IndexProps) {
  const { data, meta } = posts;
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h1 className={css({ textStyle: 'h2', mb: '10' })}>Posts</h1>
      <Table.Root>
        <Table.Container>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </Table.Body>
          <Table.Footer length={columns.length}>
            <Table.Pagination
              as="span"
              baseUrl="/admin/posts"
              currentPage={meta.currentPage}
              lastPage={meta.lastPage}
            />
          </Table.Footer>
        </Table.Container>
      </Table.Root>
    </>
  );
}

Index.layout = (page: JSX.Element) => <Layout children={page} />;
