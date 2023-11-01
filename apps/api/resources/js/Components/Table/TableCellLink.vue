<script setup lang="ts">
import { ExternalLinkIcon } from 'lucide-vue-next';

import { hstack } from '@style/patterns';

import AppButton from '../AppButton.vue';

const props = defineProps<{
  info: string;
  href: string;
}>();

// TODO: Set the button link component
</script>

<template>
  <span :class="hstack({})">
    <AppButton btnSize="sm" theme="secondary" :href="props.href">
      <template #left-icon>
        <ExternalLinkIcon :size="12" />
      </template>
    </AppButton>

    <span>{{ props.info }}</span>
  </span>
</template>
