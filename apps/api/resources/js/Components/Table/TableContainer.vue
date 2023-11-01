<script setup lang="ts">
import { css } from '@style/css';
</script>

<template>
  <table
    :class="
      css({
        borderCollapse: 'separate',
        borderSpacing: 0,
      })
    "
  >
    <slot />
  </table>
</template>
