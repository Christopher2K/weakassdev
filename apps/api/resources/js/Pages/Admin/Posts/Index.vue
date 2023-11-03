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

import { AdminPostsData } from '@weakassdev/shared/validators';

import AppButton from '~/Components/AppButton.vue';
import TableRoot from '~/Components/Table/TableRoot.vue';
import TableHeader from '~/Components/Table/TableHeader.vue';
import TableBody from '~/Components/Table/TableBody.vue';
import TableContainer from '~/Components/Table/TableContainer.vue';
import TableFooter from '~/Components/Table/TableFooter.vue';
import TableCellLink from '~/Components/Table/TableCellLink.vue';
import Pagination from '~/Components/Pagination.vue';

const props = defineProps<{
  posts: AdminPostsData;
}>();

const columnHelpers = createColumnHelper<AdminPostsData['data'][number]>();

const columns = [
  columnHelpers.accessor('id', {
    header: () => 'Identifiant',
    cell: (info) => info.getValue().slice(30),
  }),
  columnHelpers.accessor('author.username', {
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
  columnHelpers.accessor('content.content', {
    header: () => 'Contenu',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('createdAt', {
    header: () => 'Posté le',
    cell: (info) => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATETIME_MED),
  }),
  columnHelpers.display({
    id: 'actions',
    header: () => 'Actions',
  }),
];

const table = useVueTable({
  get data() {
    return props.posts.data;
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
            <TableCellLink
              v-if="cell.column.id === 'author_username'"
              :info="cell.row.original.author.username"
              :href="`/admin/users/${cell.row.original.author.id}`"
            />
            <span
              v-else-if="cell.column.id === 'content_content'"
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
              {{ row.getValue('content_content') }}
            </span>

            <div v-else-if="cell.column.id === 'actions'">
              <AppButton :href="`/admin/posts/${row.getValue('id')}`" btnSize="sm">
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
          baseUrl="/admin/posts"
          :currentPage="props.posts.meta.currentPage"
          :lastPage="props.posts.meta.lastPage"
        />
      </TableFooter>
    </TableContainer>
  </TableRoot>
</template>
