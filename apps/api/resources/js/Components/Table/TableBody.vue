<script setup lang="ts">
import { css } from '@style/css';
</script>

<template>
  <tbody
    :class="
      css({
        '& tr > td': {
          borderBottomWidth: 'thin',
          borderBottomStyle: 'solid',
          borderBottomColor: 'whitesmoke.400',
          py: '6',
          px: '4',
          textStyle: 'body',
          textAlign: 'left',
          whiteSpace: 'nowrap',
        },

        '& tr:last-of-type > td': {
          borderBottomColor: 'transparent',
        },
      })
    "
  >
    <slot />
  </tbody>
</template>
