<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';

import { css } from '@style/css';
import { hstack } from '@style/patterns';

const props = withDefaults(
  defineProps<{
    as?: string;
    baseUrl: string;
    currentPage: number;
    lastPage: number;
  }>(),
  { as: 'div' },
);

const isPreviousNavigationDisabled = computed(() => props.currentPage === 1);
const isNextNavigationDisabled = computed(() => props.currentPage === props.lastPage);

const linkStyle = css({
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  textStyle: 'bodyUnderline',
  color: 'whitesmoke.1000',

  '&[data-disabled="true"]': {
    pointerEvents: 'none',
    cursor: 'not-allowed',
    color: 'whitesmoke.500',
  },
});
</script>

<template>
  <component :is="props.as" :class="hstack({ w: 'fit-content', gap: '2', textStyle: 'body' })">
    <Link
      :class="linkStyle"
      :href="`${baseUrl}?page=1`"
      :data-disabled="isPreviousNavigationDisabled"
      >Première page</Link
    >
    <span aria-hidden="true">•</span>
    <Link
      :class="linkStyle"
      :href="`${baseUrl}?page=${currentPage - 1}`"
      :data-disabled="isPreviousNavigationDisabled"
    >
      <ChevronLeftIcon />
      Page précédente
    </Link>
    <span aria-hidden="true">•</span>
    <Link
      :class="linkStyle"
      :href="`${baseUrl}?page=${currentPage + 1}`"
      :data-disabled="isNextNavigationDisabled"
    >
      Page suivante
      <ChevronRightIcon />
    </Link>
    <span aria-hidden="true">•</span>
    <Link
      :class="linkStyle"
      :href="`${baseUrl}?page=${lastPage}`"
      :data-disabled="isNextNavigationDisabled"
      >Dernière page</Link
    >
  </component>
</template>
