<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3';

import { css } from '@style/css';

import type { AdminPostData } from '@weakassdev/shared/validators';

import AppDefinitionList from '~/Components/AppDefinitionList.vue';
import AppBreadcrumbs from '~/Components/AppBreadcrumbs.vue';
import AppButton from '~/Components/AppButton.vue';
import AppResourceDetails from '~/Templates/AppResourceDetails.vue';
import Layout from '~/Pages/Layout.vue';

import { formatDate } from '~/utils';

defineOptions({
  layout: Layout,
});

const props = defineProps<{
  post: AdminPostData;
  ui: {
    showFlagButton: boolean;
    showUnflagButton: boolean;
  };
}>();

function flag() {
  router.patch(`/admin/posts/${props.post.id}/flag`);
}

function unflag() {
  router.patch(`/admin/posts/${props.post.id}/unflag`);
}
</script>

<template>
  <AppResourceDetails title="Détails du post">
    <template #header>
      <AppBreadcrumbs
        :links="[{ href: '/admin/posts', name: 'Posts' }, { name: 'Détails du post' }]"
      />
    </template>

    <template #informations>
      <AppDefinitionList>
        <dt>Auteur</dt>
        <dd>
          <Link
            :href="`/admin/users/${props.post.author.id}`"
            :class="css({ textStyle: 'bodyUnderline' })"
          >
            {{ props.post.author.username }}
          </Link>
        </dd>

        <dt>Posté le</dt>
        <dd>
          {{ formatDate(props.post.createdAt) }}
        </dd>

        <dt>Statut</dt>
        <dd>
          {{ props.post.status }}
        </dd>

        <dt>Contenu</dt>
        <dd>
          {{ props.post.content.content }}
        </dd>
      </AppDefinitionList>
    </template>
    <template #actions>
      <AppButton v-if="props.ui.showFlagButton" @click="flag()">Resteindre le post</AppButton>
      <AppButton v-if="props.ui.showUnflagButton" @click="unflag()">Restaurer le post</AppButton>
      <AppButton>Bannir l'auteur définitivement</AppButton>
      <AppButton>Bannir l'auteur temporairement</AppButton>
    </template>
  </AppResourceDetails>
</template>
