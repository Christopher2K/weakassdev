<script setup lang="ts">
import { css } from '@style/css';
</script>

<template>
  <thead
    :class="
      css({
        '& tr > th': {
          py: '6',
          px: '4',
          backgroundColor: 'whitesmoke.200',
          textStyle: 'small',
          textAlign: 'left',
          whiteSpace: 'nowrap',
        },

        '& tr > th:first-of-type': {
          borderTopLeftRadius: 'md',
        },

        '& tr > th:last-of-type': {
          borderTopRightRadius: 'md',
        },
      })
    "
  >
    <slot />
  </thead>
</template>
