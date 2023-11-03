<script setup lang="ts">
import { css } from '@style/css';
</script>

<template>
  <thead
    :class="
      css({
        borderTopRadius: 'md',
        '& tr > th': {
          bg: 'gray.200',
          p: '4',
          fontFamily: 'Inter',
          fontSize: 'md',
          fontWeight: 'medium',
          textAlign: 'left',
          whiteSpace: 'nowrap',
        },
      })
    "
  >
    <slot />
  </thead>
</template>
