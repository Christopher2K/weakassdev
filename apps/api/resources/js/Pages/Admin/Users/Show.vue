<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { computed } from 'vue';

import { css } from '@style/css';

import type { AdminUserData, AdminUserPostsData } from '@weakassdev/shared/validators';

import Layout from '~/Pages/Layout.vue';
import AppBreadcrumbs from '~/Components/AppBreadcrumbs.vue';
import AppButton from '~/Components/AppButton.vue';
import AppDefinitionList from '~/Components/AppDefinitionList.vue';
import AppPostsTable from '~/Components/AppPostsTable.vue';
import AppResourceDetails from '~/Templates/AppResourceDetails.vue';
import { formatDate, userStatusDefinition, userRoleDefinition } from '~/utils';

defineOptions({
  layout: Layout,
});
const props = defineProps<{
  user: AdminUserData;
  posts: AdminUserPostsData;
  ui: {
    showDeleteBtn: boolean;
    showRestoreBtn: boolean;
    showBanBtn: boolean;
    showUnbanBtn: boolean;
  };
}>();

const data = computed(() =>
  props.posts.data.map((post) => ({
    id: post.id,
    author: props.user.username,
    authorId: props.user.id,
    status: post.status,
    revisions: post.meta.revisions,
    content: post.content.content,
    createdAt: post.createdAt,
  })),
);

function onArchiveClick() {
  router.patch(`/admin/users/${props.user.id}/archive`);
}

function onRestoreClick() {
  router.patch(`/admin/users/${props.user.id}/restore`);
}

function onBanClick() {
  router.patch(`/admin/users/${props.user.id}/ban`);
}

function onUnbanClick() {
  router.patch(`/admin/users/${props.user.id}/unban`);
}
</script>

<template>
  <AppResourceDetails title="Détails de l'utilisateur">
    <template #header>
      <AppBreadcrumbs
        :links="[{ href: '/admin/users', name: 'Liste des utilisateurs' }, { name: 'Détails' }]"
      />
    </template>
    <template #informations>
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
    </template>

    <template #actions>
      <AppButton v-if="props.ui.showDeleteBtn" @click="onArchiveClick()"
        >Archiver ce compte</AppButton
      >
      <AppButton v-if="props.ui.showRestoreBtn" @click="onRestoreClick()"
        >Restorer ce compte</AppButton
      >
      <AppButton v-if="props.ui.showBanBtn" @click="onBanClick()">Bannir définitivement</AppButton>
      <AppButton v-if="props.ui.showUnbanBtn" @click="onUnbanClick()">Lever le ban</AppButton>
    </template>

    <section>
      <h2 :class="css({ textStyle: 'heading3', mb: 6 })">Posts</h2>
      <AppPostsTable
        v-if="props.posts.data.length > 0"
        :data="data"
        :excludedColumns="['author']"
        :currentPage="props.posts.meta.currentPage"
        :lastPage="props.posts.meta.lastPage"
        pageParam="postsPage"
        :baseUrl="`/admin/users/${props.user.id}`"
      />
      <p v-else :class="css({ textStyle: 'body' })">Aucun post!</p>
    </section>
  </AppResourceDetails>
</template>
