<script setup lang="ts">
import { computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';
import { hstack } from '@style/patterns';

import AppButton from './AppButton.vue';

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

console.log('isNextNavigationDisabled', isNextNavigationDisabled.value);
</script>

<template>
  <component :is="props.as" :class="hstack({ w: 'fit-content' })">
    <AppButton btnSize="sm" :disabled="isPreviousNavigationDisabled" :href="`${baseUrl}?page=1`">
      Début de liste
    </AppButton>
    <AppButton
      btnSize="sm"
      :disabled="isPreviousNavigationDisabled"
      :href="`${baseUrl}?page=${currentPage - 1}`"
    >
      <template #left-icon>
        <ChevronLeftIcon :size="20" />
      </template>
      Page précédente
    </AppButton>

    <AppButton
      btnSize="sm"
      :disabled="isNextNavigationDisabled"
      :href="`${baseUrl}?page=${currentPage + 1}`"
    >
      <template #right-icon>
        <ChevronRightIcon :size="20" />
      </template>
      Page suivante
    </AppButton>
    <AppButton
      btnSize="sm"
      :disabled="isNextNavigationDisabled"
      :href="`${baseUrl}?page=${lastPage}`"
    >
      Fin de liste
    </AppButton>
  </component>
</template>
