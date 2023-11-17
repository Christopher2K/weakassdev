<script setup lang="ts">
import { css } from '@style/css';
import { vstack } from '@style/patterns';

const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <section
    :class="
      vstack({
        gap: 6,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexBasis: '1/2',
        flex: 1,
      })
    "
  >
    <h2 :class="css({ textStyle: 'heading3' })">{{ props.title }}</h2>
    <slot />
  </section>
</template>
