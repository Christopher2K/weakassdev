import React from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { DateTime } from 'luxon';

import type { AdminUsersData } from '@weakassdev/shared/validators';

import { css } from '@style/css';
import { Table, Button } from '~/Components';
import { Layout } from '~/Pages/Layout';

const columnHelpers = createColumnHelper<AdminUsersData['data'][number]>();
const columns = [
  columnHelpers.accessor('id', {
    header: () => 'Identifiant',
    cell: (info) => info.getValue().slice(30),
  }),
  columnHelpers.accessor('username', {
    header: () => 'Nom utilisateur',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('email', {
    header: () => 'Adresse email',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('role', {
    header: () => 'Rôle',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('status', {
    header: () => 'Statut',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('createdAt', {
    header: () => 'Inscrit(e) depuis',
    cell: (info) => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATETIME_MED),
  }),
  columnHelpers.display({
    id: 'actions',
    header: () => 'Actions',
    cell: (info) => (
      <div>
        <Button.Link href={`/admin/users/${info.row.getValue('id')}`} btnSize="sm">
          Détails
        </Button.Link>
      </div>
    ),
  }),
];

type IndexProps = {
  users: AdminUsersData;
};

export default function Index({ users }: IndexProps) {
  const { data, meta } = users;

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1 className={css({ textStyle: 'h2', mb: '10' })}>Utilisateurs</h1>

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
              baseUrl="/admin/users"
              currentPage={meta.currentPage}
              lastPage={meta.lastPage}
            />
          </Table.Footer>
        </Table.Container>
      </Table.Root>
    </div>
  );
}

Index.layout = (page: JSX.Element) => <Layout children={page} />;
