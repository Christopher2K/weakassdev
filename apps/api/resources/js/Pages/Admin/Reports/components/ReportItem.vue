<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

import type { AdminReportedPostsData } from '@weakassdev/shared/validators';
import { css } from '@style/css';
import { hstack } from '@style/patterns';

import AppButton from '~/Components/AppButton.vue';

const props = defineProps<{
  post: AdminReportedPostsData['data'][number];
}>();

const emits = defineEmits<{
  approve: [string];
  reject: [string];
}>();
</script>

<template>
  <dl
    :class="
      css({
        width: 'full',
        bg: 'slate.100',
        px: 4,
        py: 5,
        borderRadius: 'md',
        '& > dt': {
          textStyle: 'label',
          mb: '1',
        },
        '& > dd': {
          mb: '5',
        },
        '& > dd:last-of-type': {
          mb: '0',
        },
      })
    "
  >
    <dt>Auteur / autrice</dt>
    <dd>
      <Link :href="`/admin/users/${props.post.author.id}`" :class="css({ textStyle: 'link' })">
        {{ props.post.author.username }}
      </Link>
    </dd>

    <dt>Contenu</dt>
    <dd>
      <blockquote
        :class="
          css({
            borderLeftWidth: 'thick',
            borderLeftStyle: 'solid',
            borderColor: 'gray.500',
            fontStyle: 'italic',
            pl: '4',
          })
        "
      >
        {{ props.post.content.content }}
      </blockquote>
    </dd>

    <dt>Signalements</dt>
    <dd>
      <p>
        Signalé par <strong>{{ props.post.reports.length }}</strong> membres
      </p>
      <Link :href="`/admin/reports/${props.post.id}`" :class="css({ textStyle: 'link' })"
        >Voir en détails</Link
      >
    </dd>

    <dt>Actions</dt>
    <dd :class="hstack({})">
      <AppButton @click="emits('approve', props.post.id)">Approuver le blocage</AppButton>
      <AppButton @click="emits('reject', props.post.id)">Rejeter</AppButton>
    </dd>
  </dl>
</template>
