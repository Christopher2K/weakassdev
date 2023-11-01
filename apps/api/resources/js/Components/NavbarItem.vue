<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

import { cva } from '@style/css';
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  href: string;
  url: string;
  exact?: boolean;
}>();
const slots = defineSlots<{ icon: unknown }>();
const active = computed(() =>
  props.exact ? props.href === props.url : props.url.startsWith(props.href),
);

const navbarItemStyle = cva({
  base: {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '3',
    px: '6',
    py: '3',
    width: 'full',
    textStyle: 'body',
    _hover: {
      backgroundColor: 'gray.200',
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: 'gray.200',
      },
    },
  },
});
</script>

<template>
  <Link :href="props.href" :class="navbarItemStyle({ active })">
    <slot name="icon"></slot>
    <span>{{ props.label }}</span>
  </Link>
</template>
