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

const reportReasonCopy = {
  offensiveCount: 'contenu offensant',
  duplicateCount: 'duplication'
}
</script>

<template>
  <dl
    :class="
      css({
        width: 'full',
        p: 4,
        bg: 'whitesmoke.100',
        borderRadius: 'md',
        '& > dt': {
          textStyle: 'smallImportant',
        },
        '& > dd': {
          textStyle: 'body',
          mb: '5',
        },
        '& > dd:last-of-type': {
          mb: '0',
        },
      })
    "
  >
    <dt>Contenu signalé</dt>
    <dd>
      {{ props.post.content.content }}
    </dd>

    <dt>Posté le</dt>
    <dd>
      {{ props.post.createdAt }}
    </dd>

    <dt>Par</dt>
    <dd>
      <Link
        :href="`/admin/users/${props.post.author.id}`"
        :class="css({ textStyle: 'bodyUnderline' })"
      >
        {{ props.post.author.username }}
      </Link>
    </dd>

    <dt>Informations</dt>
    <dd>
      <p>
        <strong>{{ props.post.reports.length }}</strong> signalements
        <ul>
          <template v-for="[category, count] of Object.entries(props.post.meta)">
            <li v-if="count > 0" :class="css({ textStyle: 'small', listStyle: 'inside', ml: 2 })">
              {{ count }} pour {{ reportReasonCopy[category] }}
            </li>
          </template>
        </ul> 
      </p>
      <p v-if="post.author.flaggedPosts.length > 0">
        Cet utilisateur a déjà eu {{ post.author.flaggedPosts.length }} posts restreints
      </p>
      <p v-else>Cet utilisateur n'a jamais eu de post restreint.</p>
    </dd>

    <dt>Actions</dt>
    <dd :class="hstack({ gap: 4 })">
      <AppButton @click="emits('approve', props.post.id)">Resteindre le post</AppButton>
      <AppButton @click="emits('reject', props.post.id)">Rejeter les signalements</AppButton>
    </dd>
  </dl>
</template>
