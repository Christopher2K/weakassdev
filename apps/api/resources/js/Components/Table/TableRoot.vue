<script setup lang="ts">
import { css } from '@style/css';
</script>

<template>
  <div :class="css({ overflowX: 'auto' })">
    <slot />
  </div>
</template>
