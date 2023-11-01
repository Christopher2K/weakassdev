<script setup lang="ts">
import { css } from '@style/css';
</script>

<template>
  <tbody
    :class="
      css({
        '& tr > td': {
          px: '4',
          py: '3',
          textAlign: 'left',
          fontSize: 'sm',
          whiteSpace: 'nowrap',
        },
        '& tr:nth-child(2n+1)': {
          bg: 'gray.100',
        },
      })
    "
  >
    <slot />
  </tbody>
</template>
