<script setup lang="ts">
import { ExternalLinkIcon } from 'lucide-vue-next';

import { hstack } from '@style/patterns';

import AppButton from '../AppButton.vue';

const props = defineProps<{
  info: string;
  href: string;
}>();
</script>

<template>
  <span :class="hstack({})">
    <AppButton theme="secondary" :href="props.href" btnSize="sm">
      <template #left-icon>
        <ExternalLinkIcon :size="16" />
      </template>
    </AppButton>

    <span>{{ props.info }}</span>
  </span>
</template>
