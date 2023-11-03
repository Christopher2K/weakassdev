<script lang="ts">
import AppLayout from '~/Pages/Layout.vue';

export default {
  layout: AppLayout,
};
</script>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { createColumnHelper, useVueTable, FlexRender, getCoreRowModel } from '@tanstack/vue-table';

import { css } from '@style/css';

import type { AdminUsersData } from '@weakassdev/shared/validators';

import AppButton from '~/Components/AppButton.vue';
import TableRoot from '~/Components/Table/TableRoot.vue';
import TableHeader from '~/Components/Table/TableHeader.vue';
import TableBody from '~/Components/Table/TableBody.vue';
import TableContainer from '~/Components/Table/TableContainer.vue';
import TableFooter from '~/Components/Table/TableFooter.vue';
import Pagination from '~/Components/Pagination.vue';

const props = defineProps<{
  users: AdminUsersData;
}>();

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
  }),
];
const table = useVueTable({
  get data() {
    return props.users.data;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <h1 :class="css({ textStyle: 'h2', mb: '10' })">Posts</h1>
  <TableRoot>
    <TableContainer>
      <TableHeader>
        <tr v-for="headerGroup of table.getHeaderGroups()" :key="headerGroup.id">
          <th v-for="header of headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </TableHeader>

      <TableBody>
        <tr v-for="row of table.getRowModel().rows" :key="row.id">
          <td v-for="cell of row.getVisibleCells()" :key="cell.id">
            <div v-if="cell.column.id === 'actions'">
              <AppButton :href="`/admin/users/${row.getValue('id')}`" btnSize="sm">
                Détails
              </AppButton>
            </div>

            <FlexRender v-else :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </TableBody>

      <TableFooter :length="columns.length">
        <Pagination
          as="span"
          baseUrl="/admin/users"
          :currentPage="props.users.meta.currentPage"
          :lastPage="props.users.meta.lastPage"
        />
      </TableFooter>
    </TableContainer>
  </TableRoot>
</template>
