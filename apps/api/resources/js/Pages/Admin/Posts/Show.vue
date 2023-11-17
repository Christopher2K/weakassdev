<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

import { css } from '@style/css';
import { hstack } from '@style/patterns';

import AppDefinitionList from '~/Components/AppDefinitionList.vue';
import AppDetailsSection from '~/Components/AppDetailsSection.vue';
import AppBreadcrumbs from '~/Components/AppBreadcrumbs.vue';
import AppButton from '~/Components/AppButton.vue';
import Layout from '~/Pages/Layout.vue';

import { type AdminPostData } from '@weakassdev/shared/validators';
import { formatDate } from '~/utils';

defineOptions({
  layout: Layout,
});

const props = defineProps<{
  post: AdminPostData;
}>();
</script>

<template>
  <h1 :class="css({ textStyle: 'heading1', mb: 10 })">Détails du post</h1>
  <AppBreadcrumbs :links="[{ href: '/admin/posts', name: 'Posts' }, { name: 'Détails du post' }]" />

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
    <AppDetailsSection title="Informations">
      <AppDefinitionList>
        <dt>Auteur</dt>
        <dd>
          <Link
            :href="`/admin/users/${props.post.author.id}`"
            :class="css({ textStyle: 'bodyUnderline' })"
            >{{ props.post.author.username }}</Link
          >
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
    </AppDetailsSection>

    <AppDetailsSection title="Actions">
      <AppButton>Resteindre le post</AppButton>
      <AppButton>Bannir l'auteur définitivement</AppButton>
      <AppButton>Bannir l'auteur temporairement</AppButton>
    </AppDetailsSection>
  </div>
</template>
