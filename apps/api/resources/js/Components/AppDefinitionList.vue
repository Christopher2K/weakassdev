<script setup lang="ts">
import { css } from '@style/css';
</script>

<template>
  <dl
    :class="
      css({
        width: 'full',
        '& > dt': {
          textStyle: 'smallImportant',
        },
        '& > dd': {
          textStyle: 'body',
          mb: 6,
        },
        '& > dd:last-of-type': {
          mb: 0,
        },
      })
    "
  >
    <slot />
  </dl>
</template>
