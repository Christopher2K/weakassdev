<script setup lang="ts">
import { css } from '@style/css';
import { vstack } from '@style/patterns';

const props = defineProps<{
  title?: string;
}>();
</script>

<template>
  <div
    :class="
      vstack({
        w: 'full',
      })
    "
  >
    <p :v-if="Boolean(props.title)" :class="css({ width: 'full', textStyle: 'caption', px: '4' })">
      {{ props.title }}
    </p>
    <div
      :class="
        vstack({
          w: 'full',
          gap: '0',
        })
      "
    >
      <slot />
    </div>
  </div>
</template>
