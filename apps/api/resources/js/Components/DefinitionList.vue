<script setup lang="ts">
import { css } from '@style/css';

const props = defineProps<{
  items: Array<[string, string]>;
}>();
</script>

<template>
  <dl>
    <template v-for="[label, text] of props.items" :key="label">
      <dt
        :class="
          css({
            fontWeight: 'bold',
            fontSize: 'sm',
            color: 'gray.600',
          })
        "
      >
        {{ label }}
      </dt>
      <dd
        :class="
          css({
            mb: '3',
            '&:last-child': {
              mb: 0,
            },
          })
        "
      >
        {{ text }}
      </dd>
    </template>
  </dl>
</template>
