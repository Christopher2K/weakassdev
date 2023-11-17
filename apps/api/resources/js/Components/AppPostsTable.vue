<script setup lang="ts">
import { createColumnHelper, useVueTable, FlexRender, getCoreRowModel } from '@tanstack/vue-table';

import { css } from '@style/css';

import TableRoot from './Table/TableRoot.vue';
import TableHeader from './Table/TableHeader.vue';
import TableBody from './Table/TableBody.vue';
import TableContainer from './Table/TableContainer.vue';
import TableFooter from './Table/TableFooter.vue';
import TableCellLink from './Table/TableCellLink.vue';
import AppPagination from '~/Components/AppPagination.vue';
import AppDropdown from './AppDropdown.vue';
import AppDropdownItem from './AppDropdownItem.vue';

import { formatDate } from '~/utils';
import { computed } from 'vue';

export type BasePost = {
  id: string;
  author: string;
  authorId: string;
  status: string;
  revisions: number;
  content: string;
  createdAt: string;
};

const props = defineProps<{
  data: BasePost[];
  excludedColumns?: Array<keyof BasePost>;
  baseUrl: string;
  currentPage: number;
  lastPage: number;
  pageParam?: string;
}>();

const columnHelpers = createColumnHelper<BasePost>();

const baseColumns = [
  columnHelpers.accessor('id', {
    header: () => 'Identifiant',
    cell: (info) => info.getValue().slice(30),
  }),
  columnHelpers.accessor('author', {
    header: () => 'Auteur(e)',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('status', {
    header: () => 'Statut',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('revisions', {
    header: () => 'Révisions',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('content', {
    header: () => 'Contenu',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('createdAt', {
    header: () => 'Posté le',
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelpers.display({
    id: 'actions',
    header: () => 'Actions',
  }),
];

const columns = computed(() =>
  baseColumns.filter((col) => {
    // @ts-expect-error
    return !(props.excludedColumns ?? []).includes(col.accessorKey);
  }),
);

const table = useVueTable({
  get data() {
    return props.data;
  },
  columns: columns.value,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <AppPagination
    :class="css({ mb: '5' })"
    :baseUrl="props.baseUrl"
    :currentPage="props.currentPage"
    :pageParam="props.pageParam"
    :lastPage="props.lastPage"
  />
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
            <TableCellLink
              v-if="cell.column.id === 'author'"
              :info="cell.row.original.author"
              :href="`/admin/users/${cell.row.original.authorId}`"
            />
            <span
              v-else-if="cell.column.id === 'content'"
              :class="
                css({
                  display: 'inline-block',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  maxWidth: '300px',
                  textOverflow: 'ellipsis',
                  wordBreak: 'break-all',
                })
              "
            >
              {{ row.getValue('content') }}
            </span>

            <div v-else-if="cell.column.id === 'actions'">
              <AppDropdown>
                <AppDropdownItem
                  label="Détails"
                  :href="`/admin/posts/${cell.row.getValue('id')}`"
                />
              </AppDropdown>
            </div>

            <FlexRender v-else :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </TableBody>

      <TableFooter :length="columns.length">
        <AppPagination
          :baseUrl="props.baseUrl"
          :currentPage="props.currentPage"
          :pageParam="props.pageParam"
          :lastPage="props.lastPage"
        />
      </TableFooter>
    </TableContainer>
  </TableRoot>
</template>
