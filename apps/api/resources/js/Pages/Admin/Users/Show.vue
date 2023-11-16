<script setup lang="ts">
import { computed } from 'vue';

import { css } from '@style/css';
import { hstack, vstack } from '@style/patterns';

import type { AdminUserData, AdminUserPostsData } from '@weakassdev/shared/validators';

import Layout from '~/Pages/Layout.vue';
import AppBreadcrumbs from '~/Components/AppBreadcrumbs.vue';
import AppButton from '~/Components/AppButton.vue';
import AppDefinitionList from '~/Components/AppDefinitionList.vue';
import AppPostsTable from '~/Components/AppPostsTable.vue';
import { formatDate, userStatusDefinition, userRoleDefinition } from '~/utils';

defineOptions({
  layout: Layout,
});
const props = defineProps<{ user: AdminUserData; posts: AdminUserPostsData }>();

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
    <AppPostsTable v-if="props.posts.data.length > 0" :data="data" :excludedColumns="['author']" />
    <p v-else :class="css({ textStyle: 'body' })">Aucun post!</p>
  </section>
</template>
