<script setup lang="ts">
import { createColumnHelper, useVueTable, FlexRender, getCoreRowModel } from '@tanstack/vue-table';

import { css } from '@style/css';
import { hstack, vstack } from '@style/patterns';

import type { AdminUserData, AdminUserPostsData } from '@weakassdev/shared/validators';

import Layout from '~/Pages/Layout.vue';
import AppBreadcrumbs from '~/Components/AppBreadcrumbs.vue';
import AppButton from '~/Components/AppButton.vue';
import AppDefinitionList from '~/Components/AppDefinitionList.vue';
import TableRoot from '~/Components/Table/TableRoot.vue';
import TableHeader from '~/Components/Table/TableHeader.vue';
import TableBody from '~/Components/Table/TableBody.vue';
import TableContainer from '~/Components/Table/TableContainer.vue';
import TableFooter from '~/Components/Table/TableFooter.vue';
import AppDropdown from '~/Components/AppDropdown.vue';
import AppDropdownItem from '~/Components/AppDropdownItem.vue';
import { formatDate, userStatusDefinition, userRoleDefinition } from '~/utils';

defineOptions({
  layout: Layout,
});
const props = defineProps<{ user: AdminUserData; posts: AdminUserPostsData }>();

const columnHelpers = createColumnHelper<AdminUserPostsData['data'][number]>();

const columns = [
  columnHelpers.accessor('id', {
    header: () => 'Identifiant',
    cell: (info) => info.getValue().slice(30),
  }),
  columnHelpers.accessor('status', {
    header: () => 'Statut',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('meta.revisions', {
    header: () => 'Révisions',
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor('content.content', {
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

const table = useVueTable({
  get data() {
    return props.posts.data;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
});

const sectionStyle = vstack({
  gap: 6,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexBasis: '1/2',
  flex: 1,
});
</script>

<template>
  <h1 :class="css({ textStyle: 'heading1', mb: 10 })">Détails de l'utilisateur</h1>
  <AppBreadcrumbs
    :links="[{ href: '/admin/users', name: 'Liste des utilisateurs' }, { name: 'Détails' }]"
  />
  <div
    :class="
      hstack({
        width: 'full',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 6,
        mb: 10,
      })
    "
  >
    <section :class="sectionStyle">
      <h2 :class="css({ textStyle: 'heading3' })">Informations</h2>

      <img
        v-if="props.user.avatarUrl"
        :alt="`Photo de profil de ${props.user.username}`"
        :class="css({ width: '100px', height: '100px', borderRadius: 'full' })"
      />
      <div
        v-else
        aria-hidden="true"
        :class="
          css({
            width: '100px',
            height: '100px',
            backgroundColor: 'whitesmoke.300',
            borderRadius: 'full',
          })
        "
      />

      <AppDefinitionList>
        <dt>Nom d'utilisateur</dt>
        <dd>{{ props.user.username }}</dd>

        <dt>Addresse e-mail</dt>
        <dd>{{ props.user.email }}</dd>

        <dt>Inscrit le</dt>
        <dd>{{ formatDate(props.user.createdAt) }}</dd>

        <dt>Statut du compte</dt>
        <dd>{{ userStatusDefinition[props.user.status] }}</dd>

        <dt>Rôle</dt>
        <dd>{{ userRoleDefinition[props.user.role] }}</dd>
      </AppDefinitionList>
    </section>

    <section :class="sectionStyle">
      <h2 :class="css({ textStyle: 'heading3' })">Actions</h2>
      <AppButton>Réinitialiser le mot de passe</AppButton>
      <AppButton>Bannir définitivement</AppButton>
      <AppButton>Bannir temporairement</AppButton>
    </section>
  </div>

  <section>
    <h2 :class="css({ textStyle: 'heading3', mb: 6 })">Posts</h2>

    <TableRoot v-if="props.posts.data.length > 0">
      <!-- TODO: PAGINATION COMPONENT -->
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
              <span
                v-if="cell.column.id === 'content_content'"
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
                <AppDropdown>
                  <AppDropdownItem
                    label="Voir les détails"
                    :href="`/admin/posts/${row.getValue('id')}`"
                  />
                </AppDropdown>
              </div>

              <FlexRender v-else :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </TableBody>

        <TableFooter :length="columns.length">
          <!-- TODO: PAGINATION COMPONENT -->
        </TableFooter>
      </TableContainer>
    </TableRoot>

    <p v-else :class="css({ textStyle: 'body' })">Aucun post!</p>
  </section>
</template>
