<script setup lang="ts">
import { css } from '@style/css';
import { vstack } from '@style/patterns';

const props = defineProps<{
  title: string;
  contentTitle?: string;
}>();
</script>

<template>
  <h1 :class="css({ textStyle: 'heading1', mb: '10' })">{{ props.title }}</h1>

  <slot name="header" />

  <div
    :class="vstack({ gap: 5, justifyContent: 'flex-start', alignItems: 'flex-start', w: 'full' })"
  >
    <h2 :class="css({ textStyle: 'heading3' })">{{ props.contentTitle }}</h2>

    <slot name="content"></slot>
  </div>

  <slot />
</template>
