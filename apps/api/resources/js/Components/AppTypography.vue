<script setup lang="ts" generic="T extends AvailableTags">
import { computed, type HTMLAttributes } from 'vue';

import { cx } from '@style/css';

import { typographyStyle, type AvailableTags } from './_typography';

const props = defineProps<
  {
    tag: T;
  } & HTMLAttributes
>();

const classNames = computed(() => cx(typographyStyle({ tag: props.tag }), props.class));
</script>

<template>
  <component :is="tag" :class="classNames"><slot /></component>
</template>
