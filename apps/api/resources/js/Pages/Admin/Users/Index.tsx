import React from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Link } from '@inertiajs/inertia-react';

import type { AdminUsersData } from '@weakassdev/shared/validators';

import { Typography } from '~/Components';
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
];

type IndexProps = {
  users: AdminUsersData;
};

export default function Index({ users }: IndexProps) {
  const { data, meta } = users;
  const isFirstPage = meta.firstPage === meta.currentPage;
  const isLastPage = meta.lastPage === meta.currentPage;

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Typography tag="h1">Utilisateurs</Typography>

      <table>
        <thead>
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
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {!isFirstPage && (
        <Link href={`/admin/users?page=${meta.currentPage - 1}`}>Page précédente</Link>
      )}
      {!isLastPage && <Link href={`/admin/users?page=${meta.currentPage + 1}`}>Page suivante</Link>}
    </div>
  );
}

Index.layout = (page: JSX.Element) => <Layout children={page} />;
