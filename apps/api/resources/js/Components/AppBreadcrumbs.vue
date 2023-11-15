<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { css } from '@style/css';
import { hstack } from '@style/patterns';
const props = defineProps<{
  links: Array<{ href?: string; name: string }>;
}>();
</script>

<template>
  <div aria-label="breadcrumbs" :class="hstack({ mb: '10' })">
    <template v-for="(link, index) of props.links" :key="link.name">
      <Link
        v-if="Boolean(link.href)"
        :href="link.href"
        :class="css({ textStyle: 'bodyUnderline', color: 'whitesmoke.1000' })"
      >
        {{ link.name }}
      </Link>

      <p v-if="!Boolean(link.href)" :class="css({ color: 'whitesmoke.500' })">
        {{ link.name }}
      </p>

      <span v-if="index !== props.links.length - 1" :class="css({ textStyle: 'body' })">/</span>
    </template>
  </div>
</template>
