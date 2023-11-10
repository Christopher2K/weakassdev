<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

import { css } from '@style/css';
import { hstack } from '@style/patterns';
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
</script>

<template>
  <Link
    :href="props.href"
    :class="
      css({
        textStyle: 'body',
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 4,
        px: 4,
        py: 3,
        width: 'full',
        height: 'fit-content',
        borderRadius: 'md',
        backgroundColor: 'whitesmoke.200',
        color: 'whitesmoke.1000',

        '&:hover:not(&[data-active=true])': {
          backgroundColor: 'whitesmoke.400',
          color: 'whitesmoke.1000',
        },

        '&[data-active=true]': {
          backgroundColor: 'whitesmoke.800',
          color: 'whitesmoke.100',
        },
      })
    "
    :data-active="active"
  >
    <span
      :class="
        hstack({
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 1,
          gap: 4,
        })
      "
    >
      <slot name="left-icon"></slot>
      <span>{{ props.label }}</span>
    </span>

    <slot name="right-icon"></slot>
  </Link>
</template>
