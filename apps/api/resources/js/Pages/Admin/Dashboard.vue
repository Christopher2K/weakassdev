<script lang="ts">
import AppLayout from '~/Pages/Layout.vue';

export default {
  layout: AppLayout,
};
</script>

<script setup lang="ts">
import { css } from '@style/css';
</script>

<template>
  <h1 :class="css({ textStyle: 'h2' })">Dashboard</h1>
</template>
